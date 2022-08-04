import { useDispatch , useSelector} from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { pauseGlobalSound, resetGlobalSound } from "../../store/actions";
import { useRouter } from "next/router";

export const useChangePage = () => {
  const dispatch = useDispatch();
  const [isOnSounds, setIsOnSounds] = useState(false);
  const [isOnUser, setIsOnUser] = useState(false);
  const location = useRouter();
  const regexSounds = /sounds/.test(location.pathname);
  const regexUser = /user/.test(location.pathname);
  const globalSoundIsPlaying = useSelector(state => state.globalSound.playing);

  useEffect(() => {
    if (regexSounds) {
      setIsOnSounds(true);
    } else if (isOnSounds) {
      setIsOnSounds(false);
    }

    if (regexUser) {
      setIsOnUser(true);
    } else if (isOnUser) {
      setIsOnUser(false);
    }
  }, [location]);

  useEffect(() => {
    return () => {
      setIsOnSounds(false);
      setIsOnUser(false);
    };
  }, []);

  const gotoSingleSoundPage = useCallback((event, id) => {
    if(globalSoundIsPlaying) {
      dispatch(pauseGlobalSound());
    }
    dispatch({type: "RESET_SINGLE"})
      
    dispatch({type: "MAIN_LOADER_START"});
    event.preventDefault();
    location.push(`/sounds/${id}`);
    dispatch(resetGlobalSound());
    
  }, [location, dispatch, globalSoundIsPlaying]);

  const goToUserPage = useCallback((event, id) => {
    // const regex = /user/.test(location.pathname);
    dispatch({type: "MAIN_LOADER_START"});
    event.preventDefault();
    event.stopPropagation();
    location.push(`/user/${id}`);

  }, [location, dispatch]);

  return { gotoSingleSoundPage, goToUserPage };
};
