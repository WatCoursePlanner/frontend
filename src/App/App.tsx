import { ThemeProvider as MUIThemeProvider } from "@material-ui/core/styles"
import { ThemeProvider as RMWCThemeProvider } from "@rmwc/theme"
import '@rmwc/theme/styles';
import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import { RMWCTheme, Theme } from "./constants/theme";
import { RootState } from "./redux/store";
import { Home } from "./sections/Home";
import Welcome from "./sections/Welcome";
import { saveState } from "./utils/LocalStorage";

const App = () => {
    const rootState = useSelector((state: RootState) => state)
    const studentProfiles = useSelector((state: RootState) => state.studentProfile)
    useEffect(() => {
        saveState(rootState)
    }, [studentProfiles])

    return (
        <RMWCThemeProvider
            options={RMWCTheme}
            style={{height: '100%'}}>
            <MUIThemeProvider theme={Theme}>
                <Router>
                    <Switch>
                        <Route path="/" exact>
                            <Redirect to="/home"/>
                        </Route>
                        <Route path="/home">
                            <Home/>
                        </Route>
                        <Route path="/welcome">
                            <Welcome/>
                        </Route>
                    </Switch>
                </Router>
            </MUIThemeProvider>
        </RMWCThemeProvider>
    )
}

export default App;
