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
    max-height: 60px;
    transition: max-height ease-in-out .25s !important;
    -webkit-transition: max-height ease-in-out .25s !important;
    :hover {
      max-height: 500px;
    }
    :hover .CardContainer .CourseName {
      opacity: 1;
    }
    
`

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 18px;
    :hover {opacity: 0}
`

const CourseCode = styled.span`
    font-size: 18px;
    font-weight: 500
`
const CourseName = styled.span`
    font-size: 14px;
    margin-top: 6px;
    opacity: 0;
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
