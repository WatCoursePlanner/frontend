import React from "react";
import { ContainerOptions, DropResult } from "smooth-dnd/dist/src/exportTypes";

import { CheckResults, CourseInfo, StudentProfile } from "../../proto/courses";

import { ScheduleTerm } from "./index";

type TermListProps = {
    issues: { [termName: string]: CheckResults },
    studentProfile: StudentProfile | null,
    profileCourses: { [courseCode: string]: CourseInfo },
    options: ContainerOptions,
    onDropWithTerm: (result: DropResult, termName: string) => void,
}

const TermList = ({issues, studentProfile, profileCourses, options, onDropWithTerm}: TermListProps) => {
    const shownYears: number[] = []
    if (!studentProfile || !studentProfile.schedule) {
        return <div/>
    }

    return <>{studentProfile.schedule.terms
        .map((term, index) => {
            const showYear = !shownYears.includes(term.year)
            if (showYear) {
                shownYears.push(term.year)
            }
            return (<ScheduleTerm
                key={term.termName}
                issues={issues ? issues[term.termName] : null}
                term={term}
                courses={profileCourses}
                showYear={showYear}
                options={options}
                onDropWithTerm={onDropWithTerm}/>)
        })} </>
}

export default TermList
