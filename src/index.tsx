import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk';
import rootReducer from './App/duck/reducers'
import App from './App/App';
import './index.scss';
import {composeWithDevTools} from "redux-devtools-extension";

const middleware = [thunk];

// const store = createStore(rootReducer, applyMiddleware(...middleware))

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(...middleware),
));

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
  document.getElementById('root')
);
