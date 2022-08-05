import React, { useRef } from "react";
import loadable from '@loadable/component'
import { Typography } from "@material-ui/core";
import Media from "react-media";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/reducers";

const RecentSide = loadable(() => import('./Side/RecentSide'));
const SoundTypes = loadable(() => import('./SoundTypes'));
const SoundList = loadable(() => import('./SoundList'));


const RecentSounds: React.FC = () => {
  const category = useSelector((state: RootState) => state.recentSounds.category);
  const listRef = useRef(null);

  return (
    <div className="recent-sounds">

      <div className="recent-sounds--background"></div>

      <div className="recent-sounds--head-contain">
        <div className="recent-sounds--head">
          <Typography color="primary" variant="h1" component="h2">
            Sounds uploaded recently...
          </Typography>

          <SoundTypes category={category}/>
          
        </div>
      </div>

      <div ref={listRef} className={`recent-sounds--listcontainer ${category === 'vocal' ? 'recent-sounds--listcontainer--vocal' : ''}`}>
        <SoundList size={listRef} />
      </div>

      <Media query="(min-width: 1100px)">
        <RecentSide />
      </Media>

    </div>
  );
};





export default React.memo(RecentSounds);
