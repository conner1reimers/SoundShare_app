import { useCallback, useEffect, useState } from "react";
import { useHttpClient } from "./http-hook";
import { useGlobalMsg } from "./useGlobalMsg";

const { useDispatch, useSelector } = require("react-redux");

export const useFollowUser = (id, location) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const {isLoading, sendRequest} = useHttpClient();
    const setGlobalMsg = useGlobalMsg();



    useEffect(() => {
        if (user && id) {
            if (user.full) {
                if (user.full.following.indexOf(id.toString()) !== -1) {
                    setIsFollowing(true);
                    // if (location === 'userpage') dispatch({ type: "FOLLOW_USER" });
                  } else if ((isFollowing)) {
                    setIsFollowing(false);
                    // if (location === 'userpage') dispatch({ type: "UNFOLLOW_USER" });
                  }
            }
        }
    }, [user, id, location]);

    

    const followUser = useCallback(async (e) => {
        e.stopPropagation();
        let result;
      
        if (user.userId && !isLoading) {
  
          if (!isFollowing) {
            try {
              result = await sendRequest(
                `/users/follow/${user.userId}/${id}`,
                "POST",
                null,
                {'Authorization': 'Bearer '+user.token}
              );
              setIsFollowing(true);
              dispatch({type: "FOLLOW_A_USER", id: id});
            //   if (location === 'userpage') dispatch({ type: "FOLLOW_USER" });
            } catch (err) {}
          } else {
            try {
              result = await sendRequest(
                `/users/unfollow/${user.userId}/${id}`,
                "DELETE",
                null,
                {'Authorization': 'Bearer '+user.token}
              );
              dispatch({type: "UNFOLLOW_A_USER", id: id});
              setIsFollowing(false);

      
            //   if (location === 'userpage') dispatch({ type: "UNFOLLOW_USER" });
            } catch (err) {}
          }
        } else {
          setGlobalMsg(`Please login to follow user`, 'error');
        }
    }, [user.userId, id, location, isLoading, isFollowing]);

    return {isFollowing, followUser, setIsFollowing, isLoading};
}