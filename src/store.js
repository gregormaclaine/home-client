import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from 'redux-logger';

import reducer from "./reducers";

const middlewares = [];

middlewares.push(thunk);

if (process.env.NODE_ENV === 'development') middlewares.push(createLogger({ collapsed: true }));

const store = createStore(reducer, compose(applyMiddleware(...middlewares)));

export default store;
