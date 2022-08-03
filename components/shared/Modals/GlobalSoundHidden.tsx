import React, { useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import downArrow from '../../../public/down-arrow.svg';
import { useDispatch, useSelector } from 'react-redux';
import { openGlobalBackUp, pauseGlobalSound, playGlobalSound } from '../../../store/actions/globalSound';

import {useChangePage} from '../../../util/hooks/changePage'
import { GlobalPlayingState } from '../../../store/reducers/global/globalPlaying';
import PlayPauseBtns from '../../common_reusable/playPauseBtn/PlayPauseBtns';
import Image from 'next/image';

const optionsVariants = {
    initial: {

        y: '150%',
        opacity: 0.9



    },
    out: {


        y: '200%',
        opacity: 0



    },
    in: {

        y: '0%',
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

interface Root {
    globalSound: GlobalPlayingState
}

interface Props {
    username: any, 
    creator: any,
    id: any,
    name?: any
}

const GlobalSoundHidden: React.FC<Props> = ({name, username, creator, id}) => {
    const dispatch = useDispatch();
    const globalSound = useSelector((state: Root) => state.globalSound);

    const { gotoSingleSoundPage, goToUserPage } = useChangePage();
    
    const openBack = useCallback(() => {
        dispatch(openGlobalBackUp())
    }, [])


    return (
        <AnimatePresence exitBeforeEnter>

        {globalSound.hiddenOpen && (
            <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={optionsVariants}
                transition={optionsTransition}
                className="global-player--hidden"
            >
                <div className="global-player--info--name">
                            <span
                              className="globalsound--nowplaying"
                              onClick={(e: any) => gotoSingleSoundPage(e, id)}
                            >
                                Now playing: {" "}
                            </span>
                            <span
                              className="globalsound--soundname"
                              onClick={(e: any) => gotoSingleSoundPage(e, id)}
                            >
                            {name}
                          </span>
                            <span
                              className="globalsound--username"
                              onClick={(e: any) => goToUserPage(e, creator)}
                            >
                              <p>Uploaded by: {username}</p>
                            </span>
                            
                </div>
                
                <div className="global-player--hidden--downarrow">
                    <div>
                        <button type="button" onClick={openBack} className="btn nohover up-arrow">
                            <Image src={downArrow}/>
                        </button>
                    </div>
                </div>

                <div className="global-player--hidden--play">
                    <PlayPauseBtns/>
                </div>
                
            </motion.div>)}
            
        </AnimatePresence>
    )
}

export default React.memo(GlobalSoundHidden);
