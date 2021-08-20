import { AnimatePresence, motion } from 'framer-motion';
import React, { Fragment, useEffect, useState } from 'react'
import right from "/public/forward.svg";
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';



const msgVariants = {
	initial: {
		x: "0%",
		y: "-10%",
		opacity: 0.3,
		scale: 1,
	},
	out: {
		x: "-10%",
		y: "-10%",
		opacity: 0,
		scale: 0,
	},
	in: {
		x: "0%",
		y: "0%",
		opacity: 1,
		scale: 1,
	},
};

const msgTrans = {
	type: "spring",
	mass: 1,
	damping: 60,
	stiffness: 200,
	velocity: 1,
};



interface FilterMsgProps {

}

export const FilterMsg: React.FC<FilterMsgProps> = ({ }) => {
  
  const [startHints, setStartHints] = useState<any>(false);
	const browseMsgState = useSelector((state: any) => state.browse.msg);
	const dispatch = useDispatch();
	
	// useEffect(() => {
	// 	if (startHints) {
	// 		setTimeout(() => {
	// 			setStartHints(false);
	// 			dispatch({type: 'FX_TUTORIAL_DONE'})

	// 		}, 4000);
	// 	}
	// }, [startHints]);


	useEffect(() => {
    setTimeout(() => {
      dispatch({type:  "REMOVE_BROWSE_MSG"})
      setTimeout(() => {
        dispatch({type:  "RESET_BROWSE_MSG"})
      }, 500);
    }, 2000);
  }, []);
  
  
  return (
    <Fragment>
		<AnimatePresence exitBeforeEnter>
			{browseMsgState.active && (
				<motion.div
					className="uploadmodal-big--fxpage--box--hearText browse-msg-contain"
					initial="initial"
					animate="in"
					exit="out"
					variants={msgVariants}
					transition={msgTrans}
          >
            <div className="browse-msg-arrow-contain">
              
              <Image
                className="uploadmodal-big--fxpage--box--playpause--leftarrow"
                src={right}
                height={30}
                width={30}
                alt=""
                  />
            </div>
					<span>Magnifying Glass to Filter Sounds!</span>
					<div className="fx-backdrop"></div>
				</motion.div>
			)}
		</AnimatePresence>
		</Fragment>
    );
}