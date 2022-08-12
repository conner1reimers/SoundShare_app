import { useDispatch, useSelector } from "react-redux"
import { setGlobalMsg, removeGlobalMsg, resetGlobalMsg } from "../../store/actions";

export const useGlobalMsg = () => {
    const globalMsgState = useSelector(state => state.globalMsg.msg);
    const dispatch = useDispatch();
    
    const setGlobalMsgs = (msg, pic, timeout) => {
      if (globalMsgState) {
        return

      } else {
        dispatch(setGlobalMsg(msg, pic));

        setTimeout(() => {
            dispatch(removeGlobalMsg());
            setTimeout(() => {
              dispatch(resetGlobalMsg())
            }, 500);
          }, timeout || 2000);
      }
        

    }
    
    return setGlobalMsgs;
}