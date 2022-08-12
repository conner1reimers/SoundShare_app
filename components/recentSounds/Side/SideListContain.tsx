import React, { useCallback, useEffect, useState } from "react";
import folder from "../../../public/sound-waves3.svg";
import eye from "../../../public/eye.svg";
import { useSelector, useDispatch } from "react-redux";
import { useChangePage } from "../../../util/hooks/changePage";
import EditImgModal from '../../shared/Modals/EditImgModal';
import { RecentSoundState } from "../../../store/reducers/sounds/recentSound";
import Image from "next/image";
import loadable from '@loadable/component'


type Props = {
  type: string,
  notfirst?: boolean
}
interface Root {
  recentSounds: RecentSoundState
}
const SideListContain = (props: Props) => {
  const { gotoSingleSoundPage } = useChangePage();
  const dispatch = useDispatch();

  const topSounds = useSelector((state: Root) => {
    return props.type === "DOWNLOADS" ?
      state.recentSounds.topDownloaded
      : state.recentSounds.topLiked
  });

  const name = props.type === "DOWNLOADS" ? "Downloaded" : "Liked";

  const openTopSounds = () => {
    dispatch({ type: `FETCH_TOP_${props.type}` });
    dispatch({ type: "SET_TOP_LIST", payload: props.type });
  }

  return (
    <div className={`recent-sounds--side-big--box ${props.notfirst ? 'recent-sounds--side-big--box--notfirst' : ''}`}>
        <div className="recent-sounds--side-big--box--head">
          <h1>Top {name} Sounds</h1>
        </div>
        <ul className="recent-sounds--side-big--box--list">
          {topSounds &&
            topSounds.map((el: any) => {
              let name;
              let last;
              if (el.name.length > 25) {
                name = el.name.substring(0, 25); //cuts to 25
                last = name.lastIndexOf(" "); //gets last space (to avoid cutting the middle of a word)
                name = name.substring(0, last); //cuts from last space (to avoid cutting the middle of a word)
                name = name + `...`; //adds (...) at the end to show that it's cut
              } else {
                name = el.name;
              }
              return (
                <li
                  key={el.id}
                  onClick={(event) => gotoSingleSoundPage(event, el.id)}
                  className="recent-sounds--side-big--box--list--item"
                >
                  <div className="recent-sounds--side-big--box--list--item--title">
                    <div className="wrapper">
                      <Image className="recent-img" src={folder} alt="" />
                    </div>
                    <p>{name}</p>
                  </div>
                  <div className="recent-sounds--side-big--box--list--item--info">
                    <p>{el.username}</p>
                  </div>
                </li>
              );
            })}
        </ul>
        
        <div className="sound-list-item--circle recent-side--circle">
          <div className="recent-sounds--side--more">
            <button onClick={openTopSounds} className="btn nohover">
              <span className="seemore-label">See more</span>
              <div className="wrapper">
                <Image src={eye} alt=""/>
              </div>
            </button>
          </div>
        </div>
        
      </div> 
  )
}

export default SideListContain