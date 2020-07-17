import React, {useState} from 'react'
import {Button, ButtonHTMLProps, ButtonProps} from "@rmwc/button";
import styled from "styled-components";
import '@rmwc/button/styles';
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../duck/types";
import {bindActionCreators, Dispatch} from "redux";
import {DragDropContext} from "react-beautiful-dnd";
import {ScheduleTerm} from "../components/ScheduleList";
import {Container} from "react-smooth-dnd";

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
    min-width: ${props => props.open ? '320px' : 0};
    transition: 0.3s;
    border-left: 1px solid #e0e0e0;
`

type ScheduleProps = ConnectedProps<typeof connector>

const Schedule = ({studentProfile, loading, courses}: ScheduleProps) => {

    const [shortlistOpen, setShortlistOpen] = useState(false)

    const onDragEnd = (result: any) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        // const items = reorder(
        //     this.state.items,
        //     result.source.index,
        //     result.destination.index
        // );
        //
        // this.setState({
        //     items
        // });
    }

    return (
        <OuterContainer>
            <DragDropContext onDragEnd={onDragEnd}>
                <ScheduleContainer>
                    <ScheduleListContainer>
                        <Container orientation={"horizontal"} style={{height: '100%'}}>
                            {
                                (studentProfile && studentProfile.schedule)
                                    ? studentProfile.schedule.terms
                                        .map((term, index) => (
                                            <ScheduleTerm
                                                key={term.termName}
                                                term={term}
                                                index={index}
                                                courses={courses}
                                            />
                                        )) : <div/>
                            }
                            <div style={{minWidth: 60, height: '100%'}}/>
                        </Container>
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
                </ShortListContainer>
            </DragDropContext>
        </OuterContainer>
    )
}
const mapState = (state: RootState) => ({
    studentProfile: state.studentProfile.content,
    courses: state.courses.content,
    loading: state.studentProfile.loading
})

const mapDispatch = (dispatch: Dispatch) => bindActionCreators({
    // fetchStudentProfile: fetchStudentProfileAction,
}, dispatch)

const connector = connect(mapState, mapDispatch)

export default connector(Schedule)
