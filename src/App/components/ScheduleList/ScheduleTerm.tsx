import { Schedule_TermSchedule } from "@watcourses/proto/courses";
import React from "react";
import styled from "styled-components";

import { CourseList } from "./CourseList";

interface IScheduleTermProps {
  term: Schedule_TermSchedule,
  showYear: boolean,
}

export class ScheduleTerm extends CourseList<IScheduleTermProps> {
  render() {
    const {
      term,
      courses,
      showYear,
      options,
      onDropWithTerm,
      issues,
      shortListOpen,
      scheduleListRef,
    } = this.props;
    return (
      <RootContainer>
        <Year> {showYear ? term.year : ''}</Year>
        <Row>
          <TermName>{term.term.toString().toLowerCase()}</TermName>
          <TermCode>{term.termName}</TermCode>
        </Row>
        <CourseList
          term={term}
          courses={courses}
          options={options}
          onDropWithTerm={onDropWithTerm}
          issues={issues}
          shortListOpen={shortListOpen}
          scheduleListRef={scheduleListRef}
        />
      </RootContainer>
    );
  }
}

const RootContainer = styled.div`
  margin-left: 56px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Year = styled.span`
  font-size: 14px;
  font-weight: 500;
  min-height: 18px;
  margin: 5vh 0 5vh 0;
`;

const TermName = styled.span`
  font-size: 20px;
  font-weight: 500;
  text-transform: capitalize;
`;

const TermCode = styled.span`
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  margin-left: 16px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 16px;
  min-height: 24px;
`;
