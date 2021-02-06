import React from "react";
import styled from "styled-components";

import CourseList, { CourseListProps } from "./CourseList";

type ShortListProps = {
  shortlist: string[],
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

const ScheduleShortList = ({
  shortlist,
  courses,
  onDropWithTerm,
  options,
  shortListOpen,
  scheduleListRef,
}: ShortListProps & CourseListProps) => {
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
};

export default ScheduleShortList;
