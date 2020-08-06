import React from "react";
import {Container} from "react-smooth-dnd";
import ScheduleCourse from "./ScheduleCourse";
import {CourseInfo} from "../../proto/courses";
import styled from "styled-components";
import {ContainerOptions, DropResult} from "smooth-dnd/dist/src/exportTypes";

type ShortListProps = {
    shortlist: string[],
    courses: { [courseCode: string]: CourseInfo },
    options: ContainerOptions,
    onDropWithTerm: (result: DropResult, termName: string) => void,
}

const RootContainer = styled.div`
    margin-left: 43px;
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

const Title = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin: 5vh 0 5vh 0;
`

const ScheduleShortList = ({shortlist, courses, onDropWithTerm, options}: ShortListProps) => {
    return (
        <RootContainer>
            <Title>Shortlist</Title>
            <StyledContainer>
                <Container groupName={'terms'}
                           getChildPayload={idx => shortlist[idx]}
                           onDrop={(e) => onDropWithTerm(e, "shortlist")}
                           {...options}>
                    {shortlist.map((code, index) => (
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

export default ScheduleShortList
