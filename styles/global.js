import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Public Sans';
    src: url('/static/fonts/PublicSans-Regular.woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Public Sans Bold';
    src: url('/static/fonts/PublicSans-Bold.woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Public Sans BoldItalic';
    src: url('/static/fonts/PublicSans-BoldItalic.woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Public Sans Italic';
    src: url('/static/fonts/PublicSans-Italic.woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Public Sans Light';
    src: url('/static/fonts/PublicSans-Light.woff');
    font-weight: normal;
    font-style: normal;
  }

  body {
    margin: 0;
  }

  * {
    box-sizing: border-box;
    font-family: 'Public Sans';
  }
`
