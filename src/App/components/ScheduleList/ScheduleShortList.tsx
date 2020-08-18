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
      min-height: 80%;
    }
    
    .smooth-dnd-draggable-wrapper {
      overflow: visible !important;
      background-color: transparent;
    }
`

const Title = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin: 5vh 0 2vh 0;
`

const ScheduleShortList = ({shortlist, courses, onDropWithTerm, options}: ShortListProps) => {
    return (
        <RootContainer>
            <Title>Shortlist</Title>
            <StyledContainer>
                <Container groupName={'terms'}
                           dropPlaceholder={{className: 'drop-placeholder'}}
                           getChildPayload={idx => shortlist[idx]}
                           onDrop={(e) => onDropWithTerm(e, "shortlist")}
                           dragClass="card-ghost"
                           dropClass="card-ghost-drop"
                           {...options}>
                    {shortlist.map((code, index) => (
                        <ScheduleCourse
                            key={code}
                            code={code}
                            index={index}
                            name={courses[code]?.name ?? undefined}/>
                    ))}
                </Container>
            </StyledContainer>
        </RootContainer>
    )
}

export default ScheduleShortList
