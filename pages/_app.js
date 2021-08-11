import "../styles/base.scss";
import withRedux, { createWrapper } from "next-redux-wrapper";
import { Provider, useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'next/router'
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

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({trace: true});

const store = createStore(allReducers, composeEnhancers(
  applyMiddleware(sagaMiddleware), 
));

sagaMiddleware.run(rootSaga);
const MyApp = ({ Component, pageProps}) => {
  const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const userId = useSelector((state) => state.user.userId);
	const gpuTierState = useSelector((state) => state.ui.gpuTier);
	const aModalIsOpen = useSelector(state => state.globalMsg.aModalIsOpen);

	const getGpu = useCallback(async () => {
    try  {
      const gpuTier = await getGPUTier({});
      dispatch({
        type: "GET_GPU_TIER",
        payload: {
          gpu: gpuTier.gpu,
          mobile: gpuTier.isMobile,
          tier: gpuTier.tier,
        },
      });
    } catch (err) {
      
    }
    
  }, [dispatch]);
	
	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch({ type: "CHECK_COOKIE" });

		if (!gpuTierState) {
			getGpu();
		}

	}, [gpuTierState, dispatch, getGpu]);

	useEffect(() => {
		if (aModalIsOpen) {
			document.body.style.overflow = 'hidden';
			document.body.style.position = 'fixed';
			document.body.style.height = '100vh';
			
		} else if (!aModalIsOpen) {
			document.body.style.overflowY = 'visible';
			document.body.style.overflowX = 'hidden';
			document.body.style.position = 'relative';
			document.body.style.height = '100%';

		}
	}, [aModalIsOpen]);
    // const { Component, pageProps, router, store } = this.props
    return (
        <> 
        <Head>
          <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,shrink-to-fit=no"/>
        </Head>
          <Provider store={store}>
            <div className="root-app-container">
              <MainHead/>
              <Component {...pageProps} />
            </div>
              
          </Provider>
        </>
    )
  
}

const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp)
