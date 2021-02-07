import React from "react";
import styled from "styled-components";

interface IPopupProps {
  title: string,
  message?: string,
  children?: React.ReactNode
}

export const Popup = ({
  title,
  message,
  children,
}: IPopupProps) => {
  return (
    <PopupContainer>
      <PopupTitle>{title}</PopupTitle>
      <p>{message}</p>
      {children}
    </PopupContainer>
  );
};

const PopupContainer = styled.div`
  padding: 1.5rem;
  width: 20rem;
`;

const PopupTitle = styled.h4`
  margin: 0;
`;
