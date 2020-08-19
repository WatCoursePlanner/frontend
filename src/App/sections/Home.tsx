import React, {useEffect, useState} from "react";
import {Redirect, Route, Switch, useLocation} from "react-router-dom";
import {DrawerAppContent} from '@rmwc/drawer';
import Schedule from "./Schedule";
import Discover from "./Discover";
import styled from "styled-components";
import Drawer from "../components/Drawer";
import TopNav from "../components/TopNav";
import {connect, ConnectedProps} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
import {RootState} from "../duck/types";
import {CheckResults, CoopStream, CreateStudentProfileRequest, StudentProfile} from "../proto/courses";
import {URL_BASE} from "../constants/api";
import {fetchStudentProfileAction} from "../duck/actions/studentProfile";
import {CachedCourses} from "../CachedCourses";

const Container = styled.div`
      height: 100%;
      position: relative;
      display: flex;
    `

const AppContainer = styled(DrawerAppContent)`
    margin-top: 64px;
    width: 100%;
    overflow-y: hidden;
`

type HomeProps = ConnectedProps<typeof connector>

const Home = ({studentProfile, fetchStudentProfile}: HomeProps) => {

    const [drawerOpen, setDrawerOpen] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);
    const [issues, setIssues] = useState<CheckResults>({issues: []});
    const location = useLocation();

    CachedCourses.initialize().then((res) => {
        if (!res) return
        setLoading(false);
    })

    useEffect(() => {
        fetchStudentProfile(CreateStudentProfileRequest.fromJSON({
            degrees: ["Software Engineering"],
            startingYear: 2019,
            coopStream: CoopStream.STREAM_8
        }))
    }, [])

    useEffect(() => {
        if (!studentProfile) return

        fetch(URL_BASE + '/profile/check', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(StudentProfile.toJSON(studentProfile!!))
        })
            .then(res => res.json())
            .then(res => {
                setIssues(res)
            })
            .catch(error => {
                throw(error)
            });
    }, [studentProfile])

    const searchKeyword = () => {
        console.log(`[Home] TODO Implement search ${searchText}`)
    }

    const onAutoCompleteSelect = async (code: string) => {
        console.log(`[Home] TODO Select ${code}`)
    }

    if (loading) return <p>Loading</p>;

    return (
        <Container>
            <TopNav
                searchCallback={searchKeyword}
                onAutoCompleteSelect={onAutoCompleteSelect}
                toggleDrawer={() => setDrawerOpen(!drawerOpen)}
                searchText={searchText}
                setSearchText={setSearchText}
                issues={issues}/>
            <Drawer open={drawerOpen} location={location}/>
            <AppContainer>
                <Switch>
                    <Route path="/home/schedule">
                        <Schedule/>
                    </Route>
                    <Route path="/home/discover">
                        <Discover/>
                    </Route>
                    <Route path="/home" exact>
                        <Redirect to="/home/schedule"/>
                    </Route>
                </Switch>
            </AppContainer>
        </Container>
    );
}

const mapState = (state: RootState) => ({
    studentProfile: state.studentProfile.content
})

const mapDispatch = (dispatch: Dispatch) => bindActionCreators({
    fetchStudentProfile: fetchStudentProfileAction
}, dispatch)

const connector = connect(mapState, mapDispatch)

export default connector(Home)
