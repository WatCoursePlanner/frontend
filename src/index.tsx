import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import App from './App/App';
import { store } from "./App/redux/store";
import './index.scss';
import initializeApp from "./initializeApp";

(async function main() {
  await initializeApp();
  store.then((_store) =>
    (ReactDOM.render(
      <Provider store={_store}><App/></Provider>,
      document.getElementById('root')
    )));
})();
