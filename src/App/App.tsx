import React, {useEffect} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {ThemeProvider as RMWCThemeProvider} from "@rmwc/theme"
import Home from "./sections/Home";
import Welcome from "./sections/Welcome";
import '@rmwc/theme/styles';
import {ThemeProvider as MUIThemeProvider} from "@material-ui/core/styles"
import {RMWCTheme, Theme} from "./constants/theme";
import {useSelector} from "react-redux";
import {saveState} from "./utils/LocalStorage";
import {RootState} from "./redux/store";

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
