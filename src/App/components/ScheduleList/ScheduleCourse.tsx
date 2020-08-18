import React, {useState} from "react";
import {Draggable} from 'react-smooth-dnd';
import {Card, CardProps} from "@rmwc/card";

import '@rmwc/card/styles';
import '@rmwc/ripple/styles';
import styled from "styled-components";
import Popper from "@material-ui/core/Popper";
import CourseDetail from "./CourseDetail";
import {CachedCourses} from "../../CachedCourses";
import Fade from "../../animation/Fade";

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

const CardWrapper = styled.div`
    width: 100%;
    cursor: pointer;
    margin-left: 16px;
`

const StyledCard = styled(Card)<CardProps & React.HTMLProps<HTMLDivElement> & { hovered: number, active: number }>`
    width: 100%;
    background-color: ${props => props.hovered ? '#fafafa' : 'white'};
    transition:  background-color 0.2s ease,
                opacity 0.2s ease,
                box-shadow 0.2s ease;
    transition-delay: 50ms;
                
    :focus {
        box-shadow: 0 6px 10px 0 rgba(0,0,0,0.14), 
                    0 1px 18px 0 rgba(0,0,0,0.12), 
                    0 3px 5px -1px rgba(0,0,0,0.2);
        border-color: transparent;
    }
    
    box-shadow: ${props => props.active ? `0 6px 10px 0 rgba(0,0,0,0.14), 
                      0 1px 18px 0 rgba(0,0,0,0.12), 
                      0 3px 5px -1px rgba(0,0,0,0.2)` : ''};
    border-color: ${props => props.active ? `transparent` : 'inherited' };
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
    const [active, setActive] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
    const toggleHover = () => setHovered(!hovered);

    const handleSelectCourse = (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
        setActive(true)
        setAnchorEl(e.currentTarget)
    }

    const handleCloseDetail  = ()  => {
        setActive(false)
        setAnchorEl(null)
    }

    return (
        <Draggable>
            <RootContainer>
                <CardWrapper>
                    <StyledCard
                        outlined
                        className={'unselectable'}
                        id={'course-card'}
                        tabIndex={0}
                        active={active ? 1 : 0}
                        hovered={hovered ? 1 : 0}
                        onClick={handleSelectCourse}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSelectCourse(e)
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
                    <Popper
                        style={{zIndex: 9999}}
                        id={code} open={active} anchorEl={anchorEl}
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
                                <CourseDetail course={CachedCourses.getByCode(code)} onDismiss={handleCloseDetail}/>
                            </Fade>
                        )}
                    </Popper>
                </CardWrapper>
            </RootContainer>
        </Draggable>
    )
}

export default ScheduleCourse
