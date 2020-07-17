import React from "react";
import {Container} from 'react-smooth-dnd';
import {CourseInfo, Schedule_TermSchedule} from "../../proto/courses";
import ScheduleCourse from "./ScheduleCourse";
import styled from "styled-components";

type ScheduleTermProps = {
    term: Schedule_TermSchedule,
    courses: { [courseCode: string]: CourseInfo }
    index: number
}

const RootContainer = styled.div`
    margin-left: 40px;
    height: 100%;
    display: flex;
    flex-direction: column;
`

const StyledContainer = styled.div`
    flex-grow: 1;
    min-width: 289px;
    overflow-y: auto;
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: transparent; 
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background: #ececec; 
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #e0e0e0; 
    }
`

const ScheduleTerm = ({term, index, courses}: ScheduleTermProps) => {
    return (
        <RootContainer>
            <h1>{2019}</h1>
            <h1>{term.termName}</h1>
            <StyledContainer>
                <Container groupName={'terms'}>
                    {term.courseCodes.map((code, index) => (
                        <ScheduleCourse
                            key={code}
                            code={code}
                            index={index}
                            name={courses[code] ? courses[code].name : undefined}/>
                    ))}
                </Container>
            </StyledContainer>
        </RootContainer>
    )
}

export default ScheduleTerm
