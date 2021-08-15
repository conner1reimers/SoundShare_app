import "../styles/base.scss";
import withRedux, { createWrapper } from "next-redux-wrapper";
import { Provider, useDispatch, useSelector } from 'react-redux'
import { useRouter, withRouter } from 'next/router'
import App from 'next/app'
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import { allReducers } from '../store/reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga/saga';
import Header from '../components/Header';
import Head from 'next/head'
import { useCallback, useEffect } from "react";
import { getGPUTier } from "detect-gpu";
import MainHead from "../components/MainHead";
import GlobalSound from '../components/shared/Modals/GlobalSound';
import * as ga from '../lib/ga'
import { useGlobalMsg } from "../util/hooks/useGlobalMsg";
import React from 'react';
import {END} from 'redux-saga';
import {makeStore, wrapper} from '../store/wrapper';



// const sagaMiddleware = createSagaMiddleware();
// const composeEnhancers = composeWithDevTools({trace: true});

// let store;

// if (process.env.NODE_ENV == "development") {
//   store = createStore(allReducers, composeEnhancers(
//     applyMiddleware(sagaMiddleware), 
//   ));
  
// } else {
//   store = createStore(allReducers, applyMiddleware(sagaMiddleware));
// }

// sagaMiddleware.run(rootSaga);



const MyApp = ({ Component, pageProps}) => {


    return (
        <> 
        <Head>
          <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,shrink-to-fit=no"/>
        </Head>

          

            <div className="root-app-container">
              <MainHead/>
              <Component {...pageProps} />
              <GlobalSound/>
            </div>

         
        </>
    )
  
}

// MyApp.getInitialProps = wrapper.getInitialAppProps ((store) => async ({Component, ctx}) => {
//   // 1. Wait for all page actions to dispatch
//   const pageProps = {
//       ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
//   };


//   // 2. Stop the saga if on server
//   if (ctx.req) {
//       store.dispatch(END);
//       await store.sagaTask.toPromise();
//   }

//   // 3. Return props
//   return {
//       pageProps,
//   };
// })


// class WrappedApp extends App {
//    static getInitialProps = async ({Component, ctx}) => {
//       // 1. Wait for all page actions to dispatch
//       const pageProps = {
//           ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
//       };

//       // 2. Stop the saga if on server
//       if (ctx.req) {
//           ctx.store.dispatch(END);
//           await (ctx.store).sagaTask.toPromise();
//       }

//       // 3. Return props
//       return {
//           pageProps,
//       };
//   };

//    render() {
//       const {Component, pageProps} = this.props;
//       return (
//         <> 
//         <Head>
//           <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,shrink-to-fit=no"/>
//         </Head>

//           <Provider store={store}>

//             <div className="root-app-container">
//               <MainHead/>
//               <Component {...pageProps} />
//               <GlobalSound/>
//             </div>

//           </Provider>
//         </>);
//   }
// }


// const makestore = () => store;
// export const wrapper = createWrapper(makestore);



export default wrapper.withRedux(MyApp)
