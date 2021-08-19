import styled, { css } from "styled-components";

export interface IFlexProps {
  flex?: number;
  align?: string;
  justify?: string;
}

export const Flex = styled.div<IFlexProps>`
  display: flex;
  ${(props) => (props.flex ? `flex: ${props.flex};` : null)}
  ${(props) => (props.align ? `align-items: ${props.align};` : null)}
  ${(props) => (props.justify ? `justify-content: ${props.justify};` : null)}
`;

export const Column = styled(Flex)`
  flex-direction: column;
`;

export const Row = styled(Flex)``;

interface ILineProps {
  margin?: string;
  stroke?: string;
  color?: string;
}

export const HorizontalLine = styled.hr<ILineProps & { width?: string }>`
  width: ${(props) => props.width || "100%"};
  border: 0;
  margin: ${(props) => props.margin || "0"};
  ${(props) => {
    if (props.stroke) {
      return css`
        height: ${props.stroke};
        max-height: ${props.stroke};
        min-height: ${props.stroke};
      `;
    }

    return css`
      height: 1px;
      max-height: 1px;
      min-height: 1px;
    `;
  }};
  opacity: .12;
  background: ${(props) => props.color ?? "#000000"};
`;

export const VerticalLine = styled.div<ILineProps & { height?: string }>`
  height: ${(props) => props.height ?? "100%"};
  margin: ${(props) => props.margin ?? "0"};
  ${(props) => {
    return css`
      width: ${props.stroke ?? "1px"};
    `;
  }};
  opacity: .12;
  background: ${(props) => props.color ?? "#000000"};
`;
