import React from 'react'
import CourseTable from "../components/CourseTable";
import TopNav from "../components/TopNav";
import Drawer from "../components/Drawer";
import {Redirect, Route, Switch} from "react-router-dom";
import Schedule from "./Schedule";
import {AppContainer} from "react-hot-loader";
import {Container} from "@material-ui/core";
import TranscriptReader from "../components/TranscriptReader";


const Welcome = () => {
    return (
        <Container>
            <AppContainer>
                <TranscriptReader/>
            </AppContainer>
        </Container>
    );
};

export default Welcome
