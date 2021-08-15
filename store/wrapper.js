import {createStore, applyMiddleware} from 'redux';
import {createWrapper} from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import { allReducers } from './reducers';
import rootSaga from '../saga/saga';
import { composeWithDevTools } from "redux-devtools-extension";

export const makeStore = (context) => {
    // 1: Create the middleware
    const sagaMiddleware = createSagaMiddleware();
    const composeEnhancers = composeWithDevTools({trace: true});


    // 2: Add an extra parameter for applying middleware:+
    let store;

    if (process.env.NODE_ENV == "development") {
        store = createStore(allReducers, composeEnhancers(
          applyMiddleware(sagaMiddleware)
        ));
        
      } else {
        store = createStore(allReducers, applyMiddleware(sagaMiddleware));
      }

    // 3: Run your sagas on server
    store.sagaTask = sagaMiddleware.run(rootSaga);

    // 4: now return the store:
    return store;
};

export const wrapper = createWrapper(makeStore, {debug: true});