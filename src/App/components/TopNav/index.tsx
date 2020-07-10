import {TopAppBar, TopAppBarProps, TopAppBarRow, TopAppBarSection, TopAppBarTitle} from "@rmwc/top-app-bar";
import {MenuSurface, MenuSurfaceAnchor} from "@rmwc/menu";
import {Badge, BadgeAnchor} from "@rmwc/badge";
import {Avatar} from "@rmwc/avatar";
import React from "react";
import styled from "styled-components";
import {IconButton, IconButtonHTMLProps, IconButtonProps} from "@rmwc/icon-button";
import SearchBar from "../SearchBar"
import DegreeRequirementPopup from "./DegreeRequirementPopup";
import Popup from "../Popup";

import '@rmwc/top-app-bar/styles';
import '@rmwc/menu/styles';
import '@rmwc/badge/styles';
import '@rmwc/avatar/styles';

const StyledAppBar = styled(TopAppBar)<TopAppBarProps & React.HTMLProps<HTMLDivElement>>`
      border-bottom: 1px solid #e0e0e0;
    `

const StyledAppBarTitle = styled(TopAppBarTitle)`
      font-family: 'Lato', sans-serif;
      font-weight: 400;
      padding-left: 10px;
      margin-right: 30px;
      color: #5f6368;
    `

const AppBarButton = styled(IconButton)<IconButtonHTMLProps & IconButtonProps>`
        color: #5f6368;
    `

const InfoButton = styled(AppBarButton)`
        margin-right: 30px;
    `

type TopNavProps = {
  toggleDrawer: () => void,
  searchText: string,
  setSearchText: ((text: string) => void),
}

const TopNav = ({toggleDrawer, searchText, setSearchText}: TopNavProps) => {
  const [degreeMenuOpen, setDegreeMenuOpen] = React.useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = React.useState(false);
  return (
    <StyledAppBar fixed theme={['surface']}>
      <TopAppBarRow>
        <TopAppBarSection alignStart>
          <AppBarButton
            icon="menu"
            onMouseDown={(e) => {
              e.preventDefault()
            }}
            onClick={toggleDrawer}
          />
          <svg width="36" height="36" style={{marginLeft: 8}}>
            <circle cx="18" cy="18" r="18" fill="#0069B5"/>
          </svg>
          <StyledAppBarTitle>WatCourses</StyledAppBarTitle>
          <SearchBar searchText={searchText} setSearchText={setSearchText}/>
        </TopAppBarSection>
        <TopAppBarSection alignEnd>
          <MenuSurfaceAnchor>
            <MenuSurface
              renderToPortal
              open={degreeMenuOpen}
              anchorCorner={'bottomLeft'}
              onClose={() => setDegreeMenuOpen(false)}>
              <DegreeRequirementPopup/>
            </MenuSurface>
            <BadgeAnchor>
              <InfoButton
                className={"material-icons-outlined"}
                icon="info"
                onClick={() => setDegreeMenuOpen(!degreeMenuOpen)}/>
              <Badge style={{marginRight: 40}} inset="0.75rem" label={10}/>
            </BadgeAnchor>
          </MenuSurfaceAnchor>
          <MenuSurfaceAnchor>
            <MenuSurface
              renderToPortal
              open={accountMenuOpen}
              anchorCorner={'bottomLeft'}
              onClose={() => setAccountMenuOpen(false)}>
              <Popup title={'Account'}/>
            </MenuSurface>
            <Avatar
              ripple
              name="John Doe"
              size={'large'}
              style={{backgroundColor: "#32b9c1"}}
              onClick={() => setAccountMenuOpen(!accountMenuOpen)}/>
          </MenuSurfaceAnchor>
        </TopAppBarSection>
      </TopAppBarRow>
    </StyledAppBar>
  )
}

export default TopNav
