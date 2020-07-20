import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {ThemeProvider as RMWCThemeProvider} from "@rmwc/theme"
import Home from "./sections/Home";
import '@rmwc/theme/styles';
import {ThemeProvider as MUIThemeProvider} from "@material-ui/core/styles"
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
    overrides: {
        MuiTableCell: {
            root: {
                padding: '4px 16px',
                borderBottom: "none"
            },
            stickyHeader: {
                backgroundColor: "white",
                borderBottom: "1px solid #e0e0e0"
            }
        },
    },
});

const App = () => {
    return (
        <RMWCThemeProvider
            options={{
                primary: '#2196F3',
                secondary: '#0069B5'
            }}
            style={{height: '100%'}}
        >
            <MUIThemeProvider theme={theme}>
                <Router>
                    <Switch>
                        <Route path="/" exact>
                            <Redirect to="/home"/>
                        </Route>
                        <Route path="/home">
                            <Home/>
                        </Route>
                    </Switch>
                </Router>
            </MUIThemeProvider>
        </RMWCThemeProvider>
    )
}

export default App;
