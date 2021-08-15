import { motion } from 'framer-motion';
import React, { Fragment } from 'react'
import ReactDOM from 'react-dom';


const optionsVariants = {
  initial: {
      x: '150%',
      opacity: 0.9
  },
  out: {
      x: '200%',
      opacity: 0
  },
  in: {

      x: '0%',
      opacity: 1

  }
}

const optionsTransition = {
  type: 'spring',
  mass: .5,
  damping: 27,
  stiffness: 220,
  velocity: 1
  
}



interface Props {
  open: boolean,
  children: any,
  closeModal: any
}

const ModalStore: React.FC<Props> = ({ open, children, closeModal }) => {
  
  const final = process.browser ? ReactDOM.createPortal(
    <Fragment>
      {open && (
        <Fragment>
          <motion.div
            className="store-modal-contain"
            initial="initial"
            animate="in"
            exit="out"
            variants={optionsVariants}
            transition={optionsTransition}
          >
            {children}


          </motion.div>

          <div onClick={closeModal} className="backdrop-store"></div>
        </Fragment>

        
      )}
    </Fragment>, document.getElementById('modal-hook-store') as HTMLElement) : null;
  return final;
  
}

export default ModalStore
