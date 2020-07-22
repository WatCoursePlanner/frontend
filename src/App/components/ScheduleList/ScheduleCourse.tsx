import React from "react";
import {Draggable} from 'react-smooth-dnd';
import {Card, CardPrimaryAction, CardProps} from "@rmwc/card";

import '@rmwc/card/styles';
import styled from "styled-components";


type ScheduleCourseProps = {
    code: string,
    index: number,
    name: string | undefined
}

const RootContainer = styled.div`
    margin: 0 0 16px 0;
`

const StyledCard = styled(Card)<CardProps | React.HTMLProps<HTMLDivElement>>`
    width: 265px; 
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
    return (
        <Draggable>
            <RootContainer>
                <StyledCard outlined>
                    <CardPrimaryAction>
                        <CardContainer>
                            <CourseCode>
                                {code}
                            </CourseCode>
                            <CourseName>
                                {name}
                            </CourseName>
                        </CardContainer>
                    </CardPrimaryAction>
                </StyledCard>
            </RootContainer>
        </Draggable>
    )
}

export default ScheduleCourse
