import "@rmwc/avatar/styles";
import "@rmwc/badge/styles";
import "@rmwc/button/styles";
import "@rmwc/card/styles";
import "@rmwc/chip/styles";
import "@rmwc/circular-progress/styles";
import "@rmwc/dialog/styles";
import "@rmwc/drawer/styles";
import "@rmwc/fab/styles";
import "@rmwc/icon-button/styles";
import "@rmwc/list/styles";
import "@rmwc/menu/styles";
import "@rmwc/ripple/styles";
import "@rmwc/textfield/styles";
import "@rmwc/theme/styles";
import "@rmwc/tooltip/styles";
import "@rmwc/top-app-bar/styles";
import "material-components-web/dist/material-components-web.min.css";
import { css } from "styled-components";

export const cleanScrollBar = css`
  scrollbar-color: #dadce0 transparent;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    min-height: 40px;
    background: #dadce0;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #bdc1c6;
  }
`;

export const cleanScrollBarWithWhiteBorder = css`
  ${cleanScrollBar}
  ::-webkit-scrollbar {
    width: 16px;
  }

  ::-webkit-scrollbar-thumb {
    border: 4px solid white;
  }
`;

export const unSelectable = css`
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
`;