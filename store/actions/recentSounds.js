import * as actionTypes from "./actionTypes";

export const fetchRecentSounds = () => {
    return {
        type: actionTypes.FETCH_RECENT
    }
}

export const fetchRecentSoundsServer = () => {
    return {
        type: actionTypes.FETCH_RECENT_SERVER
    }
}