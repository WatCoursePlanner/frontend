import { Tooltip } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import { AutocompleteRenderInputParams } from "@material-ui/lab";
import {
  IconButton,
  IconButtonHTMLProps,
  IconButtonProps
} from "@rmwc/icon-button";
import { observer } from "mobx-react";
import React from "react";
import { If, Then } from "react-if";
import styled from "styled-components";

export interface ISearchBarProps {
  autoCompleteRenderProps?: AutocompleteRenderInputParams,
  searchText: string,
  setSearchText: ((text: string) => void),
  onSearch: ((query: string) => void),
}

@observer
export class SearchBar extends React.Component<ISearchBarProps> {
  render() {
    const {
      autoCompleteRenderProps,
      searchText,
      setSearchText,
      onSearch
    } = this.props;
    return (
      <StyledSearchBar
        ref={autoCompleteRenderProps?.InputProps.ref} elevation={0}>
        <Tooltip title={'Search'}>
          <AppBarButton icon={'search'} onClick={() => onSearch(searchText)}/>
        </Tooltip>
        <StyledInputBase
          inputProps={autoCompleteRenderProps?.inputProps ?? {}}
          placeholder="Search for Courses"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearch(searchText);
            }
          }}
        />
        <If condition={searchText !== ''}>
          <Then>
            <Tooltip
              title={'Clear'}>
              <AppBarButton
                icon={'close'}
                onClick={() => {
                  setSearchText('');
                  onSearch('');
                }}/>
            </Tooltip>
          </Then>
        </If>
      </StyledSearchBar>
    );
  }
}

const StyledInputBase = styled(InputBase)`
  margin-left: 16px;
  flex: 1;
`;

const AppBarButton = styled(IconButton)<IconButtonHTMLProps & IconButtonProps>`
  color: #5f6368;
`;

const StyledSearchBar = styled(Paper)`
  margin: 0 30px 0 25px;
  padding: 0 4px;
  display: flex;
  align-items: center;
  width: 500px;
  box-shadow: none;
  background-color: rgb(241, 243, 244) !important;

  &:focus-within {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    background-color: white !important;
  }
`;
