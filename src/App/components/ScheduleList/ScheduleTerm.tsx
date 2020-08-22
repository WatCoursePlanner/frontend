import React from "react";
import {Container} from 'react-smooth-dnd';
import {CheckResults, CourseInfo, Schedule_TermSchedule} from "../../proto/courses";
import ScheduleCourse from "./ScheduleCourse";
import styled from "styled-components";
import {ContainerOptions, DropResult} from "smooth-dnd/dist/src/exportTypes";
import {CachedCourses} from "../../utils";

type ScheduleTermProps = {
    showYear: boolean,
    term: Schedule_TermSchedule,
    courses: { [courseCode: string]: CourseInfo }
    index: number,
    options: ContainerOptions,
    onDropWithTerm: (result: DropResult, termName: string) => void,
    issues: CheckResults | null
}

const RootContainer = styled.div`
    margin-left: 56px;
    height: 100%;
    display: flex;
    flex-direction: column;
`

const StyledContainer = styled.div`
    flex-grow: 1;
    min-width: 296px;
    overflow-y: auto;
    margin-left: -16px;
    margin-top: -4px;
    padding: 8px 0 16px 0;
    scrollbar-color: #ececec transparent;
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
    
    .smooth-dnd-container {
      min-height: 40vh;
    }
    
    .smooth-dnd-draggable-wrapper {
      overflow: visible !important;
      background-color: transparent;
    }
`

const Year = styled.span`
    font-size: 14px;
    font-weight: 500;
    min-height: 18px;
    margin: 5vh 0 5vh 0;
`

const TermName = styled.span`
    font-size: 20px;
    font-weight: 500;
    text-transform: capitalize;
`

const TermCode = styled.span`
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    margin-left: 16px;
`

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    margin-bottom: 2vh;
`

const ScheduleTerm = ({term, index, courses, showYear, options, onDropWithTerm, issues}: ScheduleTermProps) => {
    return (
        <RootContainer>
            <Year>{showYear ? term.year : ''}</Year>
            <Row>
                <TermName>{term.term.toString().toLowerCase()}</TermName>
                <TermCode>{term.termName}</TermCode>
            </Row>
            <StyledContainer>
                <Container groupName={'terms'}
                           dropPlaceholder={{className: 'drop-placeholder'}}
                           getChildPayload={idx => term.courseCodes[idx]}
                           onDrop={(e) => onDropWithTerm(e, term.termName)}
                           dragClass="card-ghost"
                           dropClass="card-ghost-drop"
                           {...options}>
                    {term.courseCodes.map((code, index) => (
                        <ScheduleCourse key={index} course={courses[code] ?? CachedCourses.getByCode(code)}/>
                    ))}
                </Container>
            </StyledContainer>
        </RootContainer>
    )
}

export default ScheduleTerm
