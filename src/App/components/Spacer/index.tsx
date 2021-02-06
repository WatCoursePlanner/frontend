import React from "react";
import styled from "styled-components";

export type ISpacerProps = {
  minWidth: string,
  minHeight: string
}

export const Spacer = ({minWidth, minHeight}: ISpacerProps) => {
  return (
    <SizedBox minWidth={minWidth} minHeight={minHeight}/>
  );
};

const SizedBox = styled.div<ISpacerProps>`
  min-width: ${props => props.minWidth};
  min-height: ${props => props.minHeight};
`;
