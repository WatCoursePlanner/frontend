import {
  Card,
  CardActionIcon,
  CardActionIcons,
  CardActions,
  CardProps,
} from "@rmwc/card";
import '@rmwc/card/styles';
import {
  List,
  ListItem,
  ListItemGraphic,
  ListItemGraphicProps,
  SimpleListItemProps,
} from "@rmwc/list";
import { Tooltip } from "@rmwc/tooltip";
import '@rmwc/tooltip/styles';
import {
  IRequisite,
  IRequisiteGroup,
  RequisiteChecklist,
  RequisiteGroupChecklist,
} from "@watcourses/components/ScheduleList/Requisite";
import { ClickOutsideHandler } from "@watcourses/components/utils/ClickOutsideHandler";
import { cleanScrollBarWithWhiteBorder } from "@watcourses/constants/styles";
import { CourseInfo, Schedule_TermSchedule } from "@watcourses/proto/courses";
import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { If, Then } from 'react-if';
import styled from "styled-components";

import { ProfileCoursesStore } from "../../stores/ProfileCoursesStore";
import { StudentProfileStore } from "../../stores/StudentProfileStore";

import { AddOrMoveCourseToTermMenu } from "./AddOrMoveCourseToTermMenu";
import { CourseDetailState } from "./CourseDetailState";

interface ICourseDetailProps {
  course: CourseInfo,
  onDismiss: () => void
}

@observer
export class CourseDetail extends React.Component<ICourseDetailProps> {

  @observable
  private moveToMenuOpen = false;

  @observable
  private courseDetailState = new CourseDetailState(this.props.course);

  @action
  private setMoveToMenuOpen = (open: boolean) => {
    this.moveToMenuOpen = open;
  };

  private formatPrerequisiteString = (prerequisites: IRequisiteGroup[]) => {
    return `${
      prerequisites.filter((t: IRequisiteGroup) => t.met).length
    } met, ${
      prerequisites.length -
      prerequisites.filter((t: IRequisiteGroup) => t.met).length
    } not met`;
  };

  private formatAntirequisiteString = (antirequisites: IRequisite[]) => {
    return `has ${
      antirequisites.filter((t: IRequisite) => !t.met).length === 0
        ? 'none'
        : antirequisites.filter((t: IRequisite) => !t.met).length
    }`;
  };

  constructor(props: ICourseDetailProps) {
    super(props);
    makeObservable(this);
  }

  @action
  private moveOrRemoveCourse(
    course: CourseInfo,
    term: Schedule_TermSchedule | null, // when null, the course will be removed.
  ) {
    const {removeCourseFromSchedule, addCourseToTerm} = StudentProfileStore.get();
    removeCourseFromSchedule(course.code);
    if (term !== null) {
      addCourseToTerm({code: course.code, termName: term.termName, index: -1});
    }
    ProfileCoursesStore.get().fetchProfileCourses();
  }

  render() {
    const {
      course,
      onDismiss,
    } = this.props;

    const {
      moveToMenuOpen,
      setMoveToMenuOpen,
    } = this;

    const {
      registeredDescendents,
      scrolled,
      handleScroll,
      prerequisites,
      antirequisites,
    } = this.courseDetailState;

    return (
      <ClickOutsideHandler
        onClickOutside={onDismiss}
        ignoreContainerRefs={registeredDescendents}
      >
        <StyledCard>
          <CardActions>
            <CardActionIcons>
              <Tooltip content="Open">
                <CardActionIcon icon="open_in_new"/>
              </Tooltip>
              <AddOrMoveCourseToTermMenu
                title={"Move to"}
                open={moveToMenuOpen}
                onClose={() => setMoveToMenuOpen(false)}
                onSelect={(term) => {
                  this.moveOrRemoveCourse(course, term);
                }}
              >
                <Tooltip content="Move">
                  <CardActionIcon
                    onClick={() => setMoveToMenuOpen(true)}
                    icon="forward"
                  />
                </Tooltip>
              </AddOrMoveCourseToTermMenu>
              <Tooltip content="Delete">
                <CardActionIcon
                  icon="delete_outline"
                  onClick={() => this.moveOrRemoveCourse(course, null)}/>
              </Tooltip>
            </CardActionIcons>
            <CardActionIcons style={{flexGrow: 0, marginLeft: 8}}>
              <Tooltip content="Close">
                <CardActionIcon onClick={() => onDismiss()} icon="close"/>
              </Tooltip>
            </CardActionIcons>
          </CardActions>
          <CardContainer
            scrolled={scrolled ? 1 : 0}
            onScroll={handleScroll}>
            <List nonInteractive>
              <TitleContainer>
                <CourseCode>
                  {course?.code ?? ''}
                </CourseCode>
                <CourseName>
                  {course?.name ?? ''}
                </CourseName>
              </TitleContainer>
              <StyledListItem ripple={false}>
                <StyledListItemGraphic
                  className={'unselectable'} icon="notes"/>
                <ListContentTitle>
                  {course?.description ?? ''}
                </ListContentTitle>
              </StyledListItem>
              <If condition={prerequisites.length > 0}><Then>
                <StyledListItem ripple={false}>
                  <StyledListItemGraphic
                    className={'unselectable'} icon="check_circle_outline"/>
                  <ListContent>
                    <ListContentTitle>
                      {prerequisites.length} Prerequisites
                    </ListContentTitle>
                    <ListContentSubtitle>
                      {this.formatPrerequisiteString(prerequisites)}
                    </ListContentSubtitle>
                    <RequisiteGroupChecklist
                      courseDetailState={this.courseDetailState}
                      requisiteGroups={prerequisites}
                    />
                  </ListContent>
                </StyledListItem>
              </Then></If>
              <If condition={antirequisites.length > 0}><Then>
                <StyledListItem ripple={false}>
                  <StyledListItemGraphic
                    className={'unselectable'} icon="block"/>
                  <ListContent>
                    <ListContentTitle>
                      {antirequisites.length} Antirequisites
                    </ListContentTitle>
                    <ListContentSubtitle>
                      {this.formatAntirequisiteString(antirequisites)}
                    </ListContentSubtitle>
                    <RequisiteChecklist
                      courseDetailState={this.courseDetailState}
                      requisites={antirequisites}
                    />
                  </ListContent>
                </StyledListItem>
              </Then></If>
            </List>
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
  width: 448px;
  box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14),
  0 9px 46px 8px rgba(0, 0, 0, 0.12),
  0 11px 15px -7px rgba(0, 0, 0, 0.2);
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

const CardContainer = styled.div<{ scrolled: number }>`
  display: flex;
  flex-direction: column;
  padding: 18px 12px;
  overflow-y: auto;
  ${cleanScrollBarWithWhiteBorder};

  &:before {
    content: "";
    position: absolute;
    top: 52px;
    left: 0;
    right: 0;
    height: 8px;
    z-index: 5;
    background-color: transparent;
    box-shadow: inset 0 2px 2px 0 rgba(0, 0, 0, .12);
    transition: opacity .2s;
    opacity: ${props => props.scrolled ? 1 : 0};
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 56px;
  margin-bottom: -8px;
`;

const StyledListItemGraphic = styled(ListItemGraphic)<ListItemGraphicProps &
  React.HTMLProps<HTMLDivElement>>`
  color: rgba(0, 0, 0, .54);
  margin-right: 16px;
`;

const ListContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`;

const ListContentTitle = styled.span`
  font-size: 14px;
  white-space: pre-wrap;
  line-height: 18px;
`;

const ListContentSubtitle = styled(ListContentTitle)`
  margin: 4px 0;
  font-size: 12px;
  opacity: .8;
`;

const StyledListItem = styled(ListItem)<SimpleListItemProps>`
  height: auto;
  align-items: start;
  margin-top: 32px;
`;
