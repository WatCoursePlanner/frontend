import { Dialog } from "@rmwc/dialog";
import { DrawerAppContent } from '@rmwc/drawer';
import { Drawer } from "@watcourses/components/Drawer";
import { SignInModal } from "@watcourses/components/SignIn/SignInModal";
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
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { SignInModal } from "../components/SignIn/SignInModal";

import { Discover } from "./Discover";
import { Schedule } from "./Schedule";

interface IHomeProps {
}

@observer
export class Home extends React.Component<IHomeProps> {

  @observable
  drawerShadow: boolean = false;

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
  setDrawerShadow = (shadow: boolean) => {
    this.drawerShadow = shadow;
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
                <Route path={discover.home()} exact>
                  <Discover searchQuery={this.searchQuery}/>
                </Route>
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
          </Dialog>
        </Else>
      </If>
    );
  }
}

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
