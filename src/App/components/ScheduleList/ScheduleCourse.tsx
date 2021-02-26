import { Card, CardProps } from "@rmwc/card";
import '@rmwc/card/styles';
import '@rmwc/ripple/styles';
import { Popper } from "@watcourses/components/Popper/Popper";
import { CourseInfo, Schedule_TermSchedule } from "@watcourses/proto/courses";
import { RequisiteHelper } from "@watcourses/utils/RequisiteHelper";
import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { Draggable } from 'react-smooth-dnd';
import styled from "styled-components";

import { CourseDetail } from "./CourseDetail";
import { Popper } from "./Popper";

interface IScheduleCourseProps {
  course?: CourseInfo,
  fromTerm?: Schedule_TermSchedule,
  shortListOpen: boolean,
  scheduleListRef: React.RefObject<HTMLDivElement>,
}

/**
 * Width of the edge within which the horizontal scrolling
 * will be triggered while dragging
 */
const scrollEdgeSize = 150;

/**
 * Number of pixels to scroll horizontally in each update while dragging,
 * determines the scroll speed
 */
const maxScrollStep = 20;

@observer
export class ScheduleCourse extends React.Component<IScheduleCourseProps> {

  @observable
  private hovered: boolean = false;

  @observable
  private active: boolean = false;

  @observable
  private scrollTimeout: any = null;

  @action
  private toggleHover = () => {
    this.hovered = !this.hovered;
  };

  @action
  private handleSelectCourse = () => {
    this.active = true;
  };

  @action
  private handleCloseDetail = () => {
    this.active = false;
  };

  @action
  private toggleActive = () => {
    this.active = !this.active;
  };

  private cardRef: React.RefObject<HTMLDivElement> = React.createRef();

  /**
   * The following functions implements the horizontal
   * scrolling of schedule list while dragging courses
   */

  /**
   * Listen to drag starts
   */
  private handleMouseDown = () => {
    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);
  };

  /**
   * Scroll the element while dragging based on mouse movement
   */
  @action
  private handleMouseMove = (e: any) => {
    const element: HTMLElement | null = this.props.scheduleListRef.current;
    if (!element) {
      return;
    }

    // X coordinate of the mouse within the scroll view
    const viewportX = e.clientX - element.getBoundingClientRect().left;
    // Visible width of the scroll view
    const viewportWidth = element.getBoundingClientRect().width;

    const edgeLeft = scrollEdgeSize;
    const edgeRight = viewportWidth - scrollEdgeSize;

    const isInLeftEdge = viewportX < edgeLeft;
    const isInRightEdge = viewportX > edgeRight;

    if (!(isInLeftEdge || isInRightEdge)) {
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }
      return;
    }

    // Entire width of the scroll view, including overflowed part
    const elementWidth = element.scrollWidth;
    // Available space for scrolling
    const maxScrollX = elementWidth - viewportWidth;

    const adjustWindowScroll = () => {
      if (!element) {
        return;
      }
      const currentScrollX = element.scrollLeft;
      const canScrollLeft = currentScrollX > 0;
      let canScrollRight = currentScrollX < maxScrollX;

      // Disable scrolling right when shortlist is open
      if (this.props.shortListOpen) {
        canScrollRight = false;
      }

      let nextScrollX: number = currentScrollX;

      // Calculate the position to scroll to.
      // Scroll speed is proportionate to how close
      // the mouse is towards the edges
      if (isInLeftEdge && canScrollLeft) {
        const intensity = (edgeLeft - viewportX) / scrollEdgeSize;
        nextScrollX = nextScrollX - (maxScrollStep * intensity);
      } else if (isInRightEdge && canScrollRight) {
        const intensity = (viewportX - edgeRight) / scrollEdgeSize;
        nextScrollX = nextScrollX + (maxScrollStep * intensity);
      }

      // Bounds
      nextScrollX = Math.max(0, Math.min(maxScrollX, nextScrollX));

      if (nextScrollX !== currentScrollX) {
        element.scrollTo(nextScrollX, element.scrollTop);
        return true;
      } else {
        return false;
      }
    };

    const checkForWindowScroll = () => {
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }

      // If possible, keep scrolling when the mouse has
      // stopped moving but is still within the edge,
      // updates every 10ms
      if (adjustWindowScroll()) {
        this.scrollTimeout = setTimeout(checkForWindowScroll, 10);
      }
    };

    // Kick off
    checkForWindowScroll();
  };

  /**
   * Listen to drag ends
   */
  @action
  private handleMouseUp = () => {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
  };

  constructor(props: IScheduleCourseProps) {
    super(props);
    makeObservable(this);
  }

  render() {
    const {
      cardRef,
      active,
      hovered,
      handleMouseDown,
      handleSelectCourse,
      toggleActive,
      toggleHover,
      handleCloseDetail,
    } = this;

    const {
      course,
      fromTerm,
    } = this.props;

    if (!course) {
      return null;
    }

    const prerequisites = RequisiteHelper.getPreRequisite(course);
    const antirequisites = RequisiteHelper.getAntiRequisite(course);

    const allConditionsMet =
      prerequisites.every((r) => r.met) &&
      antirequisites.every((r) => r.met);

    return (
      <Draggable>
        <RootContainer>
          <CardWrapper>
            <StyledCard
              outlined
              ref={cardRef}
              className={"unselectable"}
              id={'course-card'}
              tabIndex={0}
              active={active ? 1 : 0}
              hovered={hovered ? 1 : 0}
              error={allConditionsMet ? 0 : 1}
              onMouseDown={handleMouseDown}
              onClick={handleSelectCourse}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  toggleActive();
                }
              }}
              onMouseOver={() => {
                if (!hovered) {
                  toggleHover();
                }
              }}
              onMouseEnter={toggleHover}
              onMouseLeave={toggleHover}>
              <CardContainer>
                <CourseCode>
                  {course?.code ?? ''}
                  {!allConditionsMet ? (<Error>error</Error>) : null}
                </CourseCode>
                <CourseName>
                  {course?.name ?? ''}
                </CourseName>
              </CardContainer>
            </StyledCard>
            <Popper
              id={course?.code}
              open={active}
              anchorEl={cardRef.current}
              placement="left-start"
              style={{marginBottom: '50px'}}
            >
              <div style={{maxHeight: '80vh'}}>
                <CourseDetail
                  course={course}
                  fromTerm={fromTerm}
                  onDismiss={handleCloseDetail}
                />
              </div>
            </Popper>
          </CardWrapper>
        </RootContainer>
      </Draggable>
    );
  }
}

const RootContainer = styled.div`
  width: 265px;
  padding: 8px 0;
  background-color: transparent;
`;

const CardWrapper = styled.div`
  width: 100%;
  cursor: pointer;
  margin-left: 16px;
`;

const StyledCard = styled(Card)<CardProps & React.HTMLProps<HTMLDivElement> & {
  hovered: number,
  active: number,
  error: number,
  ref: any,
}>`
  width: 100%;
  background-color: ${props => props.error
          ? '#feeded'
          : props.hovered ? '#fafafa' : 'white'};

  transition: background-color 0.2s ease,
  opacity 0.2s ease,
  box-shadow 0.2s ease;
  transition-delay: 0s;

  :hover {
    transition-delay: 150ms;
  }

  :focus {
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
    0 1px 18px 0 rgba(0, 0, 0, 0.12),
    0 3px 5px -1px rgba(0, 0, 0, 0.2);
    border-color: transparent;
  }

  box-shadow: ${props => props.active
          ? `0 6px 10px 0 rgba(0,0,0,0.14), 
              0 1px 18px 0 rgba(0,0,0,0.12), 
              0 3px 5px -1px rgba(0,0,0,0.2)`
          : ''};
  border-color: ${props => props.error
          ? '#ff0000'
          : props.active ? `transparent` : 'inherited'};
  outline: none;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 18px;
`;

const CourseCode = styled.span`
  font-size: 18px;
  font-weight: 500
`;

const Error = styled.span`
  float: right;
  color: #FF0000;
  font-family: "Material Icons", serif;
  font-size: 22px;
`;

const CourseName = styled.span`
  font-size: 14px;
  margin-top: 6px;
`;
