import { useDispatch } from "react-redux";
import { useGlobalMsg } from "./useGlobalMsg";
import {loginUser} from '../../store/actions/index'
import { useCallback } from "react";

const useLogin = () => {
    const setGlobalMsgs = useGlobalMsg();
    const dispatch = useDispatch();

    const login = useCallback((uid, token, userName, following) => {
        dispatch(loginUser(uid, token, userName, following));
        dispatch({ type: "FETCH_LOGGED_USER", uid });
        setGlobalMsgs(`${userName} logged in!`, "success");
    }, []);
    
    return login
}


export default useLogin;