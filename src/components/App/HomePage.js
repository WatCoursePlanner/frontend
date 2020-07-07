import React from "react";
import {Link, Route, Switch, useLocation, Redirect} from "react-router-dom";
import {Drawer, DrawerAppContent, DrawerContent} from '@rmwc/drawer';
import {List, ListItem} from '@rmwc/list';
import SchedulePage from "../Schedule/SchedulePage";
import DiscoverPage from "../Discover/DiscoverPage";
import '@rmwc/drawer/styles';
import '@rmwc/list/styles';
import '@rmwc/button/styles';

const HomePage = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const location = useLocation();

  const customListItemStyle = {
    marginLeft: 0,
    borderRadius: '0 100px 100px 0',
    paddingLeft: '16px',
    textTransform: 'capitalize'
  };

  return (
    <>
      <div style={{height: '100%', overflow: 'hidden', position: 'relative'}}>

          <Drawer dismissible open={drawerOpen}>
            <DrawerContent>
              <List>
                {['schedule', 'discover'].map((route, index) => (
                  <Link key={route} to={'/home/' + route} style={{textDecoration: 'none'}}>
                    <ListItem
                      activated={location.pathname === '/home/' + route}
                      style={customListItemStyle}>
                      {route}
                    </ListItem>
                  </Link>
                ))}
              </List>
            </DrawerContent>
          </Drawer>

          <DrawerAppContent style={{minHeight: '100%', padding: '1rem'}}>
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
      </div>
    </>
  );
}

export default HomePage
