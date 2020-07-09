import React, {useState} from "react";
import {Redirect, Route, Switch, useLocation} from "react-router-dom";
import {DrawerAppContent} from '@rmwc/drawer';
import Schedule from "./Schedule";
import Discover from "./Discover";
import styled from "styled-components";
import Drawer from "../components/Drawer";
import TopNav from "../components/TopNav";
import '../index.scss'

const Container = styled.div`
      height: 100%;
      position: relative;
      display: flex;
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
          <Drawer drawerOpen={drawerOpen} location={location}/>
          <DrawerAppContent style={{marginTop: 64, width: '100%'}}>
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
          </DrawerAppContent>
      </Container>
    );
}

export default Home
