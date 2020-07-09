import Paper from "@material-ui/core/Paper";
import React, {useRef} from "react";
import styled from "styled-components";
import InputBase from "@material-ui/core/InputBase";
import {IconButton} from "@rmwc/icon-button";

import '@rmwc/icon-button/styles';
import '@rmwc/textfield/styles';

const StyledInputBase = styled(InputBase)`
      margin-left: 16px;
      flex: 1;
    `

const AppBarButton = styled(IconButton)`
        color: #5f6368;
    `

const useFocus = () => {
  const htmlElRef = useRef(null)
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus()
  }
  return [htmlElRef, setFocus]
}

const SearchBar = (props) => {
  const [inputRef, setInputFocus] = useFocus()
  return (
    <Paper className={'search-bar'} elevation={0}>
      <AppBarButton icon={'search'}/>
      <StyledInputBase
        inputProps={{'ref': inputRef}}
        placeholder="Search for Programs or Courses"
        value={props.searchText}
        onChange={(e) => props.setSearchText(e.target.value)}
      />
      <AppBarButton
        className={props.searchText === '' ? 'hidden' : ''}
        icon={'close'}
        onClick={() => {
          props.setSearchText('')
          setInputFocus()
        }}/>
    </Paper>
  )
}
export default SearchBar
