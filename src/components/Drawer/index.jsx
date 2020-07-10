import {Drawer, DrawerContent} from "@rmwc/drawer";
import {List, ListDivider, ListItem, ListItemGraphic, ListItemText} from "@rmwc/list";
import {Link} from "react-router-dom";
import React from "react";
import styled from "styled-components";

import '@rmwc/drawer/styles';
import '@rmwc/list/styles';

const StyledDrawer = styled(Drawer)`
        border-color: transparent;
        padding-top: 72px;
        z-index: 3;
    `

const CustomListItem = styled(ListItem)`
       margin: 4px 0 4px 0 !important;
       border-radius: 0 100px 100px 0 !important;
       padding-left: 24px !important;
       text-transform: capitalize !important;
    `

const tabIcons = [
  'schedule',
  'explore'
];


const MyDrawer = (props) => (
  <StyledDrawer
    dismissible
    open={props.open}>
    <DrawerContent>
      <List>
        {['schedule', 'discover'].map((route, index) => (
          <Link key={route} to={'/home/' + route} style={{textDecoration: 'none'}}>
            <CustomListItem
              activated={props.location.pathname === '/home/' + route}>
              <ListItemGraphic
                className={"material-icons-outlined"}
                style={{marginRight: 24}}
                icon={tabIcons[index]}/>
              <ListItemText>
                {route}
              </ListItemText>
            </CustomListItem>
          </Link>
        ))}
        <ListDivider style={{margin: '8px 0 8px 0'}}/>
        <CustomListItem>
          <ListItemGraphic
            className={"material-icons-outlined"}
            style={{marginRight: 24}}
            icon={'upload'}/>
          <ListItemText>Import</ListItemText>
        </CustomListItem>
        <CustomListItem>
          <ListItemGraphic
            className={"material-icons-outlined"}
            style={{marginRight: 24}}
            icon={'cloud_download'}/>
          <ListItemText>Export</ListItemText>
        </CustomListItem>
        <CustomListItem>
          <ListItemGraphic
            className={"material-icons-outlined"}
            style={{marginRight: 24}}
            icon={'share'}/>
          <ListItemText>Share my Schedule</ListItemText>
        </CustomListItem>
      </List>
    </DrawerContent>
  </StyledDrawer>
)

export default MyDrawer;

