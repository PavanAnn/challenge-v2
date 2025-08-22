import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html, body, #root {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  body {
    font-family: 'Inter', 'Roboto', sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f9f9f9;
    color: #222;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: 600;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul, ol {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  img, video {
    max-width: 100%;
    display: block;
  }

  input, button, textarea, select {
    font: inherit;
    border: none;
    outline: none;
    background: none;
  }

  button {
    cursor: pointer;
  }

  html {
    scroll-behavior: smooth;
  }
`;
