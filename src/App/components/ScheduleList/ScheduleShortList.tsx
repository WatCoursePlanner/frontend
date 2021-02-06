import React from "react";
import styled from "styled-components";

import { CourseList } from "./CourseList";

interface IShortListProps {
  shortlist: string[],
}

export class ScheduleShortList extends CourseList<IShortListProps> {
  render() {
    const {
      shortlist,
      courses,
      onDropWithTerm,
      options,
      shortListOpen,
      scheduleListRef,
    } = this.props;
    return (
      <RootContainer>
        <Title>Shortlist</Title>
        <CourseList
          shortlist={shortlist}
          courses={courses}
          options={options}
          onDropWithTerm={onDropWithTerm}
          shortListOpen={shortListOpen}
          scheduleListRef={scheduleListRef}
        />
      </RootContainer>
    );
  }
}

const RootContainer = styled.div`
  margin-left: 43px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin: 5vh 0 16px 0;
  min-height: 24px;
`;
