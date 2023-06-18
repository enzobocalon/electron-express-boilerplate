import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html, body {
    min-height: 100vh;
    width: 100%;
    background-color: #1B1D21;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    color: white;
  }
`;