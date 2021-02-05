import { Fade } from "@material-ui/core";
import Popper from "@material-ui/core/Popper";
import { PopperProps } from "@material-ui/core/Popper/Popper";
import { Card, CardProps } from "@rmwc/card";
import '@rmwc/card/styles';
import '@rmwc/ripple/styles';
import { CourseInfo } from "@watcourses/proto/courses";
import { RootState } from "@watcourses/redux/store";
import { RequisiteHelper } from "@watcourses/utils/RequisiteHelper";
import React, { useRef, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Draggable } from 'react-smooth-dnd';
import styled from "styled-components";

import CourseDetail from "./CourseDetail";

type ScheduleCourseProps = ConnectedProps<typeof connector> & {
    course: CourseInfo | null
}

const RootContainer = styled.div`
  width: 265px;
  padding: 8px 0;
  background-color: transparent;
`

const CardWrapper = styled.div`
  width: 100%;
  cursor: pointer;
  margin-left: 16px;
`

const StyledCard = styled(Card)<CardProps & React.HTMLProps<HTMLDivElement> & { hovered: number, active: number, ref: any }>`
  width: 100%;
  background-color: ${props => props.hovered ? '#fafafa' : 'white'};
  transition: background-color 0.2s ease,
  opacity 0.2s ease,
  box-shadow 0.2s ease;
  transition-delay: 0s;

  :hover {
    transition-delay: 150ms
  }

  :focus {
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
    0 1px 18px 0 rgba(0, 0, 0, 0.12),
    0 3px 5px -1px rgba(0, 0, 0, 0.2);
    border-color: transparent;
  }

  box-shadow: ${props => props.active ? `0 6px 10px 0 rgba(0,0,0,0.14), 
                      0 1px 18px 0 rgba(0,0,0,0.12), 
                      0 3px 5px -1px rgba(0,0,0,0.2)` : ''};
  border-color: ${props => props.active ? `transparent` : 'inherited'};
  outline: none;
}
`

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 18px;
`

const CourseCode = styled.span`
  font-size: 18px;
  font-weight: 500
`

const Error = styled.span`
  float: right;
  color: #FF0000;
  font-family: "Material Icons";
  font-size: 22px;
`

const CourseName = styled.span`
  font-size: 14px;
  margin-top: 6px;
`

const StyledPopper = styled(Popper)<PopperProps>`
  z-index: 9999;
  margin-bottom: 50px;
  max-height: 80vh;
`

const ScheduleCourse = ({course, shortlistOpen}: ScheduleCourseProps) => {
    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(false);
    const toggleHover = () => setHovered(!hovered);
    const cardRef = useRef();

    const timerRef: any = useRef(null);

    // Width of the edge within which the horizontal scrolling
    // will be triggered while dragging
    const scrollEdgeSize = 150;

    // # of pixels to scroll horizontally in each update while dragging,
    // determines the scroll speed
    const maxScrollStep = 20;

    const handleSelectCourse = () => {
        setActive(true)
    }

    const handleCloseDetail = () => {
        setActive(false)
    }

    const toggleActive = () => {
        setActive(!active)
    }

    // The following functions implements the horizontal
    // scrolling of schedule list while dragging courses
    const handleMouseDown = () => {
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
    };

    // Scroll the element based on mouse movement
    const handleMouseMove = (e: any) => {
        const element: HTMLElement | null = document.getElementById('schedule-list')
        if (!element) {
            return
        }

        // X coordinate of the mouse within the scroll view
        const viewportX = e.clientX - element.getBoundingClientRect().left
        // Visible width of the scroll view
        const viewportWidth = element.getBoundingClientRect().width

        const edgeLeft = scrollEdgeSize
        const edgeRight = viewportWidth - scrollEdgeSize

        const isInLeftEdge = viewportX < edgeLeft
        const isInRightEdge = viewportX > edgeRight

        if (!(isInLeftEdge || isInRightEdge)) {
            clearTimeout(timerRef.current);
            return;
        }

        // Entire width of the scroll view, including overflowed part
        const elementWidth = element.scrollWidth
        // Available space for scrolling
        const maxScrollX = elementWidth - viewportWidth

        const adjustWindowScroll = () => {
            if (!element) {
                return;
            }
            const currentScrollX = element.scrollLeft;
            const canScrollLeft = currentScrollX > 0
            let canScrollRight = currentScrollX < maxScrollX

            // Disable scrolling right when shortlist is open
            if (shortlistOpen) {
                canScrollRight = false
            }

            let nextScrollX: number = currentScrollX

            // Calculate the position to scroll to.
            // Scroll speed is proportionate to how close
            // the mouse is towards the edges
            if (isInLeftEdge && canScrollLeft) {
                const intensity = (edgeLeft - viewportX) / scrollEdgeSize
                nextScrollX = nextScrollX - (maxScrollStep * intensity)
            } else if (isInRightEdge && canScrollRight) {
                const intensity = (viewportX - edgeRight) / scrollEdgeSize
                nextScrollX = nextScrollX + (maxScrollStep * intensity)
            }

            // Bounds
            nextScrollX = Math.max(0, Math.min(maxScrollX, nextScrollX))

            if (nextScrollX !== currentScrollX) {
                element.scrollTo(nextScrollX, element.scrollTop);
                return true
            } else {
                return false
            }
        }

        const checkForWindowScroll = () => {
            clearTimeout(timerRef.current)

            // If possible, keep scrolling when the mouse has
            // stopped moving but is still within the edge,
            // updates every 10ms
            if (adjustWindowScroll()) {
                timerRef.current = setTimeout(checkForWindowScroll, 10)
            }
        };

        // Kick off
        checkForWindowScroll()
    }

    const handleMouseUp = () => {
        clearTimeout(timerRef.current)
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };
    const allConditionsMet = (() => {
        if (!course) {
            return true
        }
        const prerequisites = RequisiteHelper.getPreRequisite(course)
        const antirequisites = RequisiteHelper.getAntiRequisite(course)
        return prerequisites.every((r) => r.met) && antirequisites.every((r) => r.met)
    })()

    return (
        <Draggable>
            <RootContainer>
                <CardWrapper>
                    <StyledCard
                        outlined
                        ref={cardRef}
                        className={`unselectable${!allConditionsMet ? ' unmet-requisites' : ''}`}
                        id={'course-card'}
                        tabIndex={0}
                        active={active ? 1 : 0}
                        hovered={hovered ? 1 : 0}
                        onMouseDown={handleMouseDown}
                        onClick={handleSelectCourse}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                toggleActive()
                            }
                        }}
                        onMouseOver={() => {
                            if (!hovered) {
                                setHovered(true)
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
                    <StyledPopper
                        id={course?.code} open={active} anchorEl={cardRef.current}
                        transition
                        placement="left-start"
                        modifiers={{
                            flip: {
                                enabled: true,
                            },
                            preventOverflow: {
                                enabled: true,
                                boundariesElement: 'viewport',
                            },
                            offset: {
                                enabled: true,
                                offset: '0, 8'
                            }
                        }}>
                        {({TransitionProps}) => (
                            <Fade {...TransitionProps}>
                                <div style={{maxHeight: '80vh'}}>
                                    <CourseDetail course={course} onDismiss={handleCloseDetail}/>
                                </div>
                            </Fade>
                        )}
                    </StyledPopper>
                </CardWrapper>
            </RootContainer>
        </Draggable>
    )
}

const mapState = (state: RootState) => ({
    shortlistOpen: state.ui.shortlistOpen,
})

const connector = connect(mapState)

export default connector(ScheduleCourse)
