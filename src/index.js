import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import App from './head/App';
import TippApp from './components/TippApp';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();
window.store = store;

render(
  <App />,
  document.getElementById('head')
);

render(
  <Provider store={store}>
    <TippApp/>
  </Provider>,
  document.getElementById('root')
);


