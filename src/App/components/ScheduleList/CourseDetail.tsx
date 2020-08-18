import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import {Card, CardActionIcon, CardActionIcons, CardActions, CardProps} from "@rmwc/card";

import '@rmwc/card/styles';
import {CourseInfo} from "../../proto/courses";
import {List, ListItem, ListItemGraphic, ListItemGraphicProps, SimpleListItemProps} from "@rmwc/list";

function useDetectClickOutside(ref: React.MutableRefObject<any>, callback: () => void) {
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback()
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

type CourseDetailProps = {
    course: CourseInfo | null,
    onDismiss: () => void
}

const StyledCard = styled(Card)<CardProps & React.HTMLProps<HTMLDivElement>>`
    min-width: 300px;
    background-color: white;
    outline: none;
    border-radius: 8px;
    max-width: 448px;
    width: 448px;
    box-shadow: 0 24px 38px 3px rgba(0,0,0,0.14),
                0 9px 46px 8px rgba(0,0,0,0.12), 
                0 11px 15px -7px rgba(0,0,0,0.2);
`

const CourseCode = styled.span`
    font-size: 22px;
    font-weight: 500
`
const CourseName = styled.span`
    font-size: 14px;
    margin-top: 6px;
`

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 18px 12px;
`

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 56px;
    margin-bottom: 18px;
`

const StyledListItemGraphic = styled(ListItemGraphic)<ListItemGraphicProps & React.HTMLProps<HTMLDivElement>>`
    margin-right: 16px;
`

const ListContentText = styled.span`
    font-size: 14px;
    white-space: pre-wrap;
    line-height: 18px;
`

const StyledListItem = styled(ListItem)<SimpleListItemProps>`
    height: auto;
    align-items: start;
`

export default function CourseDetail({course, onDismiss}: CourseDetailProps) {
    const wrapperRef = useRef(null);
    useDetectClickOutside(wrapperRef, onDismiss);

    return (
        <StyledCard ref={wrapperRef}>
            <CardActions>
                <CardActionIcons>
                    <CardActionIcon icon="open_in_new"/>
                    <CardActionIcon icon="forward"/>
                    <CardActionIcon icon="delete_outline"/>
                </CardActionIcons>
                <CardActionIcons style={{flexGrow: 0, marginLeft: 8}}>
                    <CardActionIcon onClick={() => onDismiss()} icon="close"/>
                </CardActionIcons>
            </CardActions>
            <CardContainer>
                <TitleContainer>
                    <CourseCode>
                        {course?.code ?? ''}
                    </CourseCode>
                    <CourseName>
                        {course?.name ?? ''}
                    </CourseName>
                </TitleContainer>
                <List nonInteractive={true}>
                    <StyledListItem ripple={false}>
                        <StyledListItemGraphic
                            className={'unselectable'} icon="notes"/>
                        <ListContentText>
                            {course?.description ?? ''}
                        </ListContentText>
                    </StyledListItem>
                </List>
            </CardContainer>
        </StyledCard>
    );
}
