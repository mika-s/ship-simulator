import { createStore, combineReducers } from 'redux';

const simulationTimeReducer = (state = [], action) => {
  console.log('simulationTimeReducer was called with state', state, 'and action', action);

  switch (action.type) {
    case 'INCREMENT':
      return [
        ...state,
        action.item,
      ];
    default:
      return state;
  }
};

const reducer = combineReducers({ items: simulationTimeReducer });
const store = createStore(reducer);

export default store;
