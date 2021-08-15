import React, { Fragment } from 'react'
import GlobalMsg from './GlobalMsg';
import Media from 'react-media';
import SideContain from './shared/SideDrawer/SideContain'
import TopNav from './shared/SideDrawer/TopNav'
import withRedux, { createWrapper } from "next-redux-wrapper";
import { Provider, useDispatch, useSelector } from 'react-redux'
import { useRouter, withRouter } from 'next/router'
import Header from '../components/Header';
import { useCallback, useEffect } from "react";
import { getGPUTier } from "detect-gpu";
import GlobalSound from '../components/shared/Modals/GlobalSound';
import * as ga from '../lib/ga'
import { useGlobalMsg } from "../util/hooks/useGlobalMsg";


const MainHead = () => {
  const dispatch = useDispatch();
  const router = useRouter();
	const gpuTierState = useSelector((state) => state.ui.gpuTier);
	const aModalIsOpen = useSelector(state => state.globalMsg.aModalIsOpen);
  
	const getGpu = useCallback(async () => {
    window.scrollTo(0, 0);
		dispatch({ type: "CHECK_COOKIE" });
    
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


    useEffect(() => {
      const handleRouteChange = (url) => {
        ga.pageview(url)
      }
      //When the component is mounted, subscribe to router changes
      //and log those page views
      router.events.on('routeChangeComplete', handleRouteChange)
  
      // If the component is unmounted, unsubscribe
      // from the event with the `off` method
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange)
      }
    }, [router.events])
    
    return (
        <Fragment>
      <GlobalMsg/>
            
            <Media
              queries={{
                small: "(max-width: 1099px)",
                big: "(min-width: 1100px)",
              }}
            >
              {(matches) => (
                <Fragment>
                  {matches.small && (<SideContain/>)}

                  {matches.big && <TopNav />}

                  {/* <Analytics/> */}
                </Fragment>
              )}
            </Media>
      </Fragment>
    )
}

export default MainHead
