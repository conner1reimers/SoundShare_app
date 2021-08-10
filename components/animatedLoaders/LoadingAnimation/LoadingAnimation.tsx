import React, { Fragment } from 'react'
import Lottie from 'react-lottie';
import animationData from '../animationDatas/blue-red-loader.json';
import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import BackdropMain from '../../../shared/Modals/BackdropMain';


const pageVariants = {
    initial: {
        y: "-15%",
        scale: 0.5,
        rotate: 3,
        opacity: 1


    },
    out: {

        y: 0,
        scale: 0,
        rotate: 3,

        opacity: 0

    },
    in: {
        y: 0,
        scale: 1,
        rotate: 360,
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
const LoadingAnimation: React.FC<Props> = ({ loading }) => {
    let _lottieHeartRef;
    
    const onRefLottie = (ref: any) => {
        _lottieHeartRef = ref;
    }
    const inputTag = document.getElementById('loading-hook') as HTMLElement;


    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    


    return ReactDOM.createPortal(
        <Fragment>
                
            <AnimatePresence>

                {loading && (
                    <motion.div
                        initial="initial"
                        animate="in"
                        style={{ overflow: "hidden" }}
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}
                        className="loading"
                    >
                        <Lottie
                            ref={onRefLottie}
                            options={defaultOptions}
                            height={450}
                            width={450}
                            style={{ overflow: 'visible' }}
                            isClickToPauseDisabled={true}
                            speed={0.34}
                        />
                    </motion.div>)}
                                
            </AnimatePresence>
            {loading && <BackdropMain />}

        </Fragment>, inputTag);
    
}

// ONE WAY TO FREEZE LAST FRAME IN ANIMATION 

// var container = document.getElementById("logo"),
//         anim = lottie.loadAnimation({
//         container: container,
//         renderer: "svg",
//         loop: false,
//         autoplay: true,
//         path: "static/logo.08.json"
// });

// anim.addEventListener("enterFrame", function (animation) {
//      if (animation.currentTime > (anim.totalFrames - 1)) {
//         anim.pause();
//      }
// });

export default LoadingAnimation;