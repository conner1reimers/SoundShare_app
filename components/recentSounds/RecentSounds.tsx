import React from "react";
import { Typography } from "@material-ui/core";
import Media from "react-media";
import RecentSide from "./RecentSide";
import { useSelector, useDispatch } from "react-redux";
import SoundList from "./SoundList";
import SoundTypes from "./SoundTypes";
import { RootState } from "../../store/reducers";


const RecentSounds: React.FC = () => {
  const category = useSelector((state: RootState) => state.recentSounds.category);
  
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

      <div className={`recent-sounds--listcontainer ${category === 'vocal' ? 'recent-sounds--listcontainer--vocal' : ''}`}>
        <SoundList />
      </div>

      <Media query="(min-width: 1100px)">
        <RecentSide />
      </Media>

    </div>
  );
};





export default React.memo(RecentSounds);
