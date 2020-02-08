import { createGlobalStyle } from 'styled-components';
import normalize from './vendor/normalize';
import { colours, spacing, font, breakpoint } from './theme';

// TODO: utilise styled-componentns themes
const GlobalStyle = createGlobalStyle`
  ${normalize}
  ::selection {
    color: ${colours.lightest};
    background-color: ${colours.primary};
  }

  *, *:before, *:after {
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  html {
    box-sizing: border-box;
    width: 100%;
    /* TODO: Don't force a font size when using REM units. */
    font-size: ${font.size}px;
  }

  body {
    font-family: ${font.body};
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: .045rem;
    min-height: 100vh;
  @media (max-width: ${breakpoint.mobile}) {
      font-size: .9rem;
    }
  }

  main {
    grid-area: content;
  }

  footer {
    align-items: flex-end;
    color: ${colours.primary};
    display: flex;
    grid-area: footer;
    justify-content: center;
    padding: 10px 20px;
    font-size: 0.8rem;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${font.heading};
    letter-spacing: 0.15rem;
    margin: 0 0 1rem 0;
    line-height: 1;
    font-weight: 600;
  }

  h1 {
    font-size: 2.7rem;
  }

  h2 {
    font-size: 2.4rem;
  }

  h3 {
    font-size: 2.1rem;
  }

  h4 {
    font-size: 1.8rem;
  }

  h5 {
    font-size: 1.4rem;
  }

  h6 {
    font-size: 1.1rem;
  }

  p {
    margin: 0 0 ${spacing.medium};
    line-height: 1.6;
  }

  a {
    color: ${colours.accent};
    display: inline-block;
    transition: all .4s ease;
    text-decoration-color: ${colours.light};
    text-decoration-thickness: 2px;
    text-underline-offset: 3px;
    &:hover,
    &:active,
    &:focus {
      color: ${colours.light};
      background: ${colours.accent};
      text-decoration-color: ${colours.accent};
      border-radius: 2px;
    }
    &:focus {
      outline: 1px solid;
      outline-offset: 5px;
    }
  }

  input, textarea {
    padding: ${spacing.small} ${spacing.medium};
    line-height: normal;
    background-color: ${colours.light};
    box-shadow: none;
  }

  button {
    display: inline-block;
    text-transform: uppercase;
    letter-spacing: .1rem;
    background: none;
    border: 1px solid;
    text-decoration: none;
    padding: ${spacing.small} ${spacing.large};
    cursor: pointer;
    transition: all .2s ease-in;
    font-family: ${font.heading};
    text-align: center;
  }
`;

export default GlobalStyle;
