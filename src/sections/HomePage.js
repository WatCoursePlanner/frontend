import React, {useState} from "react";
import {Redirect, Route, Switch, useLocation} from "react-router-dom";
import {DrawerAppContent} from '@rmwc/drawer';
import SchedulePage from "./SchedulePage";
import DiscoverPage from "./DiscoverPage";
import styled from "styled-components";
import Drawer from "../components/Drawer";
import TopNav from "../components/TopNav";
import '../index.scss'

const Container = styled.div`
      height: 100%;
      position: relative;
      display: flex;
    `

const HomePage = () => {

    const [drawerOpen, setDrawerOpen] = useState(true);
    const [searchText, setSearchText] = useState('');
    const location = useLocation();

    return (
      <Container>
          <TopNav
            toggleDrawer={() => setDrawerOpen(!drawerOpen)}
            searchText={searchText}
            setSearchText={setSearchText}/>
          <Drawer drawerOpen={drawerOpen} location={location}/>
          <DrawerAppContent style={{marginTop: 64, width: '100%'}}>
              <Switch>
                  <Route path="/home/schedule">
                      <SchedulePage/>
                  </Route>
                  <Route path="/home/discover">
                      <DiscoverPage/>
                  </Route>
                  <Route path="/home" exact>
                      <Redirect to="/home/schedule"/>
                  </Route>
              </Switch>
          </DrawerAppContent>
      </Container>
    );
}

export default HomePage
