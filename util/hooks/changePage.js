import { useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { resetGlobalSound } from "../../store/actions";
import { useRouter } from "next/router";

export const useChangePage = () => {
  const dispatch = useDispatch();
  const [isOnSounds, setIsOnSounds] = useState(false);
  const [isOnUser, setIsOnUser] = useState(false);
  const location = useRouter();
  const regexSounds = /sounds/.test(location.pathname);
  const regexUser = /user/.test(location.pathname);

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
    dispatch({type: "MAIN_LOADER_START"});
    event.preventDefault();
    location.push(`/sounds/${id}`);
    dispatch(resetGlobalSound());

  }, []);

  const goToUserPage = useCallback((event, id) => {
    dispatch({type: "MAIN_LOADER_START"});
    event.preventDefault();
    event.stopPropagation();
    location.push(`/user/${id}`);

  }, []);

  return { gotoSingleSoundPage, goToUserPage };
};
