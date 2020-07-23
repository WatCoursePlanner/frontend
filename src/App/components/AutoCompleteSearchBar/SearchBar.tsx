import React, {useRef} from "react";
import styled from "styled-components";
import InputBase from "@material-ui/core/InputBase";
import {IconButton, IconButtonHTMLProps, IconButtonProps} from "@rmwc/icon-button";
import Paper from "@material-ui/core/Paper";
import {AutocompleteRenderInputParams} from "@material-ui/lab";

const StyledInputBase = styled(InputBase)`
      margin-left: 16px;
      flex: 1;
`

const AppBarButton = styled(IconButton)<IconButtonHTMLProps & IconButtonProps>`
      color: #5f6368;
`

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
`

export type SearchBarProps = {
    autoCompleteRenderProps?: AutocompleteRenderInputParams,
    searchText: string,
    setSearchText: ((text: string) => void),
    searchCallback: (() => void),
}

const SearchBar = ({autoCompleteRenderProps, searchText, setSearchText, searchCallback}: SearchBarProps) => {
    return (
        <StyledSearchBar
            ref={autoCompleteRenderProps?.InputProps.ref} elevation={0}>
            <AppBarButton icon={'search'} onClick={searchCallback}/>
            <StyledInputBase
                inputProps={Object.assign({}, autoCompleteRenderProps?.inputProps)}
                placeholder="Search for Courses"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        searchCallback()
                    }
                }}
            />
            <AppBarButton
                className={searchText === '' ? 'hidden' : ''}
                icon={'close'}
                onClick={() => {
                    setSearchText('')
                }}/>
        </StyledSearchBar>
    )
}

export default SearchBar
