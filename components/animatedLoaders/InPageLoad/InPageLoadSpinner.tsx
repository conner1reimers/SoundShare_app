import React, { Fragment } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lottie from 'react-lottie'
import animationData from '../animationDatas/music-loader.json';



const pageVariants = {
    initial: {
        y: "-5%",
        scale: 0.5,
        opacity: 1


    },
    out: {

        y: 0,
        scale: 0,
        opacity: 0

    },
    in: {
        y: 0,
        scale: 1,
        opacity: 1


    }
}

const pageTransition = {
    type: 'spring',
    mass: 1.5,
    damping: 100,
    stiffness: 200
    
}


interface Props {

    loading: boolean
}

const InPageLoadSpinner: React.FC<Props> = ({loading}) => {
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
                            className="inpage-loader"
                        > 
                                <Lottie
                                        ref={onRefLottie}
                                        options={defaultOptions}
                                        height={150}
                                        width={150}
                                        isClickToPauseDisabled={true}
                                        speed={1.34}
                                    />
                        </motion.div>
                    )}
                                
                </AnimatePresence>
                

            </Fragment>
    )
}

export default InPageLoadSpinner
