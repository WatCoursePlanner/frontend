import React from 'react'
import {AppContainer} from "react-hot-loader";
import {Container} from "@material-ui/core";
import TranscriptReader from "../components/TranscriptReader";
import {CreateStudentProfileRequest} from "../proto/courses";
import {useDispatch} from "react-redux";
import {fetchStudentProfileAction} from "../redux/slices/studentProfileSlice";

const Welcome = () => {
    const dispatch = useDispatch()
    const importCallback = (request: CreateStudentProfileRequest) => {
        dispatch(fetchStudentProfileAction(request))
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
