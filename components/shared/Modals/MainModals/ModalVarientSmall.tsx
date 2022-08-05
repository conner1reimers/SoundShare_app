import { AnimatePresence } from 'framer-motion';
import React from 'react'
import { useSelector } from 'react-redux';
import Backdrop from '../../../Backdrop';
import Backdrop2 from '../Backdrop2';
import SmallModal from './SmallModal'

const ModalVarientSmall = (props: any) => {
  const gpuTier = useSelector((state: any) => state.ui.gpuTier);

  return (
    <>
        <AnimatePresence exitBeforeEnter>
                {props.open && <SmallModal fxOpen={props.fxOpen}>{ props.children }</SmallModal> }
        </AnimatePresence>

        {props.open && <Backdrop onClick={props.cancelHandler}/>}

        <Backdrop2 
            open={props.open} 
            onClick={props.cancelHandler}
            header={props.backdropHeader}
            headClass={props.backdropHeadClass}
            tier={gpuTier.tier}
        />

    </>
  )
}

export default ModalVarientSmall