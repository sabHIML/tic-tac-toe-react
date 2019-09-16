import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './views/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { configureStore } from './state/store';

import { gameOperations } from './state/reducers/reducers';

const initialState = null;
const store = configureStore(initialState || {});

if (!initialState) {

  const newGame = gameOperations.newGame();

  store.dispatch(newGame);
}


ReactDOM.render(
  <Provider store = {store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
