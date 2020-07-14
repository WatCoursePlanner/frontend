import thunk from "redux-thunk";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "./reducers";
import {composeWithDevTools} from "redux-devtools-extension";

const middleware = [thunk];

// const store = createStore(rootReducer, applyMiddleware(...middleware))
export const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(...middleware),
));
