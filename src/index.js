import React from "react";
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import './index.css';
import App from './App';
import { Overlay } from './components/Overlay';

ReactDOM.render(
  <Provider store={store}>
    <App /> <Overlay />
  </Provider>,
  document.getElementById('root')
)