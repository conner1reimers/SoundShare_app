import * as actionTypes from "./actionTypes";


export const startAction = (name, params) => {
    return {
        type: actionTypes.START_ACTION,
        payload: {
            action: {
                name,
                params
            }
        }
    }
}

export const stopAction = (name) => {
    return {
        type: actionTypes.STOP_ACTION,
        payload: { name }
    }
}

export const refreshActionStart = (refreshAction) => {
    return {
        type: actionTypes.REFRESH_ACTION_START,
        payload: { refreshAction }
    }
}

export const refreshActionStop = (refreshAction) => {
    return {
        type: actionTypes.REFRESH_ACTION_STOP,
        payload: { refreshAction }
    }
}