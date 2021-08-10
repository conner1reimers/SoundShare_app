import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { resetGlobalSound } from "../../store/actions";

export const useChangePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [isOnSounds, setIsOnSounds] = useState(false);
  const [isOnUser, setIsOnUser] = useState(false);
  const location = useLocation();
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
    event.preventDefault();
    history.push(`/sounds/${id}`);
    dispatch(resetGlobalSound());
  }, []);

  const goToUserPage = useCallback((event, id) => {
    event.preventDefault();
    event.stopPropagation();
    history.push(`/user/${id}`);

  }, []);

  return { gotoSingleSoundPage, goToUserPage };
};
