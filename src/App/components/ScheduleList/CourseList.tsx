import Spacer from "@watcourses/components/Spacer";
import { cleanScrollBar } from "@watcourses/constants/styles";
import { CheckResults, CourseInfo, Schedule_TermSchedule } from "@watcourses/proto/courses";
import { CachedCoursesStore } from "@watcourses/stores/CachedCoursesStore";
import { SHORTLIST_TERM_NAME } from "@watcourses/stores/StudentProfileStore";
import React, { useState } from "react";
import { Container } from "react-smooth-dnd";
import { ContainerOptions, DropResult } from "smooth-dnd/dist/src/exportTypes";
import styled from "styled-components";

import ScheduleCourse from "./ScheduleCourse";

export type CourseListProps = {
  term?: Schedule_TermSchedule,
  shortlist?: string[],
  courses: { [courseCode: string]: CourseInfo }
  options: ContainerOptions,
  onDropWithTerm: (result: DropResult, termName: string) => void,
  issues?: CheckResults | null
}

const StyledContainer = styled.div<{ scrolled: number }>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  padding: 5px 0 32px 0;
  margin-bottom: -32px;
  ${cleanScrollBar};

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 8px;
    right: 12px;
    height: 8px;
    background-color: transparent;
    box-shadow: inset 0 4px 4px 0 rgba(0, 0, 0, .14), inset 0 4px 2px -2px rgba(0, 0, 0, .12);
    transition: opacity .2s;
    opacity: ${props => props.scrolled ? 1 : 0};
    z-index: 2;
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 12px;
    width: 8px;
    height: 8px;
    background-image: linear-gradient(to left, white, rgba(255, 255, 255, 0));
    z-index: 2;
  }

  :hover {
    overflow-y: auto;
  }

  .smooth-dnd-container {
    position: relative;
    min-height: unset;
    flex-grow: 1;
  }

  .smooth-dnd-draggable-wrapper {
    overflow: visible !important;
    background-color: transparent;
  }
`;

const CourseListWrapper = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
  min-width: 300px;
  margin-top: -4px;
  margin-left: -16px;
  flex-grow: 1;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 8px;
    width: 8px;
    height: 8px;
    background-image: linear-gradient(to right, white, rgba(255, 255, 255, 0));
    z-index: 3;
  }
`;

const CourseList = ({term, onDropWithTerm, options, courses, shortlist, issues}: CourseListProps) => {
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    if (e.currentTarget.scrollTop > 0) {
      if (!scrolled) {
        setScrolled(true);
      }
    } else {
      if (scrolled) {
        setScrolled(false);
      }
    }
  };

  return (
    <CourseListWrapper>
      <StyledContainer
        className={'course-list'}
        scrolled={scrolled ? 1 : 0}
        onScroll={handleScroll}>
        <Container
          groupName={'terms'}
          dropPlaceholder={{className: 'drop-placeholder'}}
          getChildPayload={idx =>
            term?.courseCodes[idx] ??
            (shortlist ? shortlist[idx] : null)
          }
          onDrop={(e) => onDropWithTerm(
            e,
            term?.termName ??
            (shortlist ? SHORTLIST_TERM_NAME : 'null'),
          )}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          {...options}>
          {(term?.courseCodes ?? shortlist ?? [])
            .map((code, index) => (
              <ScheduleCourse
                key={index}
                course={
                  courses[code] ??
                  CachedCoursesStore.get().getByCode(code)
                }/>
            ))}
        </Container>
        <Spacer minWidth={'1px'} minHeight={'32px'}/>
      </StyledContainer>
    </CourseListWrapper>
  );
};

export default CourseList;
