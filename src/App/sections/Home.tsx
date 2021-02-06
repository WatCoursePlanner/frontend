import { DrawerAppContent } from '@rmwc/drawer';
import { Drawer } from "@watcourses/components/Drawer";
import { TopNav } from "@watcourses/components/TopNav";
import { discover, home, schedule } from "@watcourses/paths";
import { RootState } from "@watcourses/redux/store";
import { AppHistory } from "@watcourses/services/AppHistory";
import { CachedCoursesStore } from "@watcourses/stores/CachedCoursesStore";
import { ProfileCoursesStore } from "@watcourses/stores/ProfileCoursesStore";
import { action, computed, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { Else, If, Then } from "react-if";
import { connect, ConnectedProps } from "react-redux";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import { Discover } from "./Discover";
import { Schedule } from "./Schedule";

interface IHomeProps extends ConnectedProps<typeof connector> {
}

@observer
class HomeBase extends React.Component<IHomeProps> {

  @observable
  searchQuery: string = "";

  @observable
  drawerOpen: boolean = true;

  @observable
  searchText: string = "";

  @computed
  private get isLoading() {
    return CachedCoursesStore.get().isLoading;
  }

  @action
  setSearchText = (text?: string) => {
    this.searchText = text ?? "";
  };

  @action
  setDrawerOpen = (open: boolean) => {
    this.drawerOpen = open;
  };

  @action
  search = (query: string) => {
    this.searchQuery = query;
    AppHistory.get().goTo(discover.home());
  };

  searchCurrentInput = () => {
    this.search(this.searchText);
  };

  onAutoCompleteSelect = (code: string) => {
    this.search(code);
  };

  constructor(props: IHomeProps) {
    super(props);
    makeObservable(this);
  }

  render() {
    const {
      drawerShadow,
    } = this.props;

    return (
      <If condition={this.isLoading}>
        <Then>
          <p>TODO Implement Loading</p>
        </Then>
        <Else>
          <Container>
            <TopNav
              onSearch={this.searchCurrentInput}
              onAutoCompleteSelect={this.onAutoCompleteSelect}
              toggleDrawer={() => this.setDrawerOpen(!this.drawerOpen)}
              searchText={this.searchText}
              setSearchText={this.setSearchText}
              issues={ProfileCoursesStore.get().profileCourses.issues ?? []}/>
            <Drawer
              shadow={drawerShadow}
              open={this.drawerOpen}
            />
            <AppContainer>
              <Switch>
                <Route path={schedule.home()} exact>
                  <Schedule/>
                </Route>
                <Route path={discover.home()} exact>
                  <Discover searchQuery={this.searchQuery}/>
                </Route>
                <Route path={home()} exact>
                  <Redirect to={discover.home()}/>
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

const connector = connect(mapState);

export const Home = connector(HomeBase);

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
