import React, {useRef} from "react";
import {Link, Redirect, Route, Switch, useLocation} from "react-router-dom";
import {Drawer, DrawerAppContent, DrawerContent} from '@rmwc/drawer';
import {List, ListDivider, ListItem, ListItemGraphic, ListItemText} from '@rmwc/list';
import {TopAppBar, TopAppBarFixedAdjust, TopAppBarRow, TopAppBarSection, TopAppBarTitle} from '@rmwc/top-app-bar';
import {IconButton} from '@rmwc/icon-button';
import SchedulePage from "./SchedulePage";
import DiscoverPage from "./DiscoverPage";
import '../index.scss'
import '@rmwc/textfield/styles';
import '@rmwc/drawer/styles';
import '@rmwc/list/styles';
import '@rmwc/button/styles';
import '@rmwc/icon-button/styles';
import '@rmwc/top-app-bar/styles';
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";

const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {
        htmlElRef.current && htmlElRef.current.focus()
    }

    return [htmlElRef, setFocus]
}

const HomePage = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(true);
    const [searchText, setSearchText] = React.useState('');
    const [inputRef, setInputFocus] = useFocus()
    const location = useLocation();


    const styles = {
        customListItemStyle: {
            margin: '4px 0 4px 0',
            borderRadius: '0 100px 100px 0',
            paddingLeft: 24,
            textTransform: 'capitalize'
        }, appBarButtonStyle: {
            color: '#5f6368',
        }
    };

    const tabIcons = [
        'schedule',
        'explore'
    ];

    return (
      <div style={{height: '100%', overflow: 'hidden', position: 'relative'}}>
          <TopAppBar
            fixed
            theme={['surface']}
            // style={{border: "1px solid #e0e0e0"}}
          >
              <TopAppBarRow>
                  <TopAppBarSection alignStart>
                      <IconButton
                        style={styles.appBarButtonStyle}
                        icon="menu"
                        onClick={(e) => {
                            e.target.blur();
                            setDrawerOpen(!drawerOpen)
                        }}/>
                      <svg width="36" height="36" style={{marginLeft: 8}}>
                          <circle cx="18" cy="18" r="18" fill="#0069B5"/>
                      </svg>
                      <TopAppBarTitle style={{
                          fontFamily: 'Lato',
                          fontWeight: 400,
                          paddingLeft: 10,
                          marginRight: 30,
                          color: '#5f6368',
                      }}>WatCourses</TopAppBarTitle>

                      <Paper className={'search-bar'} elevation={0}>
                          <IconButton style={styles.appBarButtonStyle} icon={'search'}/>
                          <InputBase
                            style={{
                                marginLeft: 16,
                                flex: 1,
                            }}
                            inputProps={{'ref': inputRef}}
                            placeholder="Search for Programs or Courses"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                          />
                          <IconButton
                            className={searchText === '' ? 'hidden' : ''}
                            style={styles.appBarButtonStyle}
                            icon={'close'}
                            onClick={() => {
                                setSearchText('')
                                setInputFocus()
                            }}/>
                      </Paper>

                  </TopAppBarSection>
                  <TopAppBarSection alignEnd>
                      <IconButton
                        className={"material-icons-outlined"}
                        style={styles.appBarButtonStyle}
                        icon="info"
                        onClick={() => {

                        }}/>
                    </TopAppBarSection>
                </TopAppBarRow>
            </TopAppBar>
            <TopAppBarFixedAdjust/>
            <Drawer dismissible open={drawerOpen} style={{borderColor: 'transparent', marginTop: 8}}>
                <DrawerContent>
                    <List>
                        {['schedule', 'discover'].map((route, index) => (
                            <Link key={route} to={'/home/' + route} style={{textDecoration: 'none',}}>
                                <ListItem
                                  activated={location.pathname === '/home/' + route}
                                  style={styles.customListItemStyle}>
                                    <ListItemGraphic
                                      className={"material-icons-outlined"}
                                      style={{marginRight: 24}}
                                      icon={tabIcons[index]}/>
                                    <ListItemText>
                                        {route}
                                    </ListItemText>
                                </ListItem>
                            </Link>
                        ))}
                        <ListDivider style={{margin: '8px 0 8px 0'}}/>
                        <ListItem style={styles.customListItemStyle}>
                            <ListItemGraphic
                              className={"material-icons-outlined"}
                              style={{marginRight: 24}}
                              icon={'upload'}/>
                            <ListItemText>Import</ListItemText>
                        </ListItem>
                        <ListItem style={styles.customListItemStyle}>
                            <ListItemGraphic
                              className={"material-icons-outlined"}
                              style={{marginRight: 24}}
                              icon={'cloud_download'}/>
                            <ListItemText>Export</ListItemText>
                        </ListItem>
                        <ListItem style={styles.customListItemStyle}>
                            <ListItemGraphic
                              className={"material-icons-outlined"}
                              style={{marginRight: 24}}
                              icon={'share'}/>
                            <ListItemText>Share my Schedule</ListItemText>
                        </ListItem>
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
    );
}

export default HomePage
