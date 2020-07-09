import React from "react";
import styled from "styled-components";

const PopupContainer = styled.div`
       padding: 1.5rem; 
       width: 20rem;
    `

const PopupTitle = styled.h4`
        margin: 0;
    `

const Popup = (props) => {
  return (
    <PopupContainer>
      <PopupTitle>{props.title}</PopupTitle>
      <p>{props.message}</p>
      {props.children}
    </PopupContainer>
  )
}

export default Popup
