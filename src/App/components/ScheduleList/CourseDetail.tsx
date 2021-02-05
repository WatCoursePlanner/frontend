import { Card, CardActionIcon, CardActionIcons, CardActions, CardProps } from "@rmwc/card";
import '@rmwc/card/styles';
import { List, ListItem, ListItemGraphic, ListItemGraphicProps, SimpleListItemProps } from "@rmwc/list";
import { Tooltip } from "@rmwc/tooltip";
import '@rmwc/tooltip/styles';
import {
    IRequisite,
    IRequisiteGroup,
    RequisiteChecklist,
    RequisiteGroupChecklist
} from "@watcourses/components/Requisite";
import { cleanScrollBarWithWhiteBorder } from "@watcourses/constants/styles";
import { useDetectClickOutside } from "@watcourses/hooks";
import { CourseInfo } from "@watcourses/proto/courses";
import { RequisiteHelper } from "@watcourses/utils/RequisiteHelper";
import React, { useRef, useState } from "react";
import { If, Then } from 'react-if'
import styled from "styled-components";

type CourseDetailProps = {
    course: CourseInfo | null,
    onDismiss: () => void
}

const StyledCard = styled(Card)<CardProps & React.HTMLProps<HTMLDivElement>>`
  position: relative;
  max-height: 80vh;
  min-width: 300px;
  background-color: white;
  outline: none;
  border-radius: 8px;
  max-width: 448px;
  width: 448px;
  box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14),
  0 9px 46px 8px rgba(0, 0, 0, 0.12),
  0 11px 15px -7px rgba(0, 0, 0, 0.2);
`

const CourseCode = styled.span`
  font-size: 22px;
  font-weight: 500
`
const CourseName = styled.span`
  font-size: 14px;
  line-height: 20px;
  margin-top: 6px;
`

const CardContainer = styled.div<{ scrolled: number }>`
  display: flex;
  flex-direction: column;
  padding: 18px 12px;
  overflow-y: auto;
  ${cleanScrollBarWithWhiteBorder};

  &:before {
    content: "";
    position: absolute;
    top: 52px;
    left: 0;
    right: 0;
    height: 8px;
    z-index: 5;
    background-color: transparent;
    box-shadow: inset 0 2px 2px 0 rgba(0, 0, 0, .12);
    transition: opacity .2s;
    opacity: ${props => props.scrolled ? 1 : 0};
  }
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 56px;
  margin-bottom: -8px;
`

const StyledListItemGraphic = styled(ListItemGraphic)<ListItemGraphicProps & React.HTMLProps<HTMLDivElement>>`
  color: rgba(0, 0, 0, .54);
  margin-right: 16px;
`

const ListContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`

const ListContentTitle = styled.span`
  font-size: 14px;
  white-space: pre-wrap;
  line-height: 18px;
`

const ListContentSubtitle = styled(ListContentTitle)`
  margin: 4px 0;
  font-size: 12px;
  opacity: .8;
`

const StyledListItem = styled(ListItem)<SimpleListItemProps>`
  height: auto;
  align-items: start;
  margin-top: 32px;
`

const CourseDetail = ({course, onDismiss}: CourseDetailProps) => {
    const prerequisites = RequisiteHelper.getPreRequisite(course);
    const antirequisites = RequisiteHelper.getAntiRequisite(course);

    const [scrolled, setScrolled] = useState(false)
    const handleScroll = (e: React.UIEvent<HTMLElement>) => {
        if (e.currentTarget.scrollTop > 0) {
            if (!scrolled) {
                setScrolled(true)
            }
        } else {
            if (scrolled) {
                setScrolled(false)
            }
        }
    }

    const wrapperRef = useRef(null);
    useDetectClickOutside(wrapperRef, onDismiss);

    return (
        <StyledCard ref={wrapperRef}>
            <CardActions>
                <CardActionIcons>
                    <Tooltip content="Open">
                        <CardActionIcon icon="open_in_new"/>
                    </Tooltip>
                    <Tooltip content="Move">
                        <CardActionIcon icon="forward"/>
                    </Tooltip>
                    <Tooltip content="Delete">
                        <CardActionIcon icon="delete_outline"/>
                    </Tooltip>
                </CardActionIcons>
                <CardActionIcons style={{flexGrow: 0, marginLeft: 8}}>
                    <Tooltip content="Close">
                        <CardActionIcon onClick={() => onDismiss()} icon="close"/>
                    </Tooltip>
                </CardActionIcons>
            </CardActions>
            <CardContainer scrolled={scrolled ? 1 : 0} onScroll={handleScroll}>
                <List nonInteractive>
                    <TitleContainer>
                        <CourseCode>
                            {course?.code ?? ''}
                        </CourseCode>
                        <CourseName>
                            {course?.name ?? ''}
                        </CourseName>
                    </TitleContainer>
                    <StyledListItem ripple={false}>
                        <StyledListItemGraphic
                            className={'unselectable'} icon="notes"/>
                        <ListContentTitle>
                            {course?.description ?? ''}
                        </ListContentTitle>
                    </StyledListItem>
                    <If condition={prerequisites.length > 0}><Then>
                        <StyledListItem ripple={false}>
                            <StyledListItemGraphic
                                className={'unselectable'} icon="check_circle_outline"/>
                            <ListContent>
                                <ListContentTitle>
                                    {prerequisites.length} Prerequisites
                                </ListContentTitle>
                                <ListContentSubtitle>
                                    {`${prerequisites.filter((t: IRequisiteGroup) => t.met).length} met, ${prerequisites.length - prerequisites.filter((t: IRequisiteGroup) => t.met).length} not met`}
                                </ListContentSubtitle>
                                <RequisiteGroupChecklist requisiteGroups={prerequisites}/>
                            </ListContent>
                        </StyledListItem>
                    </Then></If>
                    <If condition={antirequisites.length > 0}><Then>
                        <StyledListItem ripple={false}>
                            <StyledListItemGraphic
                                className={'unselectable'} icon="block"/>
                            <ListContent>
                                <ListContentTitle>
                                    {antirequisites.length} Antirequisites
                                </ListContentTitle>
                                <ListContentSubtitle>
                                    {`has ${
                                        antirequisites.filter((t: IRequisite) => !t.met).length === 0
                                            ? 'none'
                                            : antirequisites.filter((t: IRequisite) => !t.met).length
                                    }`}
                                </ListContentSubtitle>
                                <RequisiteChecklist requisites={antirequisites}/>
                            </ListContent>
                        </StyledListItem>
                    </Then></If>
                </List>
            </CardContainer>
        </StyledCard>
    );
}

export default CourseDetail
