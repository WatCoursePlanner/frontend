import { ThemeProvider as MUIThemeProvider } from "@material-ui/core/styles";
import { ThemeProvider as RMWCThemeProvider } from "@rmwc/theme";
import '@rmwc/theme/styles';
import { RMWCTheme, Theme } from "@watcourses/constants/theme";
import { Home } from "@watcourses/sections/Home";
import Welcome from "@watcourses/sections/Welcome";
import { observer } from "mobx-react";
import { fromPromise } from "mobx-utils";
import React from 'react';
import { Route, Switch } from "react-router";
import { Redirect, Router } from "react-router-dom";

import initializeApp from "./initializeApp";
import { home, welcome } from "./paths";
import { AppHistory } from "./services/AppHistory";

@observer
export class App extends React.Component {
  renderLoading = () => (
    <p>TODO Implement Loading</p>
  );

  renderError = (error: any) => (
    <p>TODO Implement Error: {error.toString()}</p>
  );

  renderApp = () => (
    <RMWCThemeProvider
      options={RMWCTheme}
      style={{height: '100%'}}>
      <MUIThemeProvider theme={Theme}>
        <Router history={AppHistory.get().history}>
          <Switch>
            <Route path="/" exact>
              <Redirect to={home()}/>
            </Route>
            <Route path={home()}>
              <Home/>
            </Route>
            <Route path={welcome()}>
              <Welcome/>
            </Route>
          </Switch>
        </Router>
      </MUIThemeProvider>
    </RMWCThemeProvider>
  );

  render() {
    return (
      fromPromise(initializeApp).case({
        fulfilled: () => this.renderApp(),
        pending: () => this.renderLoading(),
        rejected: (error) => this.renderError(error),
      })
    );
  }
}
