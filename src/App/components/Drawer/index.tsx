import { Dialog, DialogTitle, IconButton, InputAdornment, OutlinedInput } from "@material-ui/core";
import { FileCopy } from "@material-ui/icons";
import { Drawer as MaterialDrawer, DrawerContent, DrawerProps } from "@rmwc/drawer";
import '@rmwc/drawer/styles';
import { List, ListDivider, ListItem, ListItemGraphic, ListItemProps, ListItemText } from "@rmwc/list";
import '@rmwc/list/styles';
import { RootState } from "@watcourses/redux/store";
import { getStatePayloadForUrl } from "@watcourses/utils/LocalStorage";
import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { connect, ConnectedProps, useSelector } from "react-redux";
import { Link, RouteProps, withRouter } from "react-router-dom";
import styled from "styled-components";

const StyledDrawer = observer(styled(MaterialDrawer)<DrawerProps & React.HTMLProps<HTMLDivElement> & { shadow: number }>`
  width: 276px;
  border-color: transparent;
  padding-top: 72px;
  z-index: 3;
  padding-right: 20px;
  transition: all .25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 16px ${props => props.shadow ? `rgba(0, 0, 0, .28)` : `rgba(0, 0, 0, 0)`};
`);

const CustomListItem = styled(ListItem)<ListItemProps & React.HTMLProps<HTMLDivElement>>`
  margin: 4px 0 4px 0 !important;
  -webkit-mask-image: radial-gradient(white, black);
  border-radius: 0 100px 100px 0 !important;
  padding-left: 24px !important;
  text-transform: capitalize !important;
`;

const StyledListItemText = styled(ListItemText)`
  font-weight: 600 !important;
`;

const tabIcons = [
  'schedule',
  'explore'
];

interface IDrawerProps {
  shadow: boolean,
  open: boolean,
  location: RouteProps["location"]
}

@observer
class DrawerBase extends React.Component<IDrawerProps & ConnectedProps<typeof connector>> {
  @observable
  shareLink = '';

  @observable
  shareOpen = false;

  @action
  setShareLink = (link: string) => {
    this.shareLink = link;
  };

  @action
  setShareOpen = (open: boolean) => {
    this.shareOpen = open;
  };

  @action
  share = () => {
    const loc = window.location;
    getStatePayloadForUrl(this.props.state).then(s => {
        this.setShareLink(`${loc.protocol}//${loc.host}${loc.pathname}?schedule=${s}`);
        this.setShareOpen(true);
      }
    );
  };

  componentDidMount() {
    makeObservable(this);
  }

  render() {

    const {
      open,
      location,
      shadow
    } = this.props;

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
          <CustomListItem onClick={this.share}>
            <ListItemGraphic
              className={"material-icons-outlined"}
              style={{marginRight: 24}}
              icon={'share'}/>
            <StyledListItemText>Share my Schedule</StyledListItemText>
          </CustomListItem>
          <Dialog open={this.shareOpen} onClose={() => this.setShareOpen(false)}>
            <DialogTitle>Share your schedule</DialogTitle>
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              value={this.shareLink}
              disabled
              autoFocus
              style={{margin: "30px 50px"}}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="copy to clipboard"
                    onClick={() => navigator.clipboard.writeText(this.shareLink)}
                    edge="end"
                  ><FileCopy/></IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </Dialog>
        </List>
      </DrawerContent>
    </StyledDrawer>);
  }
}

const mapState = (state: RootState) => ({state});

const connector = connect(mapState);

export const Drawer = connector(DrawerBase);
