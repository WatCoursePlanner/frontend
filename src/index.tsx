import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import App from './App/App';
import './index.scss';
import {store} from "./App/redux/store";

store.then((store) => (ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)))
