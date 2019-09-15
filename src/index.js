import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import { root } from './state/reducers'

const store = createStore( root, applyMiddleware( thunkMiddleware ) );

ReactDOM.render(
  <Provider store = {store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
