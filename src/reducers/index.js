import { combineReducers } from 'redux';

import * as password from './password';
import * as logs from './logs';

const doneSuffix = '_FULFILLED';
const errorSuffix = '_REJECTED';

function getReducer(actions, initialState) {
  const stateChangers = Object.entries(actions).reduce((obj, [actionName, [f1, f2, f3]]) => {
    obj[actionName] = f1;
    obj[actionName + errorSuffix] = f2;
    obj[actionName + doneSuffix] = f3;
    return obj;
  }, {});

  return (state=initialState, action) => stateChangers[action.type] ? stateChangers[action.type](state, action.payload) : state;
}

const reducers = [password, logs].reduce((obj, { initialState, actions, name }) => {
  obj[name] = getReducer(actions, initialState);
  return obj;
}, {});

export default combineReducers(reducers);
