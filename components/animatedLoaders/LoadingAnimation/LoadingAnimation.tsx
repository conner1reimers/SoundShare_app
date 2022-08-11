import React, { Fragment } from 'react'
import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import loadable from '@loadable/component'

const LottieTest = loadable(() => import('../LottieTest'))
const BackdropMain = loadable(() => import('../../shared/Modals/BackdropMain'))



interface Props {

    loading: boolean
}
const LoadingAnimation: React.FC<Props> = ({ loading }) => {
    

    const final = typeof window != 'undefined' ? ReactDOM.createPortal(
        <Fragment>
                
            <AnimatePresence>
                {loading && (<LottieTest/>)}
            </AnimatePresence>
            
            {loading && <BackdropMain />}

        </Fragment>, document.getElementById('loading-hook') as HTMLElement) : null;
    


    return final;
    
}


export default LoadingAnimation;