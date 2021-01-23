import { Container } from "@material-ui/core";
import TranscriptReader from "@watcourses/components/TranscriptReader";
import { CreateStudentProfileRequest } from "@watcourses/proto/courses";
import { fetchStudentProfileAction } from "@watcourses/redux/slices/studentProfileSlice";
import React from 'react'
import { AppContainer } from "react-hot-loader";
import { useDispatch } from "react-redux";

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
