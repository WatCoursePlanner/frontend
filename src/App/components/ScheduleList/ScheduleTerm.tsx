import React from "react";
import {Droppable} from "react-beautiful-dnd";
import {CourseInfo, Schedule_TermSchedule} from "../../proto/courses";
import ScheduleCourse from "./ScheduleCourse";
import {RootState} from "../../duck/types";
import {CoursesState} from "../../duck/reducers/courses";

type ScheduleTermProps = {
    term: Schedule_TermSchedule,
    courses: { [courseCode: string]: CourseInfo }
    index: number
}

const ScheduleTerm = ({term, index, courses}: ScheduleTermProps) => {
    return (
        <Droppable droppableId={index.toString()}>
            {(provided, snapshot) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    {term.courseCodes.map((code, index) => (
                        <ScheduleCourse
                            key={code}
                            code={code}
                            index={index}
                            name={courses[code] ? courses[code].name : undefined}/>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}

export default ScheduleTerm
