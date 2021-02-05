import { DrawerAppContent } from '@rmwc/drawer';
import { Drawer } from "@watcourses/components/Drawer";
import { TopNav } from "@watcourses/components/TopNav";
import search from "@watcourses/redux/slices/search";
import { RootState } from "@watcourses/redux/store";
import { ProfileCoursesStore } from "@watcourses/stores/ProfileCoursesStore";
import { CachedCoursesStore } from "@watcourses/utils";
import { action, computed, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { Else, If, Then } from "react-if";
import { connect, ConnectedProps } from "react-redux";
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import styled from "styled-components";

import { Discover } from "./Discover";
import { Schedule } from "./Schedule";

interface IHomeProps extends ConnectedProps<typeof connector>, RouteComponentProps {
}

@observer
class HomeBase extends React.Component<IHomeProps> {

  @observable
  drawerOpen: boolean = true;

  @observable
  searchText: string = '';

  @computed
  private get isLoading() {
    return CachedCoursesStore.get().isLoading;
  }

  @action
  setSearchText = (text?: string) => {
    this.searchText = text ?? '';
  };

  @action
  setDrawerOpen = (open: boolean) => {
    this.drawerOpen = open;
  };

  componentDidMount() {
    makeObservable(this);
  }

  render() {
    const {
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
              onSearch={searchKeyword}
              onAutoCompleteSelect={onAutoCompleteSelect}
              toggleDrawer={() => this.setDrawerOpen(!this.drawerOpen)}
              searchText={this.searchText}
              setSearchText={this.setSearchText}
              issues={ProfileCoursesStore.get().profileCourses.issues ?? []}/>
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
});

const mapDispatch = (dispatch: Dispatch) => bindActionCreators({
  setSearchQuery: search.actions.setSearchQuery,
}, dispatch);

const connector = connect(mapState, mapDispatch);

export const Home = connector(withRouter(HomeBase));

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
