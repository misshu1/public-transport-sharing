import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import bg from 'assets/images/bg.svg';

export const GlobalStyle = createGlobalStyle`
${normalize}

* {
    box-sizing: border-box;
}

html {
    height: 100%;
    font-size: 16px;
}

body {
    font-family: 'Roboto', sans-serif;
    height: 100%;
    width: 100%;
    color: #1A1A1A;
    background: url(${bg});
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}

#root {
    height: 100%;
    width: 100%;
}

p {
    font-size: 14px;
    margin: 0;
}
`;
