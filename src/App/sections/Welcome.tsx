import React from 'react'
import {AppContainer} from "react-hot-loader";
import {Container} from "@material-ui/core";
import TranscriptReader from "../components/TranscriptReader";
import {CreateStudentProfileRequest} from "../proto/courses";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../duck/types";
import {bindActionCreators, Dispatch} from "redux";
import {fetchStudentProfileAction} from "../duck/actions/studentProfile";


type WelcomeProps = ConnectedProps<typeof connector>

const Welcome = ({fetchStudentProfile}: WelcomeProps) => {
    const importCallback = (request: CreateStudentProfileRequest) => {
        fetchStudentProfile(request)
    }
    return (
        <Container>
            <AppContainer>
                <TranscriptReader onSuccessCallback={importCallback}/>
            </AppContainer>
        </Container>
    );
};

const mapState = (state: RootState) => ({
})

const mapDispatch = (dispatch: Dispatch) => bindActionCreators({
    fetchStudentProfile: fetchStudentProfileAction
}, dispatch)

const connector = connect(mapState, mapDispatch)

export default connector(Welcome)
