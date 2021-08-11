import { useRouter } from 'next/router';
import React from 'react'
import { useEffect } from 'react'
import ReactGA from 'react-ga';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
ReactGA.initialize('UA-159042384-1');



const Analytics: React.FC = () => {
    const history = useRouter();
    const dispatch = useDispatch();
    const initialLoad = useSelector((state: RootStateOrAny) => state.ui.initialLoad);



    useEffect(() => {
		    history.listen((location) => {
            ReactGA.set({ page: location.pathname });
            ReactGA.pageview(location.pathname)
          }
        );

        if (!initialLoad) {
            dispatch({type: 'INIT_LOAD'})
            ReactGA.pageview(history.location.pathname);  
        }
        
    }, []);



    
    return null;
}

export default Analytics
