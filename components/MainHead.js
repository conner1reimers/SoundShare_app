import React, { Fragment } from 'react'
import GlobalMsg from './GlobalMsg';
import SideContain from './shared/SideDrawer/SideContain'
import TopNav from './shared/SideDrawer/TopNav'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from "react";
import { getGPUTier } from "detect-gpu";
import * as ga from '../lib/ga'
import LoadingAnimation from './animatedLoaders/LoadingAnimation/LoadingAnimation';
import { Media, MediaContextProvider } from "../util/media";


const MainHead = () => {
  const dispatch = useDispatch();
  const router = useRouter();
	const gpuTierState = useSelector((state) => state.ui.gpuTier);
	const aModalIsOpen = useSelector(state => state.globalMsg.aModalIsOpen);
  const isLoading = useSelector(state => state.ui.mainLoader);
  const homeLoader = useSelector(state => state.ui.homeLoader);

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
    } catch (err) {}
    
  }, [dispatch]);
	
	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch({ type: "CHECK_COOKIE" });
		if (!gpuTierState) getGpu();

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
        ga.pageview(url);

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

        <LoadingAnimation loading={isLoading || homeLoader}/>
        <GlobalMsg/>
            
        <MediaContextProvider>
          
            <Fragment>
              <Media between={["xs", "sm"]}>
                <SideContain/>
              </Media>
              <Media greaterThanOrEqual="lg">
                <TopNav />
              </Media>
            </Fragment>
          
        </MediaContextProvider>

      </Fragment>
    )
}

export default React.memo(MainHead);
