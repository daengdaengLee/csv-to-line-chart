import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import MainPage from './components/5-pages/main-page';
import store from './ducks';
import * as serviceWorker from './serviceWorker';

const GlobalStyle = createGlobalStyle`
  ${reset}
  html, body, #root {
    height: 100%;
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <Fragment>
      <MainPage />
      <GlobalStyle />
    </Fragment>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
