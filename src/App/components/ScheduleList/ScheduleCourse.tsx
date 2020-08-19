import React, {useState} from "react";
import {Draggable} from 'react-smooth-dnd';
import {Card, CardProps} from "@rmwc/card";

import '@rmwc/card/styles';
import '@rmwc/ripple/styles';
import styled from "styled-components";
import {CachedCourses} from "../../CachedCourses";


type ScheduleCourseProps = {
    code: string,
    index: number,
    name: string | undefined
}

const RootContainer = styled.div`
    width: 265px; 
    padding: 8px 0;
    background-color: transparent;
`

const StyledCard = styled(Card)<CardProps & React.HTMLProps<HTMLDivElement> & { hovered: number }>`
    width: 100%;
    background-color: ${props => props.hovered ? '#fafafa' : 'white'};
    cursor: pointer;
    margin-left: 16px;
    transition: background-color 0.2s cubic-bezier(.25,.8,.25,1),
                opacity 0.2s cubic-bezier(.25,.8,.25,1),
                box-shadow 0.2s cubic-bezier(.25,.8,.25,1);
    :focus {
      box-shadow: 0 6px 10px 0 rgba(0,0,0,0.14), 
                  0 1px 18px 0 rgba(0,0,0,0.12), 
                  0 3px 5px -1px rgba(0,0,0,0.2);
      border-color: transparent;
      outline: none;
    }
`

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 18px;
`

const CourseCode = styled.span`
    font-size: 18px;
    font-weight: 500
`
const CourseName = styled.span`
    font-size: 14px;
    margin-top: 6px;
`

const ScheduleCourse = ({code, index, name}: ScheduleCourseProps) => {
    const [hovered, setHovered] = useState(false);
    const toggleHover = () => setHovered(!hovered);

    const handleSelectCourse = () => {
        console.log(`TODO clicked ${code}`)
    }

    return (
        <Draggable>
            <RootContainer>
                <StyledCard
                    outlined
                    id={'course-card'}
                    tabIndex={0}
                    hovered={hovered ? 1 : 0}
                    onClick={handleSelectCourse}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSelectCourse()
                        }
                    }}
                    onMouseOver={() => {
                        if (!hovered) setHovered(true)
                    }}
                    onMouseEnter={toggleHover}
                    onMouseLeave={toggleHover}>
                    <CardContainer>
                        <CourseCode>
                            {code}
                        </CourseCode>
                        <CourseName>
                            {name ?? CachedCourses.getByCode(code)?.name}
                        </CourseName>
                    </CardContainer>
                </StyledCard>
            </RootContainer>
        </Draggable>
    )
}

export default ScheduleCourse
