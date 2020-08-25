import React, {useRef, useState} from "react";
import {Draggable} from 'react-smooth-dnd';
import {Card, CardProps} from "@rmwc/card";

import '@rmwc/card/styles';
import '@rmwc/ripple/styles';
import styled from "styled-components";
import Popper from "@material-ui/core/Popper";
import CourseDetail from "./CourseDetail";
import {Fade} from "@material-ui/core";
import {PopperProps} from "@material-ui/core/Popper/Popper";
import {CourseInfo} from "../../proto/courses";

type ScheduleCourseProps = {
    course: CourseInfo | null
}

const RootContainer = styled.div`
    width: 265px; 
    padding: 8px 0;
    background-color: transparent;
`

const CardWrapper = styled.div`
    width: 100%;
    cursor: pointer;
    margin-left: 16px;
`

const StyledCard = styled(Card)<CardProps & React.HTMLProps<HTMLDivElement> & { hovered: number, active: number, ref: any }>`
    width: 100%;
    background-color: ${props => props.hovered ? '#fafafa' : 'white'};
    transition:  background-color 0.2s ease,
                opacity 0.2s ease,
                box-shadow 0.2s ease;
    transition-delay: 0s;    
    :hover {
      transition-delay: 150ms
    }        
    :focus {
        box-shadow: 0 6px 10px 0 rgba(0,0,0,0.14), 
                    0 1px 18px 0 rgba(0,0,0,0.12), 
                    0 3px 5px -1px rgba(0,0,0,0.2);
        border-color: transparent;
    }
    
    box-shadow: ${props => props.active ? `0 6px 10px 0 rgba(0,0,0,0.14), 
                      0 1px 18px 0 rgba(0,0,0,0.12), 
                      0 3px 5px -1px rgba(0,0,0,0.2)` : ''};
    border-color: ${props => props.active ? `transparent` : 'inherited'};
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

const StyledPopper = styled(Popper)<PopperProps>`
    z-index: 9999;
    margin-bottom: 50px;
    max-height: 80vh;
`

const ScheduleCourse = ({course}: ScheduleCourseProps) => {
    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(false);
    const toggleHover = () => setHovered(!hovered);
    const cardRef = useRef();

    const handleSelectCourse = () => {
        setActive(true)
    }

    const handleCloseDetail = () => {
        setActive(false)
    }

    const toggleActive = () => {
        setActive(!active)
    }

    return (
        <Draggable>
            <RootContainer>
                <CardWrapper>
                    <StyledCard
                        outlined
                        ref={cardRef}
                        className={'unselectable'}
                        id={'course-card'}
                        tabIndex={0}
                        active={active ? 1 : 0}
                        hovered={hovered ? 1 : 0}
                        onClick={handleSelectCourse}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                toggleActive()
                            }
                        }}
                        onMouseOver={() => {
                            if (!hovered) setHovered(true)
                        }}
                        onMouseEnter={toggleHover}
                        onMouseLeave={toggleHover}>
                        <CardContainer>
                            <CourseCode>
                                {course?.code ?? ''}
                            </CourseCode>
                            <CourseName>
                                {course?.name ?? ''}
                            </CourseName>
                        </CardContainer>
                    </StyledCard>
                    <StyledPopper
                        id={course?.code} open={active} anchorEl={cardRef.current}
                        transition
                        placement="left-start"
                        modifiers={{
                            flip: {
                                enabled: true,
                            },
                            preventOverflow: {
                                enabled: true,
                                boundariesElement: 'viewport',
                            },
                            offset: {
                                enabled: true,
                                offset: '0, 8'
                            }
                        }}>
                        {({TransitionProps}) => (
                            <Fade {...TransitionProps}>
                                <div style={{maxHeight: '80vh'}}>
                                    <CourseDetail course={course} onDismiss={handleCloseDetail}/>
                                </div>
                            </Fade>
                        )}
                    </StyledPopper>
                </CardWrapper>
            </RootContainer>
        </Draggable>
    )
}

export default ScheduleCourse
