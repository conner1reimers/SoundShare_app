import * as actionTypes from "../../actions/actionTypes";

export interface GlobalMsgState {
  active: boolean,
  msg: string,
  aModalIsOpen: boolean,
  msgType: any,
  isOnHome: boolean
}

const initialState: GlobalMsgState = {
    active: false,
    msg: '',
    aModalIsOpen: false,
    msgType: null,
    isOnHome: false
}


//REDUCER
const globalMsgReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case actionTypes.SET_MSG:
        return {
            ...state,
            active: true,
            msg: action.msg,
            msgType: action.msgType
        }
      case actionTypes.RESET_MSG:
        return {
            ...state,
            active: false,
            msg: '',
            msgType: null
            
        }
      case actionTypes.REMOVE_MSG:
        return {
          ...state,
          active: false
        }
      case actionTypes.OPEN_MODAL:
        return {
          ...state,
          aModalIsOpen: true
        }
      case actionTypes.CLOSE_MODAL:
        return {
          ...state,
          aModalIsOpen: false
        }
      case "SET_IS_ON_HOME":
        return {
          ...state,
          isOnHome: true
        }
      case "SET_NOT_ON_HOME":
        return {
          ...state,
          isOnHome: false
        }
      
        default:
            return state
    }
  }

export default globalMsgReducer;