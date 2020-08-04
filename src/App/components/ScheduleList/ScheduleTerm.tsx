import React from "react";
import {Container} from 'react-smooth-dnd';
import {CheckResults, CheckResults_Issue, CourseInfo, Schedule_TermSchedule} from "../../proto/courses";
import ScheduleCourse from "./ScheduleCourse";
import styled from "styled-components";
import {ContainerOptions, DropResult} from "smooth-dnd/dist/src/exportTypes";

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
    min-width: 280px;
    overflow-y: auto;
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

const OverlayDiv = styled.div`
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background-color:#f73378aa;
    z-index:100;
    text-align:center;
    color:white;
`

const TextInsideOverlay = styled.div`
    position:relative;
    vertical-align: middle;
    padding: 10px 15px;
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
                           style={{height: '100%'}}
                           getChildPayload={idx => term.courseCodes[idx]}
                           onDrop={(e) => onDropWithTerm(e, term.termName)}
                           {...options}>
                    {(issues && issues.issues.length !== 0) ?
                        <OverlayDiv>
                            {
                                issues.issues.map(
                                    (issue: CheckResults_Issue) =>
                                        (<TextInsideOverlay>
                                            <p>{issue.type}</p>
                                            <p>{issue.subjectName}</p>
                                            <p>{issue.relatedCondRaw}</p>
                                            <p>{issue.relatedCond}</p>
                                        </TextInsideOverlay>)
                                )
                            }
                        </OverlayDiv>
                        : null}
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
