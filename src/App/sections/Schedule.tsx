import React, {useState} from 'react'
import {Button, ButtonHTMLProps, ButtonProps} from "@rmwc/button";
import styled from "styled-components";
import '@rmwc/button/styles';

const ShortListButton = styled(Button)<ButtonProps & ButtonHTMLProps>`
  height: 54px !important;
  width: 54px !important;
  margin-left: auto !important;
  padding-left: 24px !important;
  border-radius: 100px 0 0 100px !important;
  background-color: #e3f2fd !important;
  color: #2196F3 !important;
  & div {
    border-radius: 100px 0 0 100px !important;
  }
  & i {
    width: 24px !important;
    height: 24px !important;
    font-size: 24px !important;
    padding: 0 !important;
    margin: 0 !important;
  }
`

const OuterContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: row;
`

const ScheduleContainer = styled.div`
    display: flex;
    flex-grow: 1;
    align-items: center;
`

const ShortListContainer = styled.div<{open: boolean}>`
    display: flex;
    width: ${props => props.open ? '320px' : 0};
    transition: 0.3s;
    border-left: 1px solid #e0e0e0;
`

const Schedule = () => {

  const [shortlistOpen, setShortlistOpen] = useState(false)

  return (
    <OuterContainer>
      <ScheduleContainer>
        <ShortListButton
          unelevated
          onMouseDown={(e) => {
            e.preventDefault()
          }}
          onClick={() => setShortlistOpen(!shortlistOpen)}
          icon={shortlistOpen ? "keyboard_arrow_right" : "shopping_cart"}/>
      </ScheduleContainer>
      <ShortListContainer open={shortlistOpen}>
      </ShortListContainer>
    </OuterContainer>
  )
}

export default Schedule
