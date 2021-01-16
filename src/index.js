import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './Routes';
import Store from "./redux/Store"
import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css';

let store = Store()
ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
