import * as actionTypes from "../../actions/actionTypes";


export interface ProgressState {
    curTime: number,
    duration: number,
    percent: number,
    percentInPx: number,
    reset: boolean,
    resetSingle: boolean
}

const initial: ProgressState = {
    curTime: 0,
    duration: 0,
    percent: 2,
    percentInPx: 30,
    reset: false,
    resetSingle: false
}







const progressStateReducer = (state = initial, action: any) => {
    switch(action.type) {
        case actionTypes.SEEK:
            const newPercent = (action.newTime / state.duration) * 100;
            let reset = false;

            if (action.reset) {
                reset = true;
            }
            return {
                ...state,
                curTime: action.newTime,
                percent: newPercent,
                percentInPx: (newPercent * 0.01) * action.wholeWidth,
                reset
            }
        case actionTypes.PLAY:
            const updatedPercent = ((state.curTime + .1) / state.duration) * 100;
            const newPx = (updatedPercent * 0.01) * action.val
            return {
                ...state,
                curTime: state.curTime + 0.1,
                percent: updatedPercent,
                percentInPx: newPx
            }
        case actionTypes.RESET_PROGRESS:
                
                return {
                    ...state,
                    curTime: 0,
                    percent: 2,
                    duration: action.newDuration,
                    percentInPx: 30

                }
            
        case 'backTo0':
                
                return {
                    ...state,
                    curTime: 0,
                    percent: 2,
                    duration: action.newDuration,
                    percentInPx: 30

                }
        case 'UPDATE_TIME_SMALL_PROGRESS':
                
                return {
                    ...state,
                    curTime: state.curTime + 0.1,

                }
        case 'SEEK_SOUND_SMALL':
                
                return {
                    ...state,
                    curTime: action.newTime,

                }
        case 'UNDO_RESET_PROGRESS':
            return {
                ...state,
                reset: false

            }
        case 'RESET_SINGLE':
            return {
                ...state,
                resetSingle: true
            }
        case 'UNDO_RESET_SINGLE':
            return {
                ...state,
                resetSingle: false
            }
            
        default:
            return state
    }
}


export default progressStateReducer;