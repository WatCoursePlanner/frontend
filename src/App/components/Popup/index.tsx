import React from "react";
import styled from "styled-components";

const PopupContainer = styled.div`
       padding: 1.5rem; 
       width: 20rem;
    `

const PopupTitle = styled.h4`
        margin: 0;
    `

type PopupProps = {
    title: string,
    message?: string,
    children?: React.ReactNode
}

const Popup = ({title, message, children}: PopupProps) => {
  return (
    <PopupContainer>
      <PopupTitle>{title}</PopupTitle>
      <p>{message}</p>
      {children}
    </PopupContainer>
  )
}

export default Popup
