import React from 'react'
import ReactDOM from 'react-dom';
import Image from 'next/image'
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import check from '../../public/check.svg';
import err from '../../public/err.svg';
import question_mark from '../../public/question-mark.svg';


const msgVariants = {
    initial: {
        x: '0%',
        y: '-10%',
        opacity: 0.3,
        scale: 1
    },
    out: {
        x: '-10%',
        y: '-10%',
        opacity: 0,
        scale: 0
    },
    in: {
  
        x: '0%',
        y: '0%',
        opacity: 1,
        scale: 1
    }
  };
  const msgTrans = {
    type: 'spring',
    mass: 1,
    damping: 21,
    stiffness: 120,
    velocity: 1
    
  };


const GlobalMsg: React.FC = (props: any) => {
    const globalMsg = useSelector((state: any) => state.globalMsg);
    let imgSrc: any;
    if (globalMsg.msgType) {
        if (globalMsg.msgType === 'success') {
            imgSrc = check;
        } else if (globalMsg.msgType === 'error') {
            imgSrc = err;
        } else if (globalMsg.msgType === 'goodbye') {
            imgSrc = check;
        } else if (globalMsg.msgType === 'followed') {
            imgSrc = check;
        } else if (globalMsg.msgType === 'question') {
            imgSrc = question_mark;
        } 
    }

    let longer = false;
    let longest = false;
    if (globalMsg.msg.length > 18) {
        longer = true;
    }
    if (globalMsg.msg.length > 60) {
        longest = true;
    }

    const classname = `global-msg--contain 
        ${(longer && !longest) ? 'global-msg--contain--longer'
        : longest ? 'global-msg--contain--longest' : ''}`;
    
    

    const finalEl = typeof window != 'undefined' ? ReactDOM.createPortal(
        <AnimatePresence>
            {globalMsg.active && (
            <motion.div 
                className={`global-msg ${longest ? 'global-msg--longest' : ''}`}
                initial="initial"
                animate="in"
                exit="out"
                variants={msgVariants}
                transition={msgTrans}
            >
                <div className={classname}>
                    <div>
                            <span>{globalMsg.msg}</span>
                            <div className="global-msg-img">
                                <Image
                                    src={imgSrc}
                                    alt="sdf"
                                    height={18}
                                    layout="fixed"
                                    width={18}
                                    />
                            </div>
                    </div>
                </div>
                
            </motion.div>)}
        </AnimatePresence>, document.getElementById('global-msg-hook') as HTMLElement) : null
    
    
    
        
    return finalEl
}

export default GlobalMsg
