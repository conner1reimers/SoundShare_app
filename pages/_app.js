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




const MyApp = ({ Component, pageProps}) => {


    return (
        <> 
        <Head>
          <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,shrink-to-fit=no"/>
          <meta name="theme-color" content="#000000" />
          <meta
            name="description"
            content="Share and Download sounds, sound effects, loops, stock audio and more with other creators, all for free, check our terms of use for information about copyright. Download new sounds, loops, and effects for your music, movies, games and more. Add effects to any sound quick and easy through SoundShare!"
          />
        </Head>

          

            <div className="root-app-container">
              <MainHead/>
              <Component {...pageProps} />
              <GlobalSound/>
            </div>

         
        </>
    )
  
}


export default wrapper.withRedux(MyApp)
