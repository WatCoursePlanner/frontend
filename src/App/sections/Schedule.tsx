import { Button, ButtonHTMLProps, ButtonProps } from "@rmwc/button";
import '@rmwc/button/styles';
import { Fab, FabProps } from "@rmwc/fab";
import '@rmwc/fab/styles';
import '@rmwc/tooltip/styles';
import { ScheduleShortList, TermList } from "@watcourses/components/ScheduleList";
import Spacer from "@watcourses/components/Spacer";
import { URL_BASE } from "@watcourses/constants/api";
import { CheckResults, FindSlotRequest } from "@watcourses/proto/courses";
import { fetchProfileCourseAction } from "@watcourses/redux/slices/profileCourses";
import studentProfileSlice from "@watcourses/redux/slices/studentProfileSlice";
import ui from "@watcourses/redux/slices/ui";
import { RootState } from "@watcourses/redux/store";
import { makeObservable, observable } from "mobx";
import React from 'react';
import { connect, ConnectedProps } from "react-redux";
import { DropResult } from "react-smooth-dnd";
import { bindActionCreators, Dispatch } from "redux";
import { DragEndParams, DragStartParams } from "smooth-dnd/dist/src/exportTypes";
import styled from "styled-components";

interface IScheduleProps extends ConnectedProps<typeof connector> {
}

export class ScheduleBase extends React.Component<IScheduleProps> {

  @observable
  private issues: { [termName: string]: CheckResults } = {};

  @observable
  private firstDrop = false;

  private scheduleListRef = React.createRef<HTMLDivElement>();

  private handleScroll = (e: React.UIEvent<HTMLElement>) => {
    if (e.currentTarget.scrollLeft > 0) {
      if (!this.props.drawerShadow) {
        this.props.setDrawerShadow(true);
      }
    } else {
      if (this.props.drawerShadow) {
        this.props.setDrawerShadow(false);
      }
    }
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
      document.getElementsByClassName("course-list")
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

  componentDidMount() {
    makeObservable(this);
    const element = this.scheduleListRef.current!;
    element.addEventListener("wheel", this.handleWheel);
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
    if (dropResult.removedIndex !== null) {
      if (termName === "shortlist") {
        this.props.removeShortList(dropResult.payload);
      } else {
        this.props.removeCourseFromList({
          termName,
          index: dropResult.removedIndex
        });
      }
    }
    if (dropResult.addedIndex !== null) {
      if (termName === "shortlist") {
        this.props.addShortList({
          code: dropResult.payload,
          index: dropResult.addedIndex
        });
      } else {
        this.props.addCourseToList({
          termName,
          index: dropResult.addedIndex,
          code: dropResult.payload
        });
      }
    }
    // Don't update if both are not null, i.e. move to the same column
    if (dropResult.removedIndex === null || dropResult.addedIndex === null) {
      // Update on the second drop callback (i.e. when firstDrop === true)
      if (!this.firstDrop) {
        this.firstDrop = true;
      } else {
        this.props.checkCourses(null);
        this.firstDrop = false;
      }
    }
  };

  private onDragStart = (dragStart: DragStartParams) => {
    if (!dragStart.isSource) {
      return;
    } // only need to do this once

    fetch(`${URL_BASE}/profile/find_slots`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(FindSlotRequest.toJSON({
        profile: this.props.studentProfile!!,
        courseCode: dragStart.payload!!
      }))
    })
      .then(res => res.json())
      .then(res => {
        this.issues = res.slot;
      })
      .catch(error => {
        throw(error);
      });
  };

  render() {
    const {
      studentProfile,
      loading,
      profileCourses,
      shortlistOpen,
      setShortlistOpen
    } = this.props;
    return (
      <OuterContainer>
        <ScheduleContainer>
          <ScheduleListContainer
            ref={this.scheduleListRef}
            onScroll={this.handleScroll}>
            <Spacer minWidth={'16px'} minHeight={'100%'}/>
            <TermList
              profileCourses={profileCourses}
              studentProfile={studentProfile}
              issues={this.issues}
              options={{
                onDragEnd: this.onDragEnd,
                onDragStart: this.onDragStart
              }}
              onDropWithTerm={this.onDropWithTerm}
            />
            <Spacer minWidth={'240px'} minHeight={'100%'}/>
            <StyledFab icon="add" label="Add Term"/>
          </ScheduleListContainer>
          <ShortListButton
            unelevated
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            onClick={() => setShortlistOpen(!shortlistOpen)}
            icon={shortlistOpen ? "keyboard_arrow_right" : "shopping_cart"}
          />
        </ScheduleContainer>
        <ShortListContainer open={shortlistOpen}>
          <ScheduleShortList
            shortlist={studentProfile?.shortList ?? []}
            courses={profileCourses}
            options={{
              onDragEnd: this.onDragEnd,
              onDragStart: this.onDragStart
            }}
            onDropWithTerm={this.onDropWithTerm}
          />
        </ShortListContainer>
      </OuterContainer>
    );

  }
}

const mapState = (state: RootState) => ({
  studentProfile: state.studentProfile.content,
  profileCourses: state.profileCourses.courses,
  loading: state.studentProfile.loading,
  shortlistOpen: state.ui.shortlistOpen,
  drawerShadow: state.ui.drawerShadow,
});

const mapDispatch = (dispatch: Dispatch) => bindActionCreators({
  addCourseToList: studentProfileSlice.actions.addCourse,
  removeCourseFromList: studentProfileSlice.actions.removeCourse,
  addShortList: studentProfileSlice.actions.addShortlist,
  removeShortList: studentProfileSlice.actions.removeShortlist,
  checkCourses: fetchProfileCourseAction,
  setShortlistOpen: ui.actions.setShortlistOpen,
  setDrawerShadow: ui.actions.setDrawerShadow,
}, dispatch);

const connector = connect(mapState, mapDispatch);

export const Schedule = connector(ScheduleBase);

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
