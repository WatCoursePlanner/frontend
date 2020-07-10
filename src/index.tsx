import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {createStore} from 'redux'
import rootReducer from './App/duck/reducers'
import App from './App/App';
import './index.scss';

const store = createStore(rootReducer)

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
  document.getElementById('root')
);
