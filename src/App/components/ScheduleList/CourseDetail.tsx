import {
  Card,
  CardActionIcon,
  CardActionIcons,
  CardActions,
  CardProps,
} from "@rmwc/card";
import {
  List,
  ListItem,
  ListItemGraphic,
  ListItemGraphicProps,
  SimpleListItemProps,
} from "@rmwc/list";
import { Tooltip } from "@rmwc/tooltip";
import { ClickOutsideHandler } from "@watcourses/components/utils/ClickOutsideHandler";
import { cleanScrollBarWithWhiteBorder } from "@watcourses/constants/styles";
import { course as coursePath } from "@watcourses/paths";
import { CourseInfo } from "@watcourses/proto/courses";
import { AppHistory } from "@watcourses/services/AppHistory";
import { ProfileCoursesStore } from "@watcourses/stores/ProfileCoursesStore";
import { StudentProfileStore } from "@watcourses/stores/StudentProfileStore";
import { CourseRequisites } from "App/components/ScheduleList/CourseRequisites";
import { Spacer } from "App/components/Spacer";
import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";

import { AddOrMoveCourseToTermMenu } from "./AddOrMoveCourseToTermMenu";
import { CourseDetailState } from "./CourseDetailState";

interface ICourseDetailProps {
  courseDetailState: CourseDetailState,
  course?: CourseInfo,
  fromTerm?: string,
  displayRequisiteCheck: boolean,
  onDismiss: () => void,
}

@observer
export class CourseDetail extends React.Component<ICourseDetailProps> {

  @observable
  private moveToMenuOpen = false;

  @action
  private setMoveToMenuOpen = (open: boolean) => {
    this.moveToMenuOpen = open;
  };

  constructor(props: ICourseDetailProps) {
    super(props);
    makeObservable(this);
  }

  @action
  private moveOrRemoveCourse(
    course?: CourseInfo,
    fromTerm?: string,
    toTerm?: string, // when null, the course will be removed.
  ) {
    const {removeCourseFromTerm} = StudentProfileStore.get();
    if (!course || !fromTerm) {
      return;
    }
    if (!toTerm) {
      removeCourseFromTerm({
        termName: fromTerm,
        indexOrCode: course.code,
      });
    } else {
      StudentProfileStore.get().moveCourse(course, fromTerm, toTerm);
    }
    ProfileCoursesStore.get().fetchProfileCourses();
  }

  render() {
    const {
      course,
      onDismiss,
      fromTerm,
      displayRequisiteCheck,
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
    } = this.props.courseDetailState;

    return (
      <ClickOutsideHandler
        onClickOutside={onDismiss}
        ignoreContainerRefs={registeredDescendents}
      >
        <StyledCard>
          <CardActions>
            <CardActionIcons>
              <Tooltip content="Open">
                <CardActionIcon
                  onClick={() => {
                    if (course) {
                      AppHistory.get()
                        .goTo(`${coursePath.home()}/${course.code}`);
                    }
                  }}
                  icon="open_in_new"
                />
              </Tooltip>
              <AddOrMoveCourseToTermMenu
                title={"Move to"}
                open={moveToMenuOpen}
                onClose={() => setMoveToMenuOpen(false)}
                onSelect={(term) => {
                  this.moveOrRemoveCourse(course, fromTerm, term.termName);
                  onDismiss();
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
                  onClick={() => this.moveOrRemoveCourse(course, fromTerm)}/>
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
              <Spacer height={32}/>
              <CourseRequisites
                hasPadding
                courseDetailState={this.props.courseDetailState}
                displayRequisiteCheck={displayRequisiteCheck}
                prerequisites={prerequisites}
                antirequisites={antirequisites}
              />
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

const ListContentTitle = styled.span`
  font-size: 14px;
  white-space: pre-wrap;
  line-height: 18px;
`;

const StyledListItem = styled(ListItem)<SimpleListItemProps>`
  height: auto;
  align-items: start;
  margin-top: 32px;
`;
