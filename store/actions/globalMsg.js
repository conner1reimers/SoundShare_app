import * as actionTypes from "./actionTypes";


export const setGlobalMsg = (msg, msgType) => {
    return {
        type: actionTypes.SET_MSG,
        msg: msg,
        msgType
        
    }
}

export const removeGlobalMsg = () => {
    return {
        type: actionTypes.REMOVE_MSG
        
    }
}

export const resetGlobalMsg = () => {
    return {
        type: actionTypes.RESET_MSG
        
    }
}

export const setModalOpen = () => {
    return {
        type: actionTypes.OPEN_MODAL
        
    }
}

export const setModalClosed = () => {
    return {
        type: actionTypes.CLOSE_MODAL
        
    }
}

