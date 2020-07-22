import React, {useState} from 'react'
import {Button, ButtonHTMLProps, ButtonProps} from "@rmwc/button";
import {Fab, FabProps} from "@rmwc/fab";
import styled from "styled-components";
import '@rmwc/button/styles';
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../duck/types";
import {bindActionCreators, Dispatch} from "redux";
import {DragDropContext} from "react-beautiful-dnd";
import {ScheduleShortList, ScheduleTerm} from "../components/ScheduleList";

import '@rmwc/fab/styles';
import Spacer from "../components/Spacer";

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

const Schedule = ({studentProfile, loading, profileCourses}: ScheduleProps) => {

    const [shortlistOpen, setShortlistOpen] = useState(false)

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }
        // TODO Re-order courses
        // see https://github.com/kutlugsahin/react-smooth-dnd#ondragend
    }

    const TermList = () => {
        let shownYears: number[] = []
        return (studentProfile && studentProfile.schedule)
            ? <>{studentProfile.schedule.terms
                    .map((term, index) => {
                        const showYear = !shownYears.includes(term.year)
                        if (showYear)
                            shownYears.push(term.year)
                        return (<ScheduleTerm
                            key={term.termName}
                            term={term}
                            index={index}
                            courses={profileCourses}
                            showYear={showYear}/>)})} </>
            : <div/>
    }

    return (
        <OuterContainer>
            <DragDropContext onDragEnd={onDragEnd}>
                <ScheduleContainer>
                    <ScheduleListContainer>
                        <Spacer minWidth={'16px'} minHeight={'100%'}/>
                        <TermList/>
                        <Spacer minWidth={'240px'} minHeight={'100%'}/>
                        <StyledFab icon="add" label="Add Term" />
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
                    <ScheduleShortList shortlist={['STAT 230', 'STAT 231', 'EMLS 129R']} courses={profileCourses}/>
                </ShortListContainer>
            </DragDropContext>
        </OuterContainer>
    )
}

const mapState = (state: RootState) => ({
    studentProfile: state.studentProfile.content,
    profileCourses: state.profileCourses.content,
    loading: state.studentProfile.loading
})

const mapDispatch = (dispatch: Dispatch) => bindActionCreators({}, dispatch)

const connector = connect(mapState, mapDispatch)

export default connector(Schedule)
