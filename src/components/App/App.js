import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Discover from "../Discover/Discover";
import Schedule from "../Schedule/Schedule";

class App extends React.Component {
    render () {
        return (
          <Router>
              <Switch>
                  <Route path="/schedule">
                      <Schedule/>
                  </Route>
                  <Route path="/discover">
                      <Discover/>
                  </Route>
                  <Route path="/">
                      <Schedule/>
                  </Route>
              </Switch>
          </Router>
        )
    }
}

export default App;
