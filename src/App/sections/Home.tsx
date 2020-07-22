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
import {fetchStudentProfileAction} from "../duck/actions/studentProfile";
import {CoopStream, CreateStudentProfileRequest, SearchCourseRequest} from "../proto/courses";
import {fetchCoursesAction} from "../duck/actions/courses";

const Container = styled.div`
      height: 100%;
      position: relative;
      display: flex;
    `

const AppContainer = styled(DrawerAppContent)`
    margin-top: 64px;
    width: 100%;
    overflow: auto;
`

type HomeProps = ConnectedProps<typeof connector>

const Home = ({isProfileLoading, fetchCourses, fetchStudentProfile}: HomeProps) => {

    const [drawerOpen, setDrawerOpen] = useState(true);
    const [searchText, setSearchText] = useState('');
    const location = useLocation();

    useEffect(() => {
        fetchStudentProfile(CreateStudentProfileRequest.fromJSON({
            degrees: ["Software Engineering"],
            startingYear: 2019,
            coopStream: CoopStream.STREAM_8
        }))
        fetchCourses(SearchCourseRequest.fromJSON({
            pagination: {
                zeroBasedPage: 0,
                limit: 5000
            }
        }))
    }, [])

    const searchKeyword = () => {
        console.log(`[Home] TODO Implement search ${searchText}`)
    }

    return (
        <Container>
            <TopNav
                searchCallback={searchKeyword}
                toggleDrawer={() => setDrawerOpen(!drawerOpen)}
                searchText={searchText}
                setSearchText={setSearchText}/>
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
    isProfileLoading: state.studentProfile.loading,
})

const mapDispatch = (dispatch: Dispatch) => bindActionCreators({
    fetchStudentProfile: fetchStudentProfileAction,
    fetchCourses: fetchCoursesAction,
}, dispatch)

const connector = connect(mapState, mapDispatch)

export default connector(Home)
