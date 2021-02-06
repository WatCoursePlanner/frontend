import { Dialog, DialogTitle, IconButton, InputAdornment, OutlinedInput } from "@material-ui/core";
import { FileCopy } from "@material-ui/icons";
import { Drawer as MaterialDrawer, DrawerContent, DrawerProps } from "@rmwc/drawer";
import '@rmwc/drawer/styles';
import { List, ListDivider } from "@rmwc/list";
import '@rmwc/list/styles';
import { discover, schedule } from "@watcourses/paths";
import { StudentProfileStore } from "@watcourses/stores/StudentProfileStore";
import { getStatePayloadForUrl } from "@watcourses/utils/LocalStorage";
import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import styled from "styled-components";

import { NavMenuItem, TAB_ICONS } from "./NavMenu";

interface IDrawerProps {
  shadow: boolean,
  open: boolean,
}

@observer
class DrawerBase extends React.Component<IDrawerProps & RouteComponentProps> {
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
  share = async () => {
    const loc = window.location;
    this.setShareLink(`${loc.protocol}//${loc.host}${loc.pathname}?schedule=${
      await getStatePayloadForUrl(StudentProfileStore.get().studentProfile)
    }`);
    this.setShareOpen(true);
  };

  constructor(props: IDrawerProps & RouteComponentProps) {
    super(props);
    makeObservable(this);
  }

  renderShareScheduleModal = () => (
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
  );

  renderMenu = () => (
    <List>
      <NavMenuItem icon={TAB_ICONS.SCHEDULE} to={schedule.home()} exact>
        Schedule
      </NavMenuItem>
      <NavMenuItem icon={TAB_ICONS.DISCOVER} to={discover.home()} exact>
        Discover
      </NavMenuItem>
      <StyledListDivider/>
      <NavMenuItem icon={TAB_ICONS.IMPORT}>
        Import
      </NavMenuItem>
      <NavMenuItem icon={TAB_ICONS.EXPORT}>
        Export
      </NavMenuItem>
      <NavMenuItem icon={TAB_ICONS.SHARE} onClick={this.share}>
        Share my Schedule
      </NavMenuItem>
    </List>
  );

  render() {
    const {
      open,
      shadow,
      location,
    } = this.props;

    const shouldShowShadow = shadow && location.pathname === schedule.home()

    return (
      <StyledDrawer
        className={'unselectable'}
        shadow={shouldShowShadow ? 1 : 0}
        dismissible
        open={open}>
        <StyledDrawerContent>
          {this.renderMenu()}
          {this.renderShareScheduleModal()}
        </StyledDrawerContent>
      </StyledDrawer>
    );
  }
}

export const Drawer = withRouter(DrawerBase);

const StyledDrawer = styled(MaterialDrawer)<DrawerProps & React.HTMLProps<HTMLDivElement> & { shadow: number }>`
  width: 276px;
  border-color: transparent;
  padding-top: 64px;
  z-index: 3;
  transition: all .25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 16px ${props => props.shadow ? `rgba(0, 0, 0, .28)` : `rgba(0, 0, 0, 0)`};
`;

const StyledDrawerContent = styled(DrawerContent)`
  padding-right: 20px;
`

const StyledListDivider = styled(ListDivider)`
  margin: 8px 0 8px 0;
`;
