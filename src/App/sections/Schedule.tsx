import { Button, ButtonHTMLProps, ButtonProps } from "@rmwc/button";
import '@rmwc/button/styles';
import { Fab, FabProps } from "@rmwc/fab";
import '@rmwc/fab/styles';
import '@rmwc/tooltip/styles';
import findSlots from "@watcourses/api/StudentProfile/findSlots";
import {
  ScheduleShortList,
  ScheduleTermList,
} from "@watcourses/components/ScheduleList";
import { Spacer } from "@watcourses/components/Spacer";
import { URL_BASE } from "@watcourses/constants/api";
import { CheckResults, FindSlotRequest } from "@watcourses/proto/courses";
import { ProfileCoursesStore } from "@watcourses/stores/ProfileCoursesStore";
import { StudentProfileStore } from "@watcourses/stores/StudentProfileStore";
import { buildProto } from "@watcourses/utils/buildProto";
import { action, makeObservable, observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import React from 'react';
import { If, Then } from "react-if";
import { DropResult } from "react-smooth-dnd";
import {
  DragEndParams,
  DragStartParams,
} from "smooth-dnd/dist/src/exportTypes";
import styled from "styled-components";

interface IScheduleProps {
  drawerShadow: boolean,
  setDrawerShadow: (shadow: boolean) => void,
}

@observer
export class Schedule extends React.Component<IScheduleProps> {

  @observable
  private shortListOpen: boolean = false;

  @observable
  private issues: { [termName: string]: CheckResults } = {};

  @observable
  private firstDrop = false;

  private scheduleListRef = React.createRef<HTMLDivElement>();

  @action
  private toggleShortList = () => {
    this.shortListOpen = !this.shortListOpen;
  };

  private handleDrawerShadow = (e: HTMLElement) => {
    if (e.scrollLeft > 0) {
      if (!this.props.drawerShadow) {
        this.props.setDrawerShadow(true);
      }
    } else {
      if (this.props.drawerShadow) {
        this.props.setDrawerShadow(false);
      }
    }
  };

  private handleScroll = (e: React.UIEvent<HTMLElement>) => {
    this.handleDrawerShadow(e.currentTarget);
  };

  private handleWheel = (e: any) => {
    // Ignore touchpad scrolls
    // May not work on Firefox
    // (only the scrolls with horizontal (X) component are ignored)
    // see https://stackoverflow.com/a/56948026/7939451
    const isTouchPad = e.wheelDeltaY
      ? (e.wheelDeltaY === -3 * e.deltaY)
      : false;
    if (e.deltaX || isTouchPad) {
      return;
    }

    // Ignore if is hovering over a vertically scrollable course-list
    const courseListElements: Element[] = Array.from(
      document.getElementsByClassName("course-list"),
    );
    if (courseListElements.some((_element) => {
      return _element.contains(e.target) &&
        _element.scrollHeight > _element.clientHeight;
    })) {
      return;
    }

    const element: HTMLDivElement | null = this.scheduleListRef.current;
    if (!element) {
      return;
    }

    // Move the board 80 pixes on every wheel event
    if (Math.sign(e.deltaY) === 1) {
      element.scrollTo(element.scrollLeft + 80, 0);
    } else if (Math.sign(e.deltaY) === -1) {
      element.scrollTo(element.scrollLeft - 80, 0);
    }
  };

  constructor(props: IScheduleProps) {
    super(props);
    makeObservable(this);
  }

  componentDidMount() {
    const element = this.scheduleListRef.current!;
    element.addEventListener("wheel", this.handleWheel);
    this.handleDrawerShadow(element);
    return () => {
      element.removeEventListener("wheel", this.handleWheel);
      this.props.setDrawerShadow(false);
    };
  }

  private onDragEnd = (_: DragEndParams) => {
    this.firstDrop = false;
  };

  private onDropWithTerm = (dropResult: DropResult, termName: string) => {
    // TODO: check before applying the changes
    if (dropResult.removedIndex === dropResult.addedIndex) {
      return;
    }
    const {
      addCourseToTerm,
      removeCourseFromTerm,
    } = StudentProfileStore.get();

    if (dropResult.removedIndex !== null) {
      removeCourseFromTerm({
        termName,
        index: dropResult.removedIndex,
      });
    }
    if (dropResult.addedIndex !== null) {
      addCourseToTerm({
        termName,
        index: dropResult.addedIndex,
        code: dropResult.payload,
      });
    }
    // Don't update if both are not null, i.e. move to the same column
    if (dropResult.removedIndex === null || dropResult.addedIndex === null) {
      // Update on the second drop callback (i.e. when firstDrop === true)
      if (!this.firstDrop) {
        this.firstDrop = true;
      } else {
        ProfileCoursesStore.get().fetchProfileCourses();
        this.firstDrop = false;
      }
    }
  };

  private onDragStart = (dragStart: DragStartParams) => {
    if (!dragStart.isSource) {
      return;
    }
    // only need to do this once
    findSlots(buildProto<FindSlotRequest>({
      profile: StudentProfileStore.get().studentProfile,
      courseCode: dragStart.payload!!,
    })).then((response) => runInAction(() => {
      this.issues = response.slot;
    }));
  };

  render() {
    const profileCourses = ProfileCoursesStore.get().profileCourses.courses;
    const studentProfile = StudentProfileStore.get().studentProfile;
    return (
      <OuterContainer>
        <ScheduleContainer>
          <ScheduleListContainer
            ref={this.scheduleListRef}
            onScroll={this.handleScroll}>
            <Spacer minWidth={'16px'} minHeight={'100%'}/>
            <If condition={!!profileCourses && !!studentProfile}>
              <Then>
                <ScheduleTermList
                  profileCourses={profileCourses!}
                  studentProfile={studentProfile}
                  issues={this.issues}
                  options={{
                    onDragEnd: this.onDragEnd,
                    onDragStart: this.onDragStart,
                  }}
                  onDropWithTerm={this.onDropWithTerm}
                  shortListOpen={this.shortListOpen}
                  scheduleListRef={this.scheduleListRef}
                />
              </Then>
            </If>
            <Spacer minWidth={'240px'} minHeight={'100%'}/>
            <StyledFab icon="add" label="Add Term"/>
          </ScheduleListContainer>
          <ShortListButton
            unelevated
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            onClick={this.toggleShortList}
            icon={this.shortListOpen ? "keyboard_arrow_right" : "shopping_cart"}
          />
        </ScheduleContainer>
        <ShortListContainer open={this.shortListOpen}>
          <If condition={!!profileCourses && !!studentProfile}>
            <Then>
              <ScheduleShortList
                shortlist={studentProfile?.shortList ?? []}
                courses={profileCourses!}
                options={{
                  onDragEnd: this.onDragEnd,
                  onDragStart: this.onDragStart,
                }}
                onDropWithTerm={this.onDropWithTerm}
                shortListOpen={this.shortListOpen}
                scheduleListRef={this.scheduleListRef}
              />
            </Then>
          </If>
        </ShortListContainer>
      </OuterContainer>
    );
  }
}

const ShortListButton = styled(Button)<ButtonProps & ButtonHTMLProps>`
  position: absolute;
  top: 50%;
  right: 0;
  margin-top: -28px;
  height: 54px !important;
  width: 54px !important;
  margin-left: auto !important;
  padding-left: 24px !important;
  border-radius: 100px 0 0 100px !important;
  background-color: #e3f2fd !important;
  color: #2196F3 !important;

  & div {
    border-radius: 100px 0 0 100px !important;
  }

  & i {
    width: 24px !important;
    height: 24px !important;
    font-size: 24px !important;
    padding: 0 !important;
    margin: 0 !important;
  }
`;

const OuterContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  flex-direction: row;
`;

const ScheduleContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  overflow-x: hidden;
  position: relative;
  width: auto;
`;

const ScheduleListContainer = styled.div`
  display: flex;
  height: 100%;
  overflow-y: hidden;
  overflow-x: auto;
  flex-direction: row;
  align-items: start;
`;

const ShortListContainer = styled.div<{ open: boolean }>`
  display: flex;
  min-width: ${props => props.open ? '360px' : 0};
  max-width: ${props => props.open ? '360px' : 0};
  transition: 0.3s;
  border-left: 1px solid #e0e0e0;
`;

const StyledFab = styled(Fab)<FabProps>`
  letter-spacing: normal !important;
  text-transform: initial;
  position: absolute !important;
  bottom: 9vh !important;
  right: 6vw !important;
`;
