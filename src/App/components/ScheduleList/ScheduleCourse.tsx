import React, {useState} from "react";
import {Draggable} from 'react-smooth-dnd';
import {Card, CardProps} from "@rmwc/card";

import '@rmwc/card/styles';
import '@rmwc/ripple/styles';
import styled from "styled-components";


type ScheduleCourseProps = {
    code: string,
    index: number,
    name: string | undefined
}

const RootContainer = styled.div`
    width: 265px; 
    margin: 0 0 16px 0;
    background-color: transparent;
`

const StyledCard = styled(Card)<CardProps & React.HTMLProps<HTMLDivElement> & {hovered: number}>`
    width: 100%;
    background-color: ${props => props.hovered ? '#fafafa' : 'transparent'};
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
    return (
        <Draggable>
            <RootContainer>
                <StyledCard
                    outlined
                    hovered={hovered ? 1 : 0}
                    onClick={() => console.log(`TODO clicked ${code}`)}
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
                            {name}
                        </CourseName>
                    </CardContainer>
                </StyledCard>
            </RootContainer>
        </Draggable>
    )
}

export default ScheduleCourse
