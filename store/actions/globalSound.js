import * as actionTypes from "./actionTypes";


export const openAndPlayGlobalSound = (sound, location) => {
    return {
        type: actionTypes.OPEN_AND_PLAY_GLOBAL,
        sound: sound,
        location: location
    }
}

export const pauseGlobalSound = () => {
    return {
        type: actionTypes.PAUSE_GLOBAL
    }
}

export const playGlobalSound = () => {
    return {
        type: actionTypes.PLAY_GLOBAL
    }
}

export const hideGlobalSound = () => {
    return {
        type: actionTypes.HIDE_GLOBAL
    }
}

export const playOrPauseGlobalSound = () => {
    return {
        type: actionTypes.REVERSE_GLOBAL
    }
}

export const changeGlobalSound = (sound, location) => {
    return {
        type: actionTypes.CHANGE_GLOBAL,
        sound: sound,
        location: location
    }
}

export const openGlobalBackUp = () => {
    return {
        type: actionTypes.GLOBAL_HIDDEN_CLOSED
    }
}


export const changeGlobalVolume = (volume) => {
    return {
        type: actionTypes.GLOBAL_VOLUME,
        volume
    }
}
export const resetGlobalSound = () => {
    return {
        type: actionTypes.RESET_GLOBAL_SOUND
        
    }
}
export const playAndSetGlobalSound = (sound, location) => {
    return {
        type: actionTypes.PLAY_SET_GLOBAL_SOUND,
        sound,
        location
        
    }
}

export const playAndSetGlobalSingleSound = (sid, path, soundType) => {
    return {
        type: "PLAY_SET_GLOBALSOUND_SINGLESOUND",
        sid,
        path,
        soundType
        
    }
}

export const setGlobalSound = (sound, location) => {
    return {
        type: actionTypes.SET_GLOBAL_SOUND,
        sound,
        location
        
    }
}

export const muteGlobalSound = () => {
    return {
        type: actionTypes.MUTE_GLOBAL
        
    }
}


export const endGlobalSound = () => {
    return {
        type: actionTypes.END_GLOBAL_SOUND
        
    }
}




