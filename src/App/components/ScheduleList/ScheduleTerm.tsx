import React from "react";
import {Container, Draggable} from 'react-smooth-dnd';
import {CourseInfo, Schedule_TermSchedule} from "../../proto/courses";
import ScheduleCourse from "./ScheduleCourse";

type ScheduleTermProps = {
    term: Schedule_TermSchedule,
    courses: { [courseCode: string]: CourseInfo }
    index: number
}

const ScheduleTerm = ({term, index, courses}: ScheduleTermProps) => {
    return (
        <Draggable>
            <Container groupName={'terms'} style={{
                height: '100%',
                minWidth: 289,
                overflowY: 'auto',
            }}>
            {term.courseCodes.map((code, index) => (
                <ScheduleCourse
                    key={code}
                    code={code}
                    index={index}
                    name={courses[code] ? courses[code].name : undefined}/>
            ))}
            </Container>
        </Draggable>
    )
}

export default ScheduleTerm
