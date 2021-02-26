import { Fade, Popper as MaterialPopper } from "@material-ui/core";
import { PopperProps } from "@material-ui/core/Popper/Popper";
import '@rmwc/chip/styles';
import { ThemeProvider as RMWCThemeProvider } from "@rmwc/theme";
import { RMWCTheme } from "@watcourses/constants/theme";
import React from "react";
import styled from "styled-components";

interface IPopperProps extends PopperProps {
  children: React.ReactElement,
}

export class Popper extends React.Component<IPopperProps> {
  render() {
    return (
      <StyledPopper
        {...this.props}
        transition
        modifiers={{
          flip: {
            enabled: true,
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: 'viewport',
          },
          offset: {
            enabled: true,
            offset: '0, 8',
          },
        }}>
        {({TransitionProps}) => (
          <Fade {...TransitionProps}>
            <RMWCThemeProvider options={RMWCTheme}>
              {this.props.children}
            </RMWCThemeProvider>
          </Fade>
        )}
      </StyledPopper>
    );
  }
}

const StyledPopper = styled(MaterialPopper)<PopperProps>`
  z-index: 9999;
  max-height: 80vh;
`;
