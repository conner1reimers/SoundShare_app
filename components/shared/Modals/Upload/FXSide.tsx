import ReactDOM from 'react-dom';
import React, { Fragment, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import distort from '../../../../util/img/distort.svg';
import menu from '../../../../util/img/menu.svg';
import moon from '../../../../util/img/phase.svg';
import gearshift from '../../../../util/img/gearshift.svg';
import reverb from '../../../../util/img/reverb.svg';
import chorus from '../../../../util/img/chorus.svg';
import berry from '../../../../util/img/berry.svg';
import filter from '../../../../util/img/filter.svg';
import pingpong from '../../../../util/img/pingpong.svg';
import { useSelector } from 'react-redux';
import Media from 'react-media';
import Image from 'next/image';


const sideVariants = {
    initial: {
        x: '100%',
        y: '28%',
        opacity: 0.9,
        scale: 0.9
    },
    out: {
        x: '100%',
        y: '20%',
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

const sideTransition = {
    type: 'spring',
    mass: .1,
    damping: 80,
    stiffness: 200,
    
}

const sideVariantsSmall = {
    initial: {
        x: '-100%',
        y: '0%',
        opacity: 0.79,
        scale: 1
    },
    out: {
        x: '-100%',
        y: '0%',
        opacity: 0.3,
        scale: 1
    },
    in: {

        x: '0%',
        y: '0%',
        opacity: 1,
        scale: 1
    }
}

interface Props {
    pageState: any,
    dispatchPage: any,
    open: any
}
  

const SideWindow: React.FC<Props> = ({pageState, dispatchPage, open}) => {
    const fxOpen = useSelector((state: any) => state.upload.fxState.fxpageOpen);
    const [sideOpen, setSideOpen] = useState(true);


    const closeSide = useCallback(() => {
        if (sideOpen) {
            setSideOpen(prev => !prev)
        }
    }, [sideOpen]);

    const openSide = useCallback(() => {
        if (!sideOpen) {
            setSideOpen(prev => !prev)
        }
    }, [sideOpen]);


    return ReactDOM.createPortal(
        <AnimatePresence exitBeforeEnter>
            <Media queries={{
              small: "(max-width: 1099px)",
              big: "(min-width: 1100px)"
            }}>
            {matches => (
            
                <Fragment>

                    {fxOpen && sideOpen && (
                    <motion.div
                        className="fx-sidewindow"
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={matches.big ? sideVariants : sideVariantsSmall}
                        transition={sideTransition}
                    >
                        {matches.small && (
                        <div className="outline-btn fx-side-small--closeside-contain">
                            <button className="btn nohover" onClick={closeSide}>
                                <span>Close</span>
                            </button>
                        </div>)}

                        <div className="uploadmodal-big--fxpage--box--fxList">
                        <ul className="uploadmodal-big--fxpage--box--fxList--list">
                            <li  className="uploadmodal-big--fxpage--box--fxList--item">
                                <button className={`btn nohover uploadmodal-big--fxpage--box--fxList--item--btn ${pageState.presetPage ? 'fxpage-active' : ''}`} onClick={() => dispatchPage({type: 'preset'})}><Image src={menu} alt=""/><span>Presets</span></button>
                                <button className={`btn nohover uploadmodal-big--fxpage--box--fxList--item--btn ${pageState.distortionPage ? 'fxpage-active' : ''}`} onClick={() => dispatchPage({type: 'dist'})}><Image src={distort} alt=""/><span>Distortion</span></button>
                                <button className={`btn nohover uploadmodal-big--fxpage--box--fxList--item--btn ${pageState.chorusPage ? 'fxpage-active' : ''}`} onClick={() => dispatchPage({type: 'chorus'})}><Image src={chorus} alt=""/><span>Chorus</span></button>
                                <button className={`btn nohover uploadmodal-big--fxpage--box--fxList--item--btn ${pageState.delayPage ? 'fxpage-active' : ''}`} onClick={() => dispatchPage({type: 'delay'})}><Image src={berry} alt=""/><span>Delay</span></button>
                                <button className={`btn nohover uploadmodal-big--fxpage--box--fxList--item--btn ${pageState.reverbPage ? 'fxpage-active' : ''}`} onClick={() => dispatchPage({type: 'reverb'})}><Image src={reverb} alt=""/><span>Reverb</span></button>
                                <button className={`btn nohover uploadmodal-big--fxpage--box--fxList--item--btn ${pageState.pingPong ? 'fxpage-active' : ''}`} onClick={() => dispatchPage({type: 'pingpong'})}><Image src={pingpong} alt=""/><span>Pingpong Delay</span></button>
                                <button className={`btn nohover uploadmodal-big--fxpage--box--fxList--item--btn ${pageState.pitchShift ? 'fxpage-active' : ''}`} onClick={() => dispatchPage({type: 'pitch'})}><Image src={gearshift} alt=""/><span>Pitch Shift</span></button>
                                {/* <button className={`btn nohover uploadmodal-big--fxpage--box--fxList--item--btn ${pageState.wahPage ? 'fxpage-active' : ''}`} onClick={() => dispatchPage({type: 'wah'})}><Image src={wave} alt=""/><span>Wah-Wah</span></button> */}
                                <button className={`btn nohover uploadmodal-big--fxpage--box--fxList--item--btn ${pageState.phaserPage ? 'fxpage-active' : ''}`} onClick={() => dispatchPage({type: 'phaser'})}><Image src={moon} alt=""/><span>Phaser</span></button>
                                <button className={`btn nohover uploadmodal-big--fxpage--box--fxList--item--btn ${pageState.filterPage ? 'fxpage-active' : ''}`} onClick={() => dispatchPage({type: 'filter'})}><Image src={filter} alt=""/><span>Filter</span></button>
                            </li>
                        </ul>
                    </div>

                    </motion.div>)}

                    {!sideOpen && matches.small && (
                    <div className="outline-btn fx-side-small--openside-contain">
                        <button className="btn nohover" onClick={openSide}>
                            <span>View FX Menu</span>
                        </button>
                    </div>)}
                </Fragment>)}
            </Media>
        </AnimatePresence>,document.getElementById('fx-sidewindow-hook') as HTMLElement)
}


export default React.memo(SideWindow);
