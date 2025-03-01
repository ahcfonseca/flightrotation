import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

html {
    box-sizing: border-box;
    font-size: 16px;
    width: 100%;
    overflow-x: hidden;
  }

  body {
    background-color: var(--background-color);
    margin: 0;
    font-family: var(--primary-font);
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    font-variation-settings: "slnt" 0;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

:root {
  --primary-font: "Inter", sans-serif;
  --secondary-font: "Anton", serif;
  --primary-color:rgb(48, 81, 156);
  --primary-color-light:rgb(41, 113, 214);
  --background-color: #1a202c;
  --background-color-light: #ede8e8;
  --border-color: #cecece;
  --text-color: #2e3440;
  --text-color-light: #888888;
  --white: #fff;
} 

  input, select {
    font-family: var(--primary-font);
  }
`;

export default GlobalStyles;
