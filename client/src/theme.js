import { createGlobalStyle } from "styled-components";

const nord = {
  nord0: "#2e3440",
  nord1: "#3b4252",
  nord2: "#434c5e",
  nord3: "#4c566a",
  nord4: "#d8dee9",
  nord5: "#e5e9f0",
  nord6: "#eceff4",
  nord7: "#8fbcbb",
  nord8: "#88c0d0",
  nord9: "#81a1c1",
  nord10: "#5e81ac",
  nord11: "#bf616a",
  nord12: "#d08770",
  nord13: "#ebcb8b",
  nord14: "#a3be8c",
  nord15: "#b48ead"
};

const theme = {
  palette: {
    primary: nord.nord1,
    primaryDarker: nord.nord1,
    ...nord
  }
};

export default theme;

export const GlobalStyle = createGlobalStyle`
  :root {
    --nord0: ${theme.palette.nord0};
    --nord1: ${theme.palette.nord1};
    --nord2: ${theme.palette.nord2};
    --nord3: ${theme.palette.nord3};
    --nord4: ${theme.palette.nord4};
    --nord5: ${theme.palette.nord5};
    --nord6: ${theme.palette.nord6};
    --nord7: ${theme.palette.nord7};
    --nord8: ${theme.palette.nord8};
    --nord9: ${theme.palette.nord9};
    --nord10: ${theme.palette.nord10};
    --nord11: ${theme.palette.nord11};
    --nord12: ${theme.palette.nord12};
    --nord13: ${theme.palette.nord13};
    --nord14: ${theme.palette.nord14};
    --nord15: ${theme.palette.nord15};

    --body-background: var(--nord5);
    --body-color: var(--nord0);
    --link-color: var(--nord1);
  }

  html, body {
    height: 100vh;
    overflow: hidden;
  }

  body {
    font-size: 14px;
    color: var(--body-color);
    background: var(--body-background);
  }

  a {
    color: var(--link-color);
  }
`;
