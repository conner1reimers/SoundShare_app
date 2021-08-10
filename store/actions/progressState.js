import * as actionTypes from "./actionTypes";


export const seekSound = (newTime, wholeWidth, reset) => {
    return {
        type: actionTypes.SEEK,
        newTime: newTime,
        wholeWidth: wholeWidth,
        reset
    }
}

export const updateTime = (wholeWidth) => {
    return {
        type: actionTypes.PLAY,
        val: wholeWidth
    }
}

export const resetProgress = (newDuration) => {
    return {
        type: actionTypes.RESET_PROGRESS,
        newDuration
    }
}


