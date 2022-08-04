import ReactDOM from 'react-dom';
import React, { Fragment, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import distort from '../../../../public/distort.svg';
import menu from '../../../../public/menu.svg';
import moon from '../../../../public/phase.svg';
import gearshift from '../../../../public/gearshift.svg';
import reverb from '../../../../public/reverb.svg';
import chorus from '../../../../public/chorus.svg';
import berry from '../../../../public/berry.svg';
import filter from '../../../../public/filter.svg';
import pingpong from '../../../../public/pingpong.svg';
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
                                <button className={`btn nohover uploadmodal-big--fxpage--box--fxList--item--btn ${pageState.presetPage ? 'fxpage-active' : ''}`} onClick={() => dispatchPage({type: 'preset'})}><Image height={50} width={50} src={menu} alt=""/><span className='fx-label'>Presets</span></button>
                                <button className={`btn nohover uploadmodal-big--fxpage--box--fxList--item--btn ${pageState.distortionPage ? 'fxpage-active' : ''}`} onClick={() => dispatchPage({type: 'dist'})}><Image height={50} width={50} src={distort} alt=""/><span className='fx-label'>Distortion</span></button>
                                <button className={`btn nohover uploadmodal-big--fxpage--box--fxList--item--btn ${pageState.chorusPage ? 'fxpage-active' : ''}`} onClick={() => dispatchPage({type: 'chorus'})}><Image height={50} width={50} src={chorus} alt=""/><span className='fx-label'>Chorus</span></button>
                                <button className={`btn nohover uploadmodal-big--fxpage--box--fxList--item--btn ${pageState.delayPage ? 'fxpage-active' : ''}`} onClick={() => dispatchPage({type: 'delay'})}><Image height={50} width={50} src={berry} alt=""/><span className='fx-label'>Delay</span></button>
                                <button className={`btn nohover uploadmodal-big--fxpage--box--fxList--item--btn ${pageState.reverbPage ? 'fxpage-active' : ''}`} onClick={() => dispatchPage({type: 'reverb'})}><Image height={50} width={50} src={reverb} alt=""/><span className='fx-label'>Reverb</span></button>
                                <button className={`btn nohover uploadmodal-big--fxpage--box--fxList--item--btn ${pageState.pingPong ? 'fxpage-active' : ''}`} onClick={() => dispatchPage({type: 'pingpong'})}><Image height={50} width={50} src={pingpong} alt=""/><span className='fx-label'>Pingpong Delay</span></button>
                                <button className={`btn nohover uploadmodal-big--fxpage--box--fxList--item--btn ${pageState.pitchShift ? 'fxpage-active' : ''}`} onClick={() => dispatchPage({type: 'pitch'})}><Image height={50} width={50} src={gearshift} alt=""/><span className='fx-label'>Pitch Shift</span></button>
                                {/* <button className={`btn nohover uploadmodal-big--fxpage--box--fxList--item--btn ${pageState.wahPage ? 'fxpage-active' : ''}`} onClick={() => dispatchPage({type: 'wah'})}><Image height={50} width={50} src={wave} alt=""/><span className='fx-label'>Wah-Wah</span></button> */}
                                <button className={`btn nohover uploadmodal-big--fxpage--box--fxList--item--btn ${pageState.phaserPage ? 'fxpage-active' : ''}`} onClick={() => dispatchPage({type: 'phaser'})}><Image height={50} width={50} src={moon} alt=""/><span className='fx-label'>Phaser</span></button>
                                <button className={`btn nohover uploadmodal-big--fxpage--box--fxList--item--btn ${pageState.filterPage ? 'fxpage-active' : ''}`} onClick={() => dispatchPage({type: 'filter'})}><Image height={50} width={50} src={filter} alt=""/><span className='fx-label'>Filter</span></button>
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
