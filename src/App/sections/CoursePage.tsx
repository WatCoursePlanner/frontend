import {
  CircularProgress,
  LinearProgress,
  withStyles,
} from "@material-ui/core";
import { Button } from "@rmwc/button";
import { Card, CardProps } from "@rmwc/card";
import { Chip, ChipHTMLProps, ChipProps, ChipSet } from "@rmwc/chip";
import { GridList } from "@rmwc/grid-list";
import {
  IconButton,
  IconButtonHTMLProps,
  IconButtonProps,
} from "@rmwc/icon-button";
import { Spacer } from "@watcourses/components/Spacer";
import getCourse from "@watcourses/api/Course/get";
import { CourseRequisites } from "@watcourses/components/ScheduleList/CourseRequisites";
import { Column, HorizontalLine, Row } from "@watcourses/constants/layout";
import { CourseInfo } from "@watcourses/proto/courses";
import { AppHistory } from "@watcourses/services/AppHistory";
import { capitalize } from "@watcourses/utils/helpers";
import { RequisiteHelper } from "@watcourses/utils/RequisiteHelper";
import { action, computed, makeObservable, observable, reaction } from "mobx";
import { disposeOnUnmount, observer } from "mobx-react";
import { fromPromise, IPromiseBasedObservable, PENDING } from "mobx-utils";
import React from 'react';
import styled from "styled-components";

interface ICoursePageProps {
  code: string;
}

@observer
export class CoursePage extends React.Component<ICoursePageProps> {

  @observable
  private coursePromise?: IPromiseBasedObservable<CourseInfo>;

  @computed
  get isLoading(): boolean {
    return this.coursePromise?.state === PENDING;
  }

  @computed
  get course(): CourseInfo | undefined {
    return this.coursePromise?.case({
      fulfilled: (response: CourseInfo) => response,
    });
  }

  constructor(props: ICoursePageProps) {
    super(props);
    makeObservable(this);
  }

  @disposeOnUnmount
  updateCourseReaction = reaction(
    () => [this.props.code],
    () => {
      this.coursePromise = fromPromise(getCourse(this.props.code));
    },
    {fireImmediately: true},
  );

  private renderHeader = () => {
    if (!this.course) {
      return <CircularProgress/>;
    }
    return (
      <>
        <Column>
          <Title>{this.props.code}</Title>
          <Spacer height={8}/>
          <Subtitle>{this.course.name}</Subtitle>
          <Spacer height={12}/>
        </Column>
        <Row flex={1} justify={"flex-end"} align={"flex-end"}>
          <StyledIconButton icon={'favorite_border'}/>
          <StyledIconButton icon={'more_vert'}/>
          <Spacer width={8}/>
          <Column>
            <Button raised>
              Add
            </Button>
            <Spacer height={6}/>
          </Column>
        </Row>
      </>
    );
  };

  private renderDescription = () => {
    if (!this.course) {
      return <></>;
    }
    return (
      <StyledCard outlined>
        <CardContainer>
          <SectionTitle>
            Description
          </SectionTitle>
          <Spacer height={16}/>
          <SectionText>
            {this.course.description}
          </SectionText>
        </CardContainer>
      </StyledCard>
    );
  };

  private renderReviews = () => {
    if (!this.course) {
      return <></>;
    }
    return (
      <StyledCard outlined>
        <CardContainer>
          <SectionTitle>
            Reviews
          </SectionTitle>
          <Spacer height={16}/>
          <Column>
            <EvalBar
              title={"Liked"}
              value={this.course.liked}/>
            <Spacer height={16}/>
            <EvalBar
              title={"Useful"}
              value={this.course.useful}/>
            <Spacer height={16}/>
            <EvalBar
              title={"Easy"}
              value={this.course.easy}/>
          </Column>
        </CardContainer>
      </StyledCard>
    );
  };

  @observable
  private selectedTermIndex: number = 0;

  @computed
  get terms() {
    return ["Spring 2021", "Fall 2021"];
  }

  @action
  selectTerm(index: number) {
    if (index < 0 || index >= this.terms.length) {
      return;
    }
    this.selectedTermIndex = index;
  }

  // TODO fetch & display schedule
  private renderSchedule = () => {
    if (!this.course) {
      return <></>;
    }
    return (
      <StyledCard outlined>
        <CardContainer>
          <SectionTitle>
            Schedule (TODO)
          </SectionTitle>
          <Spacer height={16}/>
          <ChipSet>
            {this.terms.map((term, index) => (
              <StyledChip
                key={term}
                className={'unselectable'}
                selected={index === this.selectedTermIndex}
                onClick={() => {
                  (document.activeElement as HTMLElement).blur();
                  this.selectTerm(index);
                }}
              >
                {capitalize(term)}
              </StyledChip>
            ))}
          </ChipSet>
        </CardContainer>
      </StyledCard>
    );
  };

  private renderRequisites = () => {
    if (!this.course) {
      return <></>;
    }
    const prerequisites = RequisiteHelper.getPreRequisite(this.course);
    const antirequisites = RequisiteHelper.getAntiRequisite(this.course);
    if (prerequisites.length === 0 && antirequisites.length === 0) {
      return <></>;
    }
    return (
      <StyledCard outlined>
        <CardContainer>
          <SectionTitle>
            Requisites
          </SectionTitle>
          <Spacer height={16}/>
          <Row>
            <CourseRequisites
              displayRequisiteCheck={false}
              prerequisites={prerequisites}
              antirequisites={antirequisites}
            />
          </Row>
        </CardContainer>
      </StyledCard>
    );
  };

  render() {
    return (
      <Root>
        <Container>
          <Spacer height={16}/>
          <StyledIconButton
            icon={'arrow_back'}
            onClick={() => AppHistory.get().history.goBack()}
          />
          <Row>
            <Spacer width={64}/>
            {this.renderHeader()}
          </Row>
          <Spacer height={16}/>
        </Container>
        <HorizontalLine/>
        {this.course && (
          <Container>
            <Row>
              <Spacer width={64}/>
              <Column flex={1}>
                <Spacer height={24}/>
                <Row>
                  <Column flex={3}>
                    {this.renderDescription()}
                  </Column>
                  <Spacer width={24}/>
                  <Column flex={2} style={{minWidth: 250}}>
                    {this.renderReviews()}
                  </Column>
                </Row>
                <Spacer height={24}/>
                {this.renderSchedule()}
                <Spacer height={24}/>
                {this.renderRequisites()}
              </Column>
            </Row>
          </Container>
        )}
        <Spacer height={32}/>
      </Root>
    );
  }
}

const EvalBar = ({
  title,
  value,
}: { title: string, value: number }) => {
  const rounded = Math.round(value * 100);
  return (
    <Row align={"center"}>
      <Row style={{width: 50}}>
        <SectionText>
          {title}
        </SectionText>
      </Row>
      <Spacer width={12}/>
      <BorderLinearProgress variant="determinate" value={rounded}/>
      <Spacer width={12}/>
      <Row style={{width: 25}}>
        <SectionText>
          {rounded}%
        </SectionText>
      </Row>
    </Row>
  );
};

const Root = styled.div`
  height: 100%;
  margin-left: 16px;
  padding-right: 16px;
  overflow-y: auto;
`;

const Container = styled(Column)`
  max-width: 954px;
`;

const Title = styled.span`
  font-size: 28px;
  font-weight: 600;
`;

const Subtitle = styled.span`
  font-size: 18px;
`;

export const StyledIconButton = styled(IconButton)<IconButtonHTMLProps &
  IconButtonProps & {
  filled?: number
}>`
  color: #5f6368;
  font-family: ${props => props.filled
          ? "Material Icons"
          : "Material Icons Outlined"};
`;

const StyledCard = styled(Card)<CardProps & React.HTMLProps<HTMLDivElement>>`
  width: 100%;
  background-color: white;
  outline: none;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 18px;
`;

const SectionTitle = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const SectionText = styled.span`
  font-size: 14px;
`;

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

const StyledChip = styled(Chip)<ChipProps & ChipHTMLProps & {
  selected: boolean,
}>`
  background-color: ${props => props.selected ? '#edf7fe' : '#f5f5f5'};
  color: ${props => props.selected ? '#2196F3' : 'black'};

  i {
    color: ${props => props.selected ? '#2196f3' : '#616161'};
  }
`;
