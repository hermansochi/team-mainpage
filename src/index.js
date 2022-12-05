import React from "react";
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import './index.css';
import App from './App';
import { Overlay } from './components/Overlay';
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Overlay />
    </BrowserRouter>
  </Provider>,
  rootElement
);