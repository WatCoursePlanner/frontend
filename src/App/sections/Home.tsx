import { DrawerAppContent } from '@rmwc/drawer';
import React, { useEffect, useState } from "react";
import { Else, If, Then } from "react-if";
import { connect, ConnectedProps } from "react-redux";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import styled from "styled-components";

import Drawer from "../components/Drawer";
import TopNav from "../components/TopNav";
import { CoopStream, CreateStudentProfileRequest } from "../proto/courses";
import { fetchProfileCourseAction } from "../redux/slices/profileCourses";
import search from "../redux/slices/search";
import { fetchStudentProfileAction } from "../redux/slices/studentProfileSlice";
import { RootState } from "../redux/store";
import { CachedCourses } from "../utils";

import Discover from "./Discover";
import Schedule from "./Schedule";

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

const HomeBase = ({
                  studentProfile,
                  fetchProfileCourse,
                  profileCourses,
                  fetchStudentProfile,
                  drawerShadow,
                  setSearchQuery
              }: HomeProps) => {

    const [drawerOpen, setDrawerOpen] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        CachedCourses.initialize().then((res) => {
            if (!res) { return }
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

    const onAutoCompleteSelect = (code: string) => {
        console.error(`[Home] TODO Select ${code}`)
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
    fetchStudentProfile: fetchStudentProfileAction,
    setSearchQuery: search.actions.setSearchQuery,
    fetchProfileCourse: fetchProfileCourseAction
}, dispatch)

const connector = connect(mapState, mapDispatch)

export const Home = connector(HomeBase)
