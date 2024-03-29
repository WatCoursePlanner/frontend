import { AutocompleteRenderInputParams } from "@material-ui/lab";
import { Avatar } from "@rmwc/avatar";
import { Badge, BadgeAnchor } from "@rmwc/badge";
import { Button } from "@rmwc/button";
import {
  IconButton,
  IconButtonHTMLProps,
  IconButtonProps,
} from "@rmwc/icon-button";
import { MenuSurface, MenuSurfaceAnchor } from "@rmwc/menu";
import {
  TopAppBar,
  TopAppBarProps,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from "@rmwc/top-app-bar";
import {
  AutoCompleteOption,
  AutoCompleteSearchBar,
  IAutoCompleteCallbackProps,
} from "@watcourses/components/AutoCompleteSearchBar";
import { Popup } from "@watcourses/components/Popup";
import { schedule } from "@watcourses/paths";
import { CourseInfo } from "@watcourses/proto/courses";
import { CachedCoursesStore } from "@watcourses/stores/CachedCoursesStore";
import { SignInModalStore } from "@watcourses/stores/SignInModalStore";
import { UserStore } from "@watcourses/stores/UserStore";
import { unset } from "lodash";
import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { Else, If, Then } from "react-if";
import styled from "styled-components";

import DegreeRequirementPopup, {
  IDegreeRequirementPopupProps,
} from "./DegreeRequirementPopup";

interface ITopNavProps extends IAutoCompleteCallbackProps,
  IDegreeRequirementPopupProps {
  toggleDrawer: () => void,
  autoCompleteRenderProps?: AutocompleteRenderInputParams,
  onSearch: ((query: string) => void),
}

@observer
export class TopNav extends React.Component<ITopNavProps> {

  @observable
  degreeMenuOpen = false;

  @observable
  accountMenuOpen = false;

  @action
  setDegreeMenuOpen = (open: boolean) => {
    this.degreeMenuOpen = open;
  };

  @action
  setAccountMenuOpen = (open: boolean) => {
    this.accountMenuOpen = open;
  };

  componentDidMount() {
    makeObservable(this);
  }

  render() {
    const {
      toggleDrawer,
      onSearch,
      onAutoCompleteSelect,
      issues,
    } = this.props;

    const user = UserStore.get().user;
    const fullName = `${user.firstName} ${user.lastName}`;

    return (
      <StyledAppBar fixed theme={['surface']}>
        <TopAppBarRow>
          <TopAppBarSection alignStart className={'unselectable'}>
            <AppBarButton
              icon="menu"
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              onClick={toggleDrawer}
            />
            <svg width="36" height="36" style={{marginLeft: 8}}>
              <circle cx="18" cy="18" r="18" fill="#0069B5"/>
            </svg>
            <StyledAppBarTitle>WatCourses</StyledAppBarTitle>
            <AutoCompleteSearchBar
              onAutoCompleteSelect={onAutoCompleteSelect}
              onSearch={onSearch}
              options={
                CachedCoursesStore.get().courses.map(
                  (course: CourseInfo): AutoCompleteOption => {
                    return {
                      title: course.code,
                      subTitle: course.name,
                      weight: course.ratingsCount,
                    };
                  },
                )}
            />
          </TopAppBarSection>
          <TopAppBarSection alignEnd>
            <MenuSurfaceAnchor>
              <MenuSurface
                open={this.degreeMenuOpen}
                anchorCorner={'bottomLeft'}
                onClose={() => this.setDegreeMenuOpen(false)}>
                <DegreeRequirementPopup issues={issues}/>
              </MenuSurface>
              <BadgeAnchor>
                <InfoButton
                  className={"material-icons-outlined"}
                  icon="info"
                  onClick={() => this.setDegreeMenuOpen(!this.degreeMenuOpen)}/>
                {issues && issues.length > 0 ?
                  <Badge className={'unselectable'} style={{marginRight: 40}}
                         inset="0.75rem"
                         label={issues.length}/> : null}
              </BadgeAnchor>
            </MenuSurfaceAnchor>
            <If condition={UserStore.get().isLoggedIn}>
              <Then>
                <MenuSurfaceAnchor>
                  <MenuSurface
                    open={this.accountMenuOpen}
                    anchorCorner={'bottomLeft'}
                    onClose={() => this.setAccountMenuOpen(false)}>
                    <Popup title={fullName}>
                      <Button
                        label="Sign Out"
                        raised
                        onClick={async () => {
                          await UserStore.get().signOut();
                          window.location.replace(schedule.home());
                        }}/>
                    </Popup>
                  </MenuSurface>
                  <Avatar
                    ripple
                    name={fullName}
                    size={'large'}
                    src={user.pictureUrl}
                    style={{
                      backgroundColor: "#32b9c1",
                      fontFamily: "unset",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      this.setAccountMenuOpen(!this.accountMenuOpen);
                    }}/>
                </MenuSurfaceAnchor>
              </Then>
              <Else>
                <Button
                  label="Sign In"
                  raised
                  onClick={() => {
                    SignInModalStore.get().showSignIn();
                  }}/>
              </Else>
            </If>
          </TopAppBarSection>
        </TopAppBarRow>
      </StyledAppBar>
    );
  }
}

const StyledAppBar = styled(TopAppBar)<TopAppBarProps &
  React.HTMLProps<HTMLDivElement>>`
  border-bottom: 1px solid #e0e0e0;
  background-color: white;
`;

const StyledAppBarTitle = styled(TopAppBarTitle)`
  font-weight: 600;
  padding-left: 10px;
  margin-right: 30px;
  color: #5f6368;
`;

const AppBarButton = styled(IconButton)<IconButtonHTMLProps & IconButtonProps>`
  color: #5f6368;
`;

const InfoButton = styled(AppBarButton)`
  margin-right: 30px;
`;
