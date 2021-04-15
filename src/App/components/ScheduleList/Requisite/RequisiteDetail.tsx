import {
  Card,
  CardActionButton,
  CardActionButtons,
  CardActionIcon,
  CardActionIcons,
  CardActions,
  CardProps,
} from "@rmwc/card";
import { Tooltip } from "@rmwc/tooltip";
import { ClickOutsideHandler } from "@watcourses/components/utils/ClickOutsideHandler";
import { CourseInfo, Schedule_TermSchedule } from "@watcourses/proto/courses";
import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";
import { ProfileCoursesStore } from "../../../stores/ProfileCoursesStore";
import { StudentProfileStore } from "../../../stores/StudentProfileStore";

import { AddOrMoveCourseToTermMenu } from "../AddOrMoveCourseToTermMenu";

import { IRequisite, RequisiteType } from "./index";

interface IRequisiteDetailProps {
  onDismiss: () => void,
  course?: CourseInfo,
  requisite: IRequisite,
}

@observer
export class RequisiteDetail extends React.Component<IRequisiteDetailProps> {
  @observable
  private addCourseMenuOpen = false;

  @action
  private setAddCourseMenuOpen = (open: boolean) => {
    this.addCourseMenuOpen = open;
  };

  constructor(props: IRequisiteDetailProps) {
    super(props);
    makeObservable(this);
  }

  @action
  private removeCourse(course: CourseInfo) {
    const {removeCourseFromSchedule} = StudentProfileStore.get();
    removeCourseFromSchedule(course.code);
    ProfileCoursesStore.get().fetchProfileCourses();
  }

  @action
  private addCourse(course: CourseInfo, term: Schedule_TermSchedule) {
    const {addCourseToTerm} = StudentProfileStore.get();
    addCourseToTerm({code: course.code, termName: term.termName, index: -1});
    ProfileCoursesStore.get().fetchProfileCourses();
  }

  private renderRemoveButton = (course: CourseInfo) => {
    const {requisite} = this.props;
    return (
      <CardActionButton
        outlined={!requisite.necessary}
        raised={requisite.necessary}
        danger
        onClick={() => this.removeCourse(course)}
      >
        Remove
      </CardActionButton>
    );
  };

  private renderAddButton = (course: CourseInfo) => {
    const {requisite} = this.props;
    const {
      addCourseMenuOpen,
      setAddCourseMenuOpen,
    } = this;
    return (
      <AddOrMoveCourseToTermMenu
        title={"Add to"}
        open={addCourseMenuOpen}
        onClose={() => setAddCourseMenuOpen(false)}
        onSelect={(term) => {
          this.addCourse(course, term);
        }}
      >
        <CardActionButton
          outlined={!requisite.necessary}
          raised={requisite.necessary}
          onClick={() => setAddCourseMenuOpen(true)}
        >
          Add
        </CardActionButton>
      </AddOrMoveCourseToTermMenu>
    );
  };

  renderCourse(course: CourseInfo) {
    const {requisite} = this.props;
    const {
      renderRemoveButton,
      renderAddButton,
    } = this;
    const isPrerequisite = requisite.type === RequisiteType.PREREQUISITE;

    // logical XNOR
    const isInSchedule = isPrerequisite === requisite.met;

    return (
      <>
        <TitleContainer>
          <CourseCode>
            {course.code}
          </CourseCode>
          <CourseName>
            {course.name}
          </CourseName>
        </TitleContainer>
        <CardActions>
          <CardActionButtons>
            {isInSchedule
              ? renderRemoveButton(course)
              : renderAddButton(course)}
          </CardActionButtons>
          <CardActionIcons>
            <Tooltip content="Open">
              <CardActionIcon icon="open_in_new"/>
            </Tooltip>
          </CardActionIcons>
        </CardActions>
      </>
    );
  }

  render() {
    const {
      onDismiss,
      course,
    } = this.props;
    return (
      <ClickOutsideHandler onClickOutside={onDismiss}>
        <StyledCard>
          <CardContainer>
            {course && this.renderCourse(course)}
          </CardContainer>
        </StyledCard>
      </ClickOutsideHandler>
    );
  }
}

const StyledCard = styled(Card)<CardProps & React.HTMLProps<HTMLDivElement>>`
  position: relative;
  max-height: 80vh;
  min-width: 300px;
  background-color: white;
  outline: none;
  border-radius: 8px;
  max-width: 448px;
  width: 327px;
  box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14),
  0 9px 46px 8px rgba(0, 0, 0, 0.12),
  0 11px 15px -7px rgba(0, 0, 0, 0.2);
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
`;

const CourseCode = styled.span`
  font-size: 22px;
  font-weight: 500
`;
const CourseName = styled.span`
  font-size: 14px;
  line-height: 20px;
  margin-top: 6px;
`;
