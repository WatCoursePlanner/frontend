import Paper from "@material-ui/core/Paper";
import React, {useRef} from "react";
import styled from "styled-components";
import InputBase from "@material-ui/core/InputBase";
import {IconButton, IconButtonHTMLProps, IconButtonProps} from "@rmwc/icon-button";

import '@rmwc/icon-button/styles';
import '@rmwc/textfield/styles';

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

const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {
        // @ts-ignore
        htmlElRef.current && htmlElRef.current.focus()
    }
    return [htmlElRef, setFocus]
}

type SearchBarProps = {
    searchText: string,
    setSearchText: ((text: string) => void),
}

const SearchBar = ({searchText, setSearchText}: SearchBarProps) => {
    const [inputRef, setInputFocus] = useFocus()
    return (
        <StyledSearchBar elevation={0}>
            <AppBarButton icon={'search'}/>
            <StyledInputBase
                inputProps={{'ref': inputRef}}
                placeholder="Search for Programs or Courses"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <AppBarButton
                className={searchText === '' ? 'hidden' : ''}
                icon={'close'}
                onClick={() => {
                    setSearchText('')
                    // @ts-ignore
                    setInputFocus()
                }}/>
    </StyledSearchBar>
  )
}
export default SearchBar
