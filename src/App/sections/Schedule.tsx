import React, {useState} from 'react'
import {Button, ButtonHTMLProps, ButtonProps} from "@rmwc/button";
import {Fab, FabProps} from "@rmwc/fab";
import styled from "styled-components";
import '@rmwc/button/styles';
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../redux/store";
import {bindActionCreators, Dispatch} from "redux";
import {ScheduleShortList, TermList} from "../components/ScheduleList";

import '@rmwc/fab/styles';
import '@rmwc/tooltip/styles';
import Spacer from "../components/Spacer";
import {DragEndParams, DragStartParams} from "smooth-dnd/dist/src/exportTypes";
import {DropResult} from "react-smooth-dnd";
import {URL_BASE} from "../constants/api";
import {CheckResults, FindSlotRequest} from "../proto/courses";
import studentProfile from "../redux/slices/studentProfile";
import {fetchProfileCourseAction} from "../redux/slices/profileCourses";

const ShortListButton = styled(Button)<ButtonProps & ButtonHTMLProps>`
  position:absolute;
  top: 50%;
  right: 0;
  margin-top: -28px;
  height: 54px !important;
  width: 54px !important;
  margin-left: auto !important;
  padding-left: 24px !important;
  border-radius: 100px 0 0 100px !important;
  background-color: #e3f2fd !important;
  color: #2196F3 !important;
  & div {
    border-radius: 100px 0 0 100px !important;
  }
  & i {
    width: 24px !important;
    height: 24px !important;
    font-size: 24px !important;
    padding: 0 !important;
    margin: 0 !important;
  }
`

const OuterContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
    flex-direction: row;
`

const ScheduleContainer = styled.div`
    display: flex;
    flex-grow: 1;
    align-items: center;
    overflow-x: auto;
    position: relative;
    width: auto;
`

const ScheduleListContainer = styled.div`
    display: flex;
    height: 100%;
    overflow-y: hidden;
    overflow-x: auto;
    flex-direction: row;
    align-items: start;
`

const ShortListContainer = styled.div<{ open: boolean }>`
    display: flex;
    min-width: ${props => props.open ? '360px' : 0};
    max-width: ${props => props.open ? '360px' : 0};
    transition: 0.3s;
    border-left: 1px solid #e0e0e0;
`

const StyledFab = styled(Fab)<FabProps>`
    letter-spacing: normal !important;
    text-transform: initial;
    position: absolute !important;
    bottom: 9vh !important;
    right: 6vw !important;
`

type ScheduleProps = ConnectedProps<typeof connector>

const Schedule = ({studentProfile, loading, checkCourses, profileCourses, addCourseToList, removeCourseFromList, addShortList, removeShortList}: ScheduleProps) => {
    const [shortlistOpen, setShortlistOpen] = useState(false)
    const [issues, setIssues] = useState<{ [termName: string]: CheckResults }>({})
    const [firstDrop, setFirstDrop] = useState(false)

    const onDragEnd = (result: DragEndParams) => {
        setFirstDrop(false)
    }

    const onDropWithTerm = (dropResult: DropResult, termName: string) => {
        // TODO: check before applying the changes
        if (dropResult.removedIndex === dropResult.addedIndex) return
        if (dropResult.removedIndex !== null) {
            if (termName === "shortlist") removeShortList(dropResult.payload)
            else removeCourseFromList({termName, index: dropResult.removedIndex})
        }
        if (dropResult.addedIndex !== null) {
            if (termName === "shortlist") addShortList({code: dropResult.payload, index: dropResult.addedIndex})
            else addCourseToList({termName, index: dropResult.addedIndex, code: dropResult.payload})
        }
        // Don't update if both are not null, i.e. move to the same column
        if (dropResult.removedIndex === null || dropResult.addedIndex === null) {
            // Update on the second drop callback (i.e. when firstDrop === true)
            if (!firstDrop) {
                setFirstDrop(true)
            } else {
                checkCourses(null)
                setFirstDrop(false)
            }
        }
    }

    const onDragStart = (dragStart: DragStartParams) => {
        if (!dragStart.isSource) return // only need to do this once

        fetch(URL_BASE + '/profile/find_slots', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(FindSlotRequest.toJSON({profile: studentProfile!!, courseCode: dragStart.payload!!}))
        })
            .then(res => res.json())
            .then(res => {
                setIssues(res.slot)
            })
            .catch(error => {
                throw(error)
            });
    }

    return (
        <OuterContainer>
            <ScheduleContainer>
                <ScheduleListContainer>
                    <Spacer minWidth={'16px'} minHeight={'100%'}/>
                    <TermList
                        profileCourses={profileCourses}
                        studentProfile={studentProfile}
                        issues={issues}
                        options={{onDragEnd, onDragStart}}
                        onDropWithTerm={onDropWithTerm}/>
                    <Spacer minWidth={'240px'} minHeight={'100%'}/>
                    <StyledFab icon="add" label="Add Term"/>
                </ScheduleListContainer>
                <ShortListButton
                    unelevated
                    onMouseDown={(e) => {
                        e.preventDefault()
                    }}
                    onClick={() => setShortlistOpen(!shortlistOpen)}
                    icon={shortlistOpen ? "keyboard_arrow_right" : "shopping_cart"}/>
            </ScheduleContainer>
            <ShortListContainer open={shortlistOpen}>
                <ScheduleShortList shortlist={studentProfile?.shortList ?? []}
                                   courses={profileCourses}
                                   options={{onDragEnd, onDragStart}}
                                   onDropWithTerm={onDropWithTerm}/>
            </ShortListContainer>
        </OuterContainer>
    )
}

const mapState = (state: RootState) => ({
    studentProfile: state.studentProfile.content,
    profileCourses: state.profileCourses.courses,
    loading: state.studentProfile.loading
})

const mapDispatch = (dispatch: Dispatch) => bindActionCreators({
    addCourseToList: studentProfile.actions.addCourse,
    removeCourseFromList: studentProfile.actions.removeCourse,
    addShortList: studentProfile.actions.addShortlist,
    removeShortList: studentProfile.actions.removeShortlist,
    checkCourses: fetchProfileCourseAction
}, dispatch)

const connector = connect(mapState, mapDispatch)

export default connector(Schedule)
