import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import HomePage from "./HomePage";

const App = () => {
    return (
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
    )
}

export default App;
