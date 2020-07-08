import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {ThemeProvider} from "@rmwc/theme"
import HomePage from "./HomePage";
import '@rmwc/theme/styles';

const App = () => {
    return (
        <ThemeProvider
            options={{
                primary: '#2196F3',
                secondary: 'white'
            }}
            style={{height: '100%'}}
        >
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <Redirect to="/home"/>
                    </Route>
                    <Route path="/home">
                        <HomePage/>
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>
    )
}

export default App;
