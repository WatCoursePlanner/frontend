import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import { App } from './App/App';
import { store } from "./App/redux/store";
import './index.scss';

(function main() {
  store.then((_store) =>
    (ReactDOM.render(
      <Provider store={_store}><App/></Provider>,
      document.getElementById('root')
    )))
})();
