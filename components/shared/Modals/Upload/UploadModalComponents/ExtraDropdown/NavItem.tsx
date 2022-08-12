import { motion } from 'framer-motion';
import React, { useState } from 'react'
import useWindowSize from '../../../../../../util/useWindowSize';


const dropdownVariants = {
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

const dropdownTransition = {
  type: 'spring',
  mass: 1,
  damping: 21,
  stiffness: 120,
  velocity: 1
  
};


const NavItem: React.FC = React.memo((props: any) => {
  const [open, setOpen] = useState<any>(false);
  const [elDims, setElDims] = useState<any>(false);
  const browserDims: any  = useWindowSize();

  const openDrop = () => {
    const el: any  = document.querySelector('.xtraOption-dropdown--container')
    const btnEl: any  = document.querySelector('.btn.uploadmodal-big--info-form--input--imgUpload3--btn')
    if (open) {
      setOpen(false);
      el.style.transform = 'translateY(0px) scale(1)';
      el.style.width = elDims.containWidth+'px';
      el.style.height = elDims.containHeight+'px';
      btnEl.style.width = elDims.btnWidth + 'px';
      btnEl.style.height = elDims.btnHeight + 'px';


    } 
     else{
      setOpen(true);

      
        el.style.transform = 'translateY(55px) translateX(160px) scaleX(2)';
        if (browserDims.width < 1100) {
          el.style.height = 250+'px';
          setTimeout(() => {
            el.style.transform = 'translateY(110px) translateX(120px) scaleY(2.1) scaleX(1.9)';
          }, 270);
        } else if (browserDims.width < 1620) {
          setTimeout(() => {
            el.style.transform = 'translateY(60px) translateX(110px) scaleY(2.2) scaleX(2)';
          }, 270);
        } else {
          setTimeout(() => {
            el.style.transform = 'translateY(50px) translateX(120px) scaleY(2.2) scaleX(2)';
          }, 270);
        }
        
       
      
      
      
    }
  }

  return ( 
  <li className={`xtraOption-dropdown--li ${open && 'xtraOption-dropdown--li--open'}`}>
    <button className={`btn nohover uploadmodal-big--info-form--input--imgUpload3--btn`} onClick={!open ? openDrop : undefined} type="button">
      {!open && 
      <motion.span
        initial="initial"
        animate="in"
        exit="out"
        variants={dropdownVariants}
        transition={dropdownTransition}
        className="xtraOption-dropdown--item nohover-item" 
      >
        View Options
      </motion.span>}
      <div className="xtraOption-dropdown--li--main">
        {open && props.children}
      </div>
    </button>

    
  </li>
  )
})

NavItem.displayName = "NavItem";

export default NavItem
