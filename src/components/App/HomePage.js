import React from "react";
import {Link, Redirect, Route, Switch, useLocation} from "react-router-dom";
import {Drawer, DrawerAppContent, DrawerContent} from '@rmwc/drawer';
import {List, ListItem, ListItemGraphic, ListItemText, ListDivider} from '@rmwc/list';
import {
    TopAppBar,
    TopAppBarRow,
    TopAppBarActionItem,
    TopAppBarNavigationIcon,
    TopAppBarSection, TopAppBarTitle, TopAppBarFixedAdjust
} from '@rmwc/top-app-bar';
import {IconButton} from '@rmwc/icon-button';
import SchedulePage from "../Schedule/SchedulePage";
import DiscoverPage from "../Discover/DiscoverPage";
import '../../index.scss'
import '@rmwc/drawer/styles';
import '@rmwc/list/styles';
import '@rmwc/button/styles';
import '@rmwc/icon-button/styles';
import '@rmwc/top-app-bar/styles';

const HomePage = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(true);
    const location = useLocation();

    const customListItemStyle = {
        margin: '4px 0 4px 0',
        borderRadius: '0 100px 100px 0',
        paddingLeft: 24,
        textTransform: 'capitalize'
    };

    const appBarButtonStyle = {
        color: '#5f6368',
    };

    const tabIcons = [
        'schedule',
        'explore'
    ];

    return (
        <div style={{height: '100%', overflow: 'hidden', position: 'relative'}}>
            <TopAppBar
                fixed
                theme={['secondaryBg', 'onSecondary']}
                style={{border: "1px solid #e0e0e0"}}>
                <TopAppBarRow>
                    <TopAppBarSection alignStart>
                        <IconButton
                            style={appBarButtonStyle}
                            icon="menu"
                            onClick={(e) => {
                                e.target.blur();
                                setDrawerOpen(!drawerOpen)
                            }}/>
                        <TopAppBarTitle>WatCourses</TopAppBarTitle>
                    </TopAppBarSection>
                    <TopAppBarSection alignEnd>
                        <IconButton
                            className={"material-icons-outlined"}
                            style={appBarButtonStyle}
                            icon="info"
                            onClick={(e) => {
                                e.target.blur();
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
                                    style={customListItemStyle}>
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
                        <ListItem style={customListItemStyle}>
                            <ListItemGraphic
                                className={"material-icons-outlined"}
                                style={{marginRight: 24}}
                                icon={'upload'}/>
                            <ListItemText>Import</ListItemText>
                        </ListItem>
                        <ListItem style={customListItemStyle}>
                            <ListItemGraphic
                                className={"material-icons-outlined"}
                                style={{marginRight: 24}}
                                icon={'cloud_download'}/>
                            <ListItemText>Export</ListItemText>
                        </ListItem>
                        <ListItem style={customListItemStyle}>
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
