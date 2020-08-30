import {TopAppBar, TopAppBarProps, TopAppBarRow, TopAppBarSection, TopAppBarTitle} from "@rmwc/top-app-bar";
import {MenuSurface, MenuSurfaceAnchor} from "@rmwc/menu";
import {Badge, BadgeAnchor} from "@rmwc/badge";
import {Avatar} from "@rmwc/avatar";
import React from "react";
import styled from "styled-components";
import {IconButton, IconButtonHTMLProps, IconButtonProps} from "@rmwc/icon-button";
import AutoCompleteSearchBar, {AutoCompleteCallbackProps, AutoCompleteOption} from "../AutoCompleteSearchBar"
import DegreeRequirementPopup, {DegreeRequirementPopupProps} from "./DegreeRequirementPopup";
import {CourseInfo} from "../../proto/courses";
import {SearchBarProps} from "../AutoCompleteSearchBar/SearchBar";
import Popup from "../Popup";
import '@rmwc/top-app-bar/styles';
import '@rmwc/menu/styles';
import '@rmwc/badge/styles';
import '@rmwc/avatar/styles';
import {CachedCourses} from "../../utils";

const StyledAppBar = styled(TopAppBar)<TopAppBarProps & React.HTMLProps<HTMLDivElement>>`
      border-bottom: 1px solid #e0e0e0;
    `

const StyledAppBarTitle = styled(TopAppBarTitle)`
      font-weight: 600;
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
}

const TopNav = ({toggleDrawer, searchText, setSearchText, searchCallback, onAutoCompleteSelect, issues}:
                    TopNavProps & AutoCompleteCallbackProps & SearchBarProps & DegreeRequirementPopupProps) => {
    const [degreeMenuOpen, setDegreeMenuOpen] = React.useState(false);
    const [accountMenuOpen, setAccountMenuOpen] = React.useState(false);

    return (
        <StyledAppBar fixed theme={['surface']}>
            <TopAppBarRow>
                <TopAppBarSection alignStart className={'unselectable'}>
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
                    <AutoCompleteSearchBar
                        onAutoCompleteSelect={onAutoCompleteSelect}
                        searchCallback={searchCallback}
                        searchText={searchText}
                        setSearchText={setSearchText}
                        options={CachedCourses.get().map((course: CourseInfo): AutoCompleteOption => {
                            return {
                                title: course.code,
                                subTitle: course.name,
                                weight: course.ratingsCount
                            }
                        })}
                    />
                </TopAppBarSection>
                <TopAppBarSection alignEnd>
                    <MenuSurfaceAnchor>
                        <MenuSurface
                            open={degreeMenuOpen}
                            anchorCorner={'bottomLeft'}
                            onClose={() => setDegreeMenuOpen(false)}>
                            <DegreeRequirementPopup issues={issues}/>
                        </MenuSurface>
                        <BadgeAnchor>
                            <InfoButton
                                className={"material-icons-outlined"}
                                icon="info"
                                onClick={() => setDegreeMenuOpen(!degreeMenuOpen)}/>
                            {issues && issues.length > 0 ?
                                <Badge className={'unselectable'} style={{marginRight: 40}} inset="0.75rem" label={issues.length}/> : null}
                        </BadgeAnchor>
                    </MenuSurfaceAnchor>
                    <MenuSurfaceAnchor>
                        <MenuSurface
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
