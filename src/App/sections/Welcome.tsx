import React from 'react'
import {AppContainer} from "react-hot-loader";
import {Container} from "@material-ui/core";
import TranscriptReader from "../components/TranscriptReader";
import {CreateStudentProfileRequest} from "../proto/courses";
import {useDispatch} from "react-redux";
import {fetchStudentProfile} from "../duck/slices/studentProfile";

const Welcome = () => {
    const dispatch = useDispatch()
    const importCallback = (request: CreateStudentProfileRequest) => {
        dispatch(fetchStudentProfile(request))
    }
    return (
        <Container>
            <AppContainer>
                <TranscriptReader onSuccessCallback={importCallback}/>
            </AppContainer>
        </Container>
    );
};

export default Welcome
