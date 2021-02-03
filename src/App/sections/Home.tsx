import { DrawerAppContent } from '@rmwc/drawer';
import Drawer from "@watcourses/components/Drawer";
import TopNav from "@watcourses/components/TopNav";
import { CoopStream, CreateStudentProfileRequest } from "@watcourses/proto/courses";
import { fetchProfileCourseAction } from "@watcourses/redux/slices/profileCourses";
import search from "@watcourses/redux/slices/search";
import { fetchStudentProfileAction } from "@watcourses/redux/slices/studentProfileSlice";
import { RootState } from "@watcourses/redux/store";
import { CachedCoursesStore } from "@watcourses/utils";
import { action, computed, extendObservable, observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { Else, If, Then } from "react-if";
import { connect, ConnectedProps } from "react-redux";
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import styled from "styled-components";

import Discover from "./Discover";
import Schedule from "./Schedule";

const Container = styled.div`
  height: 100%;
  position: relative;
  display: flex;
`;

const AppContainer = styled(DrawerAppContent)`
  margin-top: 64px;
  width: 100%;
  overflow-y: hidden;
`;

type HomeProps = ConnectedProps<typeof connector> & RouteComponentProps

@observer
class HomeBase extends React.Component<HomeProps> {

  @observable
  drawerOpen: boolean = true;

  @observable
  searchText: string = '';

  @computed
  private get isLoading() {
    return CachedCoursesStore.get().isLoading;
  }

  @action
  setSearchText(text?: string) {
    this.searchText = text ?? '';
  }

  @action
  setDrawerOpen(open: boolean) {
    this.drawerOpen = open;
  }

  constructor(props: HomeProps) {
    super(props);

    const {
      studentProfile,
      profileCourses,
      fetchProfileCourse,
      fetchStudentProfile,
    } = props;

    if (studentProfile === null) {
      fetchStudentProfile(CreateStudentProfileRequest.fromJSON({
        degrees: ["Software Engineering"],
        startingYear: 2019,
        coopStream: CoopStream.STREAM_8
      }))
    } else if (Object.keys(profileCourses.courses).length === 0) {
      fetchProfileCourse(studentProfile)
    }

    extendObservable(this, {
      drawerOpen: false
    })
  }

  render() {
    const {
      profileCourses,
      drawerShadow,
      setSearchQuery,
      location
    } = this.props;

    const searchKeyword = () => {
      setSearchQuery(this.setSearchText);
    };

    const onAutoCompleteSelect = (code: string) => {
      console.error(`[Home] TODO Select ${code}`);
    };

    return (
      <If condition={this.isLoading}>
        <Then>
          <p>TODO Implement Loading</p>
        </Then>
        <Else>
          <Container>
            <TopNav
              searchCallback={searchKeyword}
              onAutoCompleteSelect={onAutoCompleteSelect}
              toggleDrawer={() => this.setDrawerOpen(!this.drawerOpen)}
              searchText={this.searchText}
              setSearchText={this.setSearchText}
              issues={profileCourses.issues}/>
            <Drawer
              shadow={drawerShadow}
              open={this.drawerOpen}
              location={location}
            />
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
}

const mapState = (state: RootState) => ({
  drawerShadow: state.ui.drawerShadow,
  studentProfile: state.studentProfile.content,
  profileCourses: state.profileCourses
});

const mapDispatch = (dispatch: Dispatch) => bindActionCreators({
  fetchStudentProfile: fetchStudentProfileAction,
  setSearchQuery: search.actions.setSearchQuery,
  fetchProfileCourse: fetchProfileCourseAction
}, dispatch);

const connector = connect(mapState, mapDispatch);

export const Home = connector(withRouter(HomeBase));
