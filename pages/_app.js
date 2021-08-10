import "../styles/base.scss";
import withRedux, { createWrapper } from "next-redux-wrapper";
import { Provider } from 'react-redux'
import { withRouter } from 'next/router'
import App from 'next/app'
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import { allReducers } from '../store/reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga/saga';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({trace: true});

const store = createStore(allReducers, composeEnhancers(
  applyMiddleware(sagaMiddleware), 
));

sagaMiddleware.run(rootSaga);
const MyApp = ({ Component, pageProps}) => {
  
    // const { Component, pageProps, router, store } = this.props
    return (
          <Provider store={store}>
              <Component {...pageProps} />
          </Provider>
    )
  
}

const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp)
