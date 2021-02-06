import { ListItem, ListItemGraphic, ListItemProps, ListItemText } from "@rmwc/list";
import * as React from "react";
import { Else, If, Then } from "react-if";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import styled from "styled-components";

/**
 * See https://material.io/resources/icons/?style=outline
 * for available icons
 */
export const TAB_ICONS = {
  SCHEDULE: "schedule",
  DISCOVER: "explore",
  IMPORT: "upload",
  EXPORT: "cloud_download",
  SHARE: "share",
};

interface INavMenuItemPropTypes {
  to?: string;
  newTab?: boolean;
  onClick?: () => void;
  icon: string;
  exact?: boolean;
}

class NavMenuItemBase extends React.Component<INavMenuItemPropTypes & RouteComponentProps> {
  handleOnClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };

  render() {
    const {
      to,
      newTab,
      exact,
      children,
      icon,
      location,
    } = this.props;

    return (
      <If condition={!!to}>
        <Then>
          <StyledNavLink
            onClick={this.handleOnClick}
            to={to!}
            target={newTab ? "_blank" : undefined}
            exact={exact}
          >
            <StyledListItem
              activated={location.pathname === to}>
              <ListItemGraphic
                className={"material-icons-outlined"}
                style={{marginRight: 24}}
                icon={icon}/>
              <StyledListItemText>
                {children}
              </StyledListItemText>
            </StyledListItem>
          </StyledNavLink>
        </Then>
        <Else>
          <StyledListItem onClick={this.handleOnClick}>
            <ListItemGraphic
              className={"material-icons-outlined"}
              style={{marginRight: 24}}
              icon={icon}/>
            <StyledListItemText>
              {children}
            </StyledListItemText>
          </StyledListItem>
        </Else>
      </If>
    );
  }
}

export const NavMenuItem = withRouter(NavMenuItemBase);

const StyledListItem = styled(ListItem)<ListItemProps & React.HTMLProps<HTMLDivElement>>`
  margin: 4px 0 4px 0 !important;
  -webkit-mask-image: radial-gradient(white, black);
  border-radius: 0 100px 100px 0 !important;
  padding-left: 24px !important;
  text-transform: capitalize !important;
`;

const StyledListItemText = styled(ListItemText)`
  font-weight: 600 !important;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;
