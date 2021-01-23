import { ThemeProvider as MUIThemeProvider } from "@material-ui/core/styles"
import { ThemeProvider as RMWCThemeProvider } from "@rmwc/theme"
import '@rmwc/theme/styles';
import { RMWCTheme, Theme } from "@watcourses/constants/theme";
import { RootState } from "@watcourses/redux/store";
import { Home } from "@watcourses/sections/Home";
import Welcome from "@watcourses/sections/Welcome";
import { saveState } from "@watcourses/utils/LocalStorage";
import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

const App = () => {
    const rootState = useSelector((state: RootState) => state)
    const studentProfiles = useSelector((state: RootState) => state.studentProfile)
    useEffect(() => {
        saveState(rootState)
    }, [rootState, studentProfiles])

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
