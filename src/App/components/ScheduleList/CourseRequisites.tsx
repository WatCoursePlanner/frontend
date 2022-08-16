import {
  ListItem,
  ListItemGraphic,
  ListItemGraphicProps,
  SimpleListItemProps,
} from "@rmwc/list";
import {
  IRequisite,
  IRequisiteGroup,
  RequisiteChecklist,
  RequisiteGroupChecklist,
} from "@watcourses/components/ScheduleList/Requisite";
import { CourseDetailState } from "App/components/ScheduleList/CourseDetailState";
import { Row } from "@watcourses/constants/layout";
import { observer } from "mobx-react";
import React from "react";
import { If, Then } from 'react-if';
import styled from "styled-components";

interface ICourseRequisitesProps {
  hasPadding?: boolean;
  displayRequisiteCheck: boolean;
  prerequisites: IRequisiteGroup[];
  antirequisites: IRequisite[];
  courseDetailState?: CourseDetailState;
}

@observer
export class CourseRequisites extends React.Component<ICourseRequisitesProps> {
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

  render() {
    const {
      courseDetailState,
      displayRequisiteCheck,
      prerequisites,
      antirequisites,
      hasPadding,
    } = this.props;

    return (
      <>
        <If condition={prerequisites.length > 0}><Then>
          <StyledListItem hasPadding={!!hasPadding}>
            <StyledListItemGraphic
              className={'unselectable'} icon="check_circle_outline"/>
            <ListContent>
              <ListContentTitle>
                {prerequisites.length} Prerequisites
              </ListContentTitle>
              <ListContentSubtitle>
                {displayRequisiteCheck && this.formatPrerequisiteString(prerequisites)}
              </ListContentSubtitle>
              <RequisiteGroupChecklist
                displayRequisiteCheck={displayRequisiteCheck}
                requisiteGroups={prerequisites}
              />
            </ListContent>
          </StyledListItem>
        </Then></If>
        <If condition={antirequisites.length > 0}><Then>
          <StyledListItem hasPadding={!!hasPadding}>
            <StyledListItemGraphic
              className={'unselectable'} icon="block"/>
            <ListContent>
              <ListContentTitle>
                {antirequisites.length} Antirequisites
              </ListContentTitle>
              <ListContentSubtitle>
                {displayRequisiteCheck && this.formatAntirequisiteString(antirequisites)}
              </ListContentSubtitle>
              <RequisiteChecklist
                courseDetailState={courseDetailState}
                displayRequisiteCheck={displayRequisiteCheck}
                requisites={antirequisites}
              />
            </ListContent>
          </StyledListItem>
        </Then></If>
      </>
    );
  }
}

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

const StyledListItem = styled(Row)<{ hasPadding: boolean }>`
  height: auto;
  align-items: start;
  ${props => props.hasPadding ? `padding: 0 16px` : `padding: 0`};
  flex: 1;
`;
