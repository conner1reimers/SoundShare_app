import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Media from 'react-media';
const optionsVariants = {
    initial: {

        y: '-60%',
        opacity: 0.3,
        scale: 0.6



    },
    out: {


        y: '-75%',
        opacity: 0,
        scale: 0.6



    },
    in: {

        y: '0%',
        opacity: 1,
        scale: 1

    }
}

const optionsTransition = {
    type: 'spring',
    mass: 1.5,
    damping: 31,
    stiffness: 220,
    velocity: 1
    
}


interface Props {
    onClick: any,
    open: any,
    tier?: any,
    header?: any,
    nohead?: any,
    visible?: any,
    headClass?: any
}

const Backdrop2: React.FC<Props> = ({onClick, open, tier, header, nohead, visible, headClass}) => {
    return ReactDOM.createPortal(
        <Media queries={{
            small: "(max-width: 1099px)",
            big: "(min-width: 1100px)"
            }}>
              {matches => (
              <Fragment>
    
                {matches.small && ( 
                <AnimatePresence exitBeforeEnter>
                    {open && 
                    (<motion.div 
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={optionsVariants}
                        transition={optionsTransition} 
                        className="backdrop2" 
                        onClick={onClick}>
                            <div className="backdrop2--half"></div>
                            <div className="backdrop2--half2"></div>
                            <h2 className={`backdrop2--head ${headClass}`}>{header}</h2>
                    </motion.div>)}
                </AnimatePresence>)}


                {matches.big && ( 
                <Fragment>

                {tier > 2 ? (
                    <AnimatePresence exitBeforeEnter>
                    {open && visible &&
                    (<motion.div 
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={optionsVariants}
                        transition={optionsTransition} 
                        className="backdrop2" 
                        >
                            <div className="backdrop2--big">
                                {!nohead && <h2 className={`backdrop2--head ${headClass}`}>{header}</h2>}
                            </div>
                    </motion.div>)}
                </AnimatePresence> 
                )
            : ( <Fragment>
                    {open && visible &&
                        (<div className="backdrop2">
                                <div className="backdrop2--big">
                                    {!nohead && <h2 className={`backdrop2--head ${headClass}`}>{header}</h2>}
                                </div>
                        </div>)} 
                </Fragment>)}
            </Fragment>)}


      </Fragment>)}
      </Media>,document.getElementById(`${open ? 'backdrop-hook2' : 'backdrop-hook3'}`) as HTMLElement
    )
}

export default React.memo(Backdrop2);
