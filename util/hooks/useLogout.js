import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/actions";
import { useHttpClient } from "./http-hook";
import { useGlobalMsg } from "./useGlobalMsg";

const useLogout = () => {
    const {sendRequest} = useHttpClient();
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);
    const setGlobalMsgs = useGlobalMsg();
    
    const logout = useCallback(async () => {
        try {
            let result = await sendRequest(`/users/logout`, 'POST', null, {'Authorization': 'Bearer '+token});
            if (result) {
                dispatch(logoutUser());
                setGlobalMsgs("Logged out", "goodbye");
            } else {
                dispatch(logoutUser());
                setGlobalMsgs("Logged out", "goodbye");
            }
            
        } catch {}
    }, [token, dispatch, setGlobalMsgs, sendRequest]);


    return logout;
}


export default useLogout;

