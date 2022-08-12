import React, { useCallback, useEffect, useState } from "react";
import folder from "../../../public/sound-waves3.svg";
import eye from "../../../public/eye.svg";
import { useSelector, useDispatch } from "react-redux";
import { useChangePage } from "../../../util/hooks/changePage";
import EditImgModal from '../../shared/Modals/EditImgModal';
import { RecentSoundState } from "../../../store/reducers/sounds/recentSound";
import Image from "next/image";
import loadable from '@loadable/component'
import SideListContain from "./SideListContain";

const TopSoundsList = loadable(() => import("./TopSoundsList"));



interface Root {
  recentSounds: RecentSoundState
}


const RecentSide: React.FC = () => {
  const dispatch = useDispatch();
  const topSoundActive = useSelector((state: Root) => state.recentSounds.refreshTopList.type);

  useEffect(() => {
    return () => {
      dispatch({ type: 'RESET_TOP_SOUNDS' });
    }
  }, [])

  return (
    <div className="recent-sounds--side-big">

      <SideListContain type="LIKES"/>
      <SideListContain type="DOWNLOADS" notfirst/>

      <div className="recent-sounds--side-big--box recent-sounds--side-big--box--notfirst">
        <div className="ad-hm-slot">
          <div id="div-gpt-ad-MPU-2" className="ad-slot">
          </div>
        </div>
      </div>

      <EditImgModal alldownloads open={topSoundActive} closeModal={() => dispatch({ type: 'RESET_TOP_SOUNDS' })}>
        <TopSoundsList type={ topSoundActive }/>
      </EditImgModal>

    </div>
  );
};



export default React.memo(RecentSide);
