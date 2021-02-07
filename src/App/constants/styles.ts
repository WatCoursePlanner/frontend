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
