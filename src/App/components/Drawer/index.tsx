import { Dialog, DialogTitle, IconButton, InputAdornment, OutlinedInput } from "@material-ui/core";
import { FileCopy } from "@material-ui/icons";
import { Drawer, DrawerContent, DrawerProps } from "@rmwc/drawer";
import '@rmwc/drawer/styles';
import { List, ListDivider, ListItem, ListItemGraphic, ListItemProps, ListItemText } from "@rmwc/list";
import '@rmwc/list/styles';
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, RouteProps } from "react-router-dom";
import styled from "styled-components";

import { RootState } from "../../redux/store";
import { getStatePayloadForUrl } from "../../utils/LocalStorage";

const StyledDrawer = styled(Drawer)<DrawerProps & React.HTMLProps<HTMLDivElement> & { shadow: number }>`
  width: 276px;
  border-color: transparent;
  padding-top: 72px;
  z-index: 3;
  padding-right: 20px;
  transition: all .25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 16px ${props => props.shadow ? `rgba(0, 0, 0, .28)` : `rgba(0, 0, 0, 0)`};
`

const CustomListItem = styled(ListItem)<ListItemProps & React.HTMLProps<HTMLDivElement>>`
  margin: 4px 0 4px 0 !important;
  -webkit-mask-image: radial-gradient(white, black);
  border-radius: 0 100px 100px 0 !important;
  padding-left: 24px !important;
  text-transform: capitalize !important;
`

const StyledListItemText = styled(ListItemText)`
  font-weight: 600 !important;
`

const tabIcons = [
    'schedule',
    'explore'
];

type MyDrawerProps = {
    shadow: boolean,
    open: boolean,
    location: RouteProps["location"]
}

const MyDrawer = ({open, location, shadow}: MyDrawerProps) => {
    const [shareLink, setShareLink] = useState("")
    const [shareOpen, setShareOpen] = useState(false)
    const state = useSelector((_state: RootState) => _state)
    const share = () => {
        const loc = window.location
        getStatePayloadForUrl(state).then(s => {
                setShareLink(`${loc.protocol}//${loc.host}${loc.pathname}?schedule=${s}`)
                setShareOpen(true)
            }
        )
    }
    return (<StyledDrawer
        className={'unselectable'}
        shadow={shadow ? 1 : 0}
        dismissible
        open={open}>
        <DrawerContent>
            <List>
                {['schedule', 'discover'].map((route, index) => (
                    <Link key={route} to={`/home/${route}`} style={{textDecoration: 'none'}}>
                        <CustomListItem
                            activated={location?.pathname === `/home/${route}`}>
                            <ListItemGraphic
                                className={"material-icons-outlined"}
                                style={{marginRight: 24}}
                                icon={tabIcons[index]}/>
                            <StyledListItemText>
                                {route}
                            </StyledListItemText>
                        </CustomListItem>
                    </Link>
                ))}
                <ListDivider style={{margin: '8px 0 8px 0'}}/>
                <CustomListItem>
                    <ListItemGraphic
                        className={"material-icons-outlined"}
                        style={{marginRight: 24}}
                        icon={'upload'}/>
                    <StyledListItemText>Import</StyledListItemText>
                </CustomListItem>
                <CustomListItem>
                    <ListItemGraphic
                        className={"material-icons-outlined"}
                        style={{marginRight: 24}}
                        icon={'cloud_download'}/>
                    <StyledListItemText>Export</StyledListItemText>
                </CustomListItem>
                <CustomListItem onClick={share}>
                    <ListItemGraphic
                        className={"material-icons-outlined"}
                        style={{marginRight: 24}}
                        icon={'share'}/>
                    <StyledListItemText>Share my Schedule</StyledListItemText>
                </CustomListItem>
                <Dialog open={shareOpen} onClose={() => setShareOpen(false)}>
                    <DialogTitle>Share your schedule</DialogTitle>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type="text"
                        value={shareLink}
                        disabled
                        autoFocus
                        style={{margin: "30px 50px"}}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="copy to clipboard"
                                    onClick={() => navigator.clipboard.writeText(shareLink)}
                                    edge="end"
                                ><FileCopy/></IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                </Dialog>
            </List>
        </DrawerContent>
    </StyledDrawer>)
}

export default MyDrawer;

