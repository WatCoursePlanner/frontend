import React from "react";
import styled from "styled-components";

const SizedBox = styled.div<SpacerProps>`
  min-width: ${props => props.minWidth};
  min-height: ${props => props.minHeight};
`

export type SpacerProps = {
    minWidth: string,
    minHeight: string
}

const Spacer = ({minWidth, minHeight}: SpacerProps) => {
    return (
        <SizedBox minWidth={minWidth} minHeight={minHeight}/>
    )
}

export default Spacer
