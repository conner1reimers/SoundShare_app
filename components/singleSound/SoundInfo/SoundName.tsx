import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MouseOverLabel from '../../shared/MouseOverLabel'
// import DropSinglesound from '../../common_reusable/DropdownOptions'
import DropSinglesound from '../SingleSoundMain/DropSingleSound'
import more from "../../../public/more2.svg";
import { RootState } from '../../../store/reducers'

type Props = {
  setEditMode: any,
  editMode: any,
  isMyPage: boolean,
}


const SoundName = (props: Props) => {
  const dispatch = useDispatch();
  const name = useSelector((state: RootState) => state.singleSound.sound.name);
  const myPageOptionsOpen = useSelector((state: RootState) => state.ui.singlesoundOptionsOpen);

  const openMySoundOptions = useCallback(() => {
    if (props.isMyPage && !myPageOptionsOpen) {
      dispatch({type: "OPEN_SINGLESOUND_OPTIONS"})
    } else if (props.isMyPage && myPageOptionsOpen) {
      dispatch({type: "CLOSE_SINGLESOUND_OPTIONS"});
    }
  }, [props.isMyPage, myPageOptionsOpen, dispatch]);

  const closeMySoundOptions = useCallback((e) => {
    if (myPageOptionsOpen) {
      dispatch({type: "CLOSE_SINGLESOUND_OPTIONS"});
    }
  }, [myPageOptionsOpen, dispatch]);

  return (
    <div className={`single-sound--info--title ${props.isMyPage ? 'singlesound-title-mypage' : ''}`}>
                      
      {props.editMode !== "name" && name && (<h1 className="">{name}</h1>)}

      {props.isMyPage && props.editMode !== "name" && (

      <div className="delete-btn-singlesound">
        <div className="delete-btn-singlesound--btn-activator invisible-btn-div">
          <MouseOverLabel
            seemore
            classname="circle-btn-mouseover singlesound-options-mouseover"
            labelClass="singlesound-options-mouseover--label"
            label="See options"
          >
            <button
              onClick={openMySoundOptions}
              className="btn nohover invisible-btn"
            >
              <Image src={more} alt="" />
            </button>
          </MouseOverLabel>
        </div>

        <AnimatePresence exitBeforeEnter>
          <DropSinglesound 
            isMyPage={props.isMyPage} 
            setEditMode={props.setEditMode}
            cancel={closeMySoundOptions}
          />
        </AnimatePresence>
      </div>
      
    )}
  </div>
  )
}

export default SoundName