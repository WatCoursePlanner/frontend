import {
  CheckResults,
  CourseInfo,
  StudentProfile,
} from "@watcourses/proto/courses";
import React from "react";
import { ContainerOptions, DropResult } from "smooth-dnd/dist/src/exportTypes";

import { ScheduleTerm } from "./ScheduleTerm";

interface ITermListProps {
  issues: { [termName: string]: CheckResults },
  studentProfile: StudentProfile | null,
  profileCourses: { [courseCode: string]: CourseInfo },
  options: ContainerOptions,
  onDropWithTerm: (result: DropResult, termName: string) => void,
  shortListOpen: boolean,
  scheduleListRef: React.RefObject<HTMLDivElement>,
}

export class ScheduleTermList extends React.Component<ITermListProps> {
  render() {
    const {
      issues,
      studentProfile,
      profileCourses,
      options,
      onDropWithTerm,
      shortListOpen,
      scheduleListRef,
    } = this.props;

    const shownYears: number[] = [];

    if (!studentProfile || !studentProfile.schedule) {
      return null;
    }

    return <>{
      studentProfile.schedule.terms
        .map((term, index) => {
          const showYear = !shownYears.includes(term.year);
          if (showYear) {
            shownYears.push(term.year);
          }
          return (
            <ScheduleTerm
              key={index}
              issues={issues ? issues[term.termName] : null}
              term={term}
              courses={profileCourses}
              showYear={showYear}
              options={options}
              onDropWithTerm={onDropWithTerm}
              shortListOpen={shortListOpen}
              scheduleListRef={scheduleListRef}
            />
          );
        })
    } </>;
  }
}
