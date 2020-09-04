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
import {CoopStream, CreateStudentProfileRequest} from "../proto/courses";
import {CachedCourses} from "../utils";
import {fetchStudentProfile} from "../redux/slices/studentProfile";
import {RootState} from "../redux/store";
import {Else, If, Then} from "react-if";
import search from "../redux/slices/search";
import profileCourses, {fetchProfileCourseAction} from "../redux/slices/profileCourses";

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

const Home = ({studentProfile, fetchProfileCourseAction, profileCourses, fetchStudentProfile, drawerShadow, setSearchQuery}: HomeProps) => {

    const [drawerOpen, setDrawerOpen] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        CachedCourses.initialize().then((res) => {
            if (!res) return
            setLoading(false);
        })

        if (studentProfile === null) {
            fetchStudentProfile(CreateStudentProfileRequest.fromJSON({
                degrees: ["Software Engineering"],
                startingYear: 2019,
                coopStream: CoopStream.STREAM_8
            }))
        } else if (Object.keys(profileCourses.courses).length === 0) {
            fetchProfileCourseAction(studentProfile)
        }
    }, [])

    const searchKeyword = () => {
        setSearchQuery(searchText)
    }

    const onAutoCompleteSelect = async (code: string) => {
        console.log(`[Home] TODO Select ${code}`)
    }

    return (
        <If condition={loading}>
            <Then>
                <p>TODO Implement Loading</p>
            </Then>
            <Else>
                <Container>
                    <TopNav
                        searchCallback={searchKeyword}
                        onAutoCompleteSelect={onAutoCompleteSelect}
                        toggleDrawer={() => setDrawerOpen(!drawerOpen)}
                        searchText={searchText}
                        setSearchText={setSearchText}
                        issues={profileCourses.issues}/>
                    <Drawer shadow={drawerShadow} open={drawerOpen} location={location}/>
                    <AppContainer>
                        <Switch>
                            <Route path="/home/schedule" exact>
                                <Schedule/>
                            </Route>
                            <Route path="/home/discover" exact>
                                <Discover/>
                            </Route>
                            <Route path="/home" exact>
                                <Redirect to="/home/schedule"/>
                            </Route>
                        </Switch>
                    </AppContainer>
                </Container>
            </Else>
        </If>
    );
}

const mapState = (state: RootState) => ({
    drawerShadow: state.ui.drawerShadow,
    studentProfile: state.studentProfile.content,
    profileCourses: state.profileCourses
})

const mapDispatch = (dispatch: Dispatch) => bindActionCreators({
    fetchStudentProfile: fetchStudentProfile,
    setSearchQuery: search.actions.setSearchQuery,
    fetchProfileCourseAction: fetchProfileCourseAction
}, dispatch)

const connector = connect(mapState, mapDispatch)

export default connector(Home)
