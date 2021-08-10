import React, { Fragment } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lottie from 'react-lottie'
import animationData from '../animationDatas/ball-loader.json';

const pageVariants = {
    initial: {
        x: "-5%",
        scale: 0.5,
        opacity: 0.7,
        rotate: '510deg'


    },
    out: {

        x: '100%',
        scale: 0.5,
        opacity: 0,
        rotate: '50deg'

    },
    in: {
        x: '10%',
        scale: 1,
        opacity: 1,
        rotate: '0deg'


    }
}

const pageTransition = {
    type: 'spring',
    mass: 2.5,
    damping: 30,
    stiffness: 500
    
}


interface Props {
    repost?: any,
    heart?: any,
    global?: any,
    loading: boolean
}
  
const BallLoader: React.FC<Props> = ({repost, heart, global, loading}) => {
    let _lottieHeartRef;
    
    const onRefLottie = (ref: any) => {
        _lottieHeartRef = ref;
    } 

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <Fragment>
                
                <AnimatePresence>

                    {loading &&(
                        <motion.div
                            initial="initial"
                            animate="in"
                            style={{overflow: "hidden"}}
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition} 
                            className={`inpage-loader--ball ${repost ? "inpage-loader--ball--reposts" : ''} ${heart ? "inpage-loader--ball--heart" : ''} ${global ? "inpage-loader--ball--global" : ''}`}
                        > 
                                <Lottie
                                        
                                        ref={onRefLottie}
                                        options={defaultOptions}
                                        height={100}
                                        width={100}
                                        isClickToPauseDisabled={true}
                                        speed={1.34}
                                    />
                        </motion.div>
                    )}
                                
                </AnimatePresence>
                

            </Fragment>
    )
}


export default React.memo(BallLoader);
