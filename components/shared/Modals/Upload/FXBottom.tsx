import React, { Fragment } from 'react'
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressBar from '../../../globalSoundControls/ProgressBar';
import { useSelector } from 'react-redux';
import Media from 'react-media';
import PlayPauseBtns from '../../../common_reusable/playPauseBtn/PlayPauseBtns';

const bottomVariants = {
    initial: {
        x: '28%',
        y: '128%',
        opacity: 0.9,
        scale: 0.9
    },
    out: {
        x: '285%',
        y: '100%',
        opacity: 0,
        scale: 0
    },
    in: {

        x: '0%',
        y: '0%',
        opacity: 1,
        scale: 1
    }
}

const bottomTransition = {
    type: 'spring',
    mass: .1,
    damping: 80,
    stiffness: 200,
    
}


  


const BottomWindow: React.FC = () => { 
    const fxOpen = useSelector((state: any) => state.upload.fxState.fxpageOpen);
    const gpuTier = useSelector((state: any) => state.ui.gpuTier);

    return ReactDOM.createPortal(
    <AnimatePresence exitBeforeEnter>
        <Media queries={{
              small: "(max-width: 1099px)",
              big: "(min-width: 1100px)"
              }}>
                  
            {matches => ( <Fragment>
        {fxOpen && gpuTier && 
        <motion.div
            className={`fx-bottomwindow ${gpuTier.isMobile ? 'fx-bottom-mobile' : ''}`}
            initial="initial"
            animate="in"
            exit="out"
            variants={bottomVariants}
            transition={bottomTransition}
        >

        <div className="fx-bottomwindow--original">
            <span>Compare with original sound</span>
        </div>
            
        <div className="fx-bottomwindow--compare">
            <div>
                <PlayPauseBtns global fxglobe/>
            </div>
        </div>

        <div className="uploadmodal-big--fxpage--box--player fx-bottomwindow--player">
            {/* <button onClick={trigger} className="btn nohover uploadmodal-big--fxpage--box--player--btn">Play</button>
            <button onClick={pauseFxPlaying} className="btn nohover uploadmodal-big--fxpage--box--player--btn">Pause</button>

            <button onClick={() => setReload(true)} className="btn nohover uploadmodal-big--fxpage--box--player--btn">Relaod FX</button> */}

            
            <ProgressBar small2={matches.small} fx open playing={true}/>
        </div>
        
        <div className="bottom--tobar">
            <div className="length-to-fxbar"></div>
            <div className="length-to-end-fx"></div>
        </div>
        </motion.div>}

        </Fragment>)}
        </Media>
    </AnimatePresence>,document.getElementById('fx-bottom-hook') as HTMLElement)
};
export default React.memo(BottomWindow);
