import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {ThemeProvider} from "@rmwc/theme"
import Home from "./sections/Home";
import '@rmwc/theme/styles';

const App = () => {
    return (
        <ThemeProvider
            options={{
                primary: '#2196F3',
                secondary: '#0069B5'
            }}
            style={{height: '100%'}}
        >
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
        </ThemeProvider>
    )
}

export default App;
