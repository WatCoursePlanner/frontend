import { unSelectable } from "@watcourses/constants/styles";
import React from "react";
import styled from "styled-components";

export type ISpacerProps = {
  width?: string | number;
  height?: string | number;
}

export const Spacer = ({width, height}: ISpacerProps) => {
  return (
    <SizedBox
      width={withPx(width)}
      height={withPx(height)}
    />
  );
};

const withPx = (value: string | number | undefined): string => {
  if (!value) {
    return "";
  }
  return typeof value === "number" ? `${value}px` : value;
};

const SizedBox = styled.div<ISpacerProps>`
  min-width: ${props => props.width};
  min-height: ${props => props.height};
  ${unSelectable};
`;
