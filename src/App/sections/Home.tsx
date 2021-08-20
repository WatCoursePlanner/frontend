import { Dialog } from "@rmwc/dialog";
import { DrawerAppContent } from '@rmwc/drawer';
import { Drawer } from "@watcourses/components/Drawer";
import { SignInModal } from "@watcourses/components/SignIn/SignInModal";
import { SignUpModal } from "@watcourses/components/SignIn/SignUpModal";
import { TopNav } from "@watcourses/components/TopNav";
import { discover, home, schedule } from "@watcourses/paths";
import { AppHistory } from "@watcourses/services/AppHistory";
import { CachedCoursesStore } from "@watcourses/stores/CachedCoursesStore";
import { ProfileCoursesStore } from "@watcourses/stores/ProfileCoursesStore";
import {
  SignInModalStore,
  SignInModalType,
} from "@watcourses/stores/SignInModalStore";
import { action, computed, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { Else, If, Then } from "react-if";
import { Route, Switch } from "react-router";
import {
  Redirect, RouteComponentProps,
  RouteProps,
  RouterProps,
  withRouter,
} from "react-router-dom";
import styled from "styled-components";

import { Discover } from "./Discover";
import { Schedule } from "./Schedule";

interface IHomeProps {
}

@observer
class HomeBase extends React.Component<IHomeProps & RouteComponentProps> {

  @observable
  drawerShadow: boolean = false;

  @observable
  drawerOpen: boolean = true;

  @computed
  private get isLoading() {
    return CachedCoursesStore.get().isLoading;
  }

  @action
  setDrawerOpen = (open: boolean) => {
    this.drawerOpen = open;
  };

  @action
  setDrawerShadow = (shadow: boolean) => {
    this.drawerShadow = shadow;
  };

  @action
  search = (query: string) => {
    AppHistory.get().goTo(`${discover.home()}/?query=${query}`);
  };

  onAutoCompleteSelect = (code: string) => {
    this.search(code);
  };

  constructor(props: IHomeProps & RouteComponentProps) {
    super(props);
    makeObservable(this);
  }

  render() {
    return (
      <If condition={this.isLoading}>
        <Then>
          <p>TODO Implement Loading</p>
        </Then>
        <Else>
          <Container>
            <TopNav
              onSearch={this.search}
              onAutoCompleteSelect={this.onAutoCompleteSelect}
              toggleDrawer={() => this.setDrawerOpen(!this.drawerOpen)}
              issues={ProfileCoursesStore.get().profileCourses.issues ?? []}
            />
            <Drawer
              shadow={this.drawerShadow}
              open={this.drawerOpen}
            />
            <AppContainer>
              <Switch>
                <Route path={schedule.home()} exact>
                  <Schedule
                    drawerShadow={this.drawerShadow}
                    setDrawerShadow={this.setDrawerShadow}
                  />
                </Route>
                <Route
                  exact
                  path={`${discover.home()}`}
                  render={({location}) => {
                    const query = (new URLSearchParams(location.search))
                      .get("query") ?? "";
                    return <Discover searchQuery={query}/>;
                  }}
                />
                <Route path={home()} exact>
                  <Redirect to={schedule.home()}/>
                </Route>
              </Switch>
            </AppContainer>
          </Container>
          <Dialog
            open={SignInModalStore.get().currentModal !== SignInModalType.NONE}
            onClose={async _ => {
              await SignInModalStore.get().dismiss();
            }}
          >
            {SignInModalStore.get().currentModal === SignInModalType.SIGNIN &&
            <SignInModal/>}
            {SignInModalStore.get().currentModal === SignInModalType.SIGNUP &&
            <SignUpModal/>}
          </Dialog>
        </Else>
      </If>
    );
  }
}

export const Home = withRouter(HomeBase);

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
