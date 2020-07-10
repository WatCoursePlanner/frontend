import React, {useState} from "react";
import {Redirect, Route, Switch, useLocation} from "react-router-dom";
import {DrawerAppContent} from '@rmwc/drawer';
import Schedule from "./Schedule";
import Discover from "./Discover";
import styled from "styled-components";
import Drawer from "../components/Drawer";
import TopNav from "../components/TopNav";

const Container = styled.div`
      height: 100%;
      position: relative;
      display: flex;
    `

const AppContainer = styled(DrawerAppContent)`
    margin-top: 64px;
    width: 100%;
`

const Home = () => {

    const [drawerOpen, setDrawerOpen] = useState(true);
    const [searchText, setSearchText] = useState('');
    const location = useLocation();

    return (
      <Container>
          <TopNav
            toggleDrawer={() => setDrawerOpen(!drawerOpen)}
            searchText={searchText}
            setSearchText={setSearchText}/>
          <Drawer open={drawerOpen} location={location}/>
          <AppContainer>
              <Switch>
                  <Route path="/home/schedule">
                      <Schedule/>
                  </Route>
                  <Route path="/home/discover">
                      <Discover/>
                  </Route>
                  <Route path="/home" exact>
                      <Redirect to="/home/schedule"/>
                  </Route>
              </Switch>
          </AppContainer>
      </Container>
    );
}

export default Home
