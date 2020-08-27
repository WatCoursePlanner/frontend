import React, {useState} from "react";
import {Container} from 'react-smooth-dnd';
import {CheckResults, CourseInfo, Schedule_TermSchedule} from "../../proto/courses";
import ScheduleCourse from "./ScheduleCourse";
import styled from "styled-components";
import {ContainerOptions, DropResult} from "smooth-dnd/dist/src/exportTypes";
import {CachedCourses} from "../../utils";
import {cleanScrollBar} from "../../constants/styles";
import Spacer from "../Spacer";

type ScheduleTermProps = {
    showYear: boolean,
    term: Schedule_TermSchedule,
    courses: { [courseCode: string]: CourseInfo }
    options: ContainerOptions,
    onDropWithTerm: (result: DropResult, termName: string) => void,
    issues: CheckResults | null
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
        box-shadow: inset 0 4px 4px 0 rgba(0,0,0,.14), inset 0 4px 2px -2px rgba(0,0,0,.12);
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
        background-image: linear-gradient(to left,white,rgba(255,255,255,0));
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
`

const ContainerWrapper = styled.div`
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
        background-image: linear-gradient(to right,white,rgba(255,255,255,0));
        z-index: 3;
    }
`

const RootContainer = styled.div`
    margin-left: 56px;
    height: 100%;
    display: flex;
    flex-direction: column;
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
    margin-bottom: 16px;
    min-height: 24px;
`

const ScheduleTerm = ({term, courses, showYear, options, onDropWithTerm, issues}: ScheduleTermProps) => {
    const [scrolled, setScrolled] = useState(false)
    const handleScroll = (e: React.UIEvent<HTMLElement>) => {
        if (e.currentTarget.scrollTop > 0) {
            if (!scrolled) setScrolled(true)
        } else {
            if (scrolled) setScrolled(false)
        }
    }

    return (
        <RootContainer>
            <Year>{showYear ? term.year : ''}</Year>
            <Row>
                <TermName>{term.term.toString().toLowerCase()}</TermName>
                <TermCode>{term.termName}</TermCode>
            </Row>
            <ContainerWrapper>
                <StyledContainer
                    scrolled={scrolled ? 1 : 0}
                    onScroll={handleScroll}>
                    <Container
                        groupName={'terms'}
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
                    <Spacer minWidth={'1px'} minHeight={'32px'}/>
                </StyledContainer>
            </ContainerWrapper>
        </RootContainer>
    )
}

export default ScheduleTerm
