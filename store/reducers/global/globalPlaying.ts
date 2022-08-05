import * as actionTypes from "../../actions/actionTypes";


export interface GlobalPlayingState {
    active: any,
    hiddenOpen: any,
    playing: any,
    sound: any,
    volume: any,
    ended: any,
    location: any
}


const initialState: GlobalPlayingState = {
    active: false,
    hiddenOpen: false,
    playing: false,
    sound: {},
    volume: 1,
    ended: false,
    location: null
}


//REDUCER
const globalPlayingReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case actionTypes.OPEN_AND_PLAY_GLOBAL:
        if (action.sound.sound_creator_id) {
          return {
            active: true,
            hiddenOpen: false,
            playing: true,
            sound: {
              ...action.sound,
              creator_id: action.sound.sound_creator_id
            },
            volume: 1,
            ended: false,
            location: action.location
          }
        } else {
          return {
            active: true,
            hiddenOpen: false,
            playing: true,
            sound: action.sound,
            volume: 1,
            ended: false,
            location: action.location
          }
        }
        
      case actionTypes.PAUSE_GLOBAL:
        return {
          ...state, 
          playing: false
        }
      case actionTypes.PLAY_GLOBAL:
        return {
          ...state, 
          playing: true
        }
      case actionTypes.PLAY_SET_GLOBAL_SOUND:
        if (action.sound.sound_creator_id) {
          return {
            ...initialState, 
            playing: true,
            sound: {
              ...action.sound,
              creator_id: action.sound.sound_creator_id
            },
            location: action.location
          }
        } else {
          return {
            ...initialState, 
            playing: true,
            sound: action.sound,
            location: action.location
          }
        }
      case actionTypes.SET_GLOBAL_SOUND:
        if (action.sound.sound_creator_id) {
          return {
            ...initialState, 
            playing: false,
            sound: {
              ...action.sound,
              creator_id: action.sound.sound_creator_id
            },
            location: action.location
          }
        } else {
          return {
            ...initialState, 
            playing: false,
            sound: action.sound,
            location: action.location
          }
        }
      case actionTypes.HIDE_GLOBAL:
        return {
          ...state,
          active: false,
          hiddenOpen: true
        }
      case actionTypes.CHANGE_GLOBAL:
        if (action.sound.sound_creator_id) {
          return {
            ...state,
            playing: true,
            sound: {
              ...action.sound,
              creator_id: action.sound.sound_creator_id
            },
            location: action.location
          }
        }
        else {
          return {
            ...state,
            playing: true,
            sound: action.sound,
            location: action.location
          }
        }
        
      case actionTypes.GLOBAL_VOLUME:
          const vol = action.volume * 0.01;
          return {
            ...state,
            volume: vol
          }
      case actionTypes.MUTE_GLOBAL:
          
          return {
            ...state,
            volume: 0
          }
      case actionTypes.GLOBAL_HIDDEN_CLOSED:
          return {
            ...state,
            active: true,
            hiddenOpen: false
          }
        case actionTypes.END_GLOBAL_SOUND:
          return {
            ...state,
            ended: true,
            playing: false
        }
        case "SET_GLOBALSOUND_SINGLESOUND":
          return {
            ...state,
            sound: {
              ...state.sound,
              id: action.sid,
              path: action.path,
              type: action.soundType
            }
        }
        case "PLAY_SET_GLOBALSOUND_SINGLESOUND":
          return {
            ...state,
            playing: true,
            sound: {
              id: action.sid,
              path: action.path,
              type: action.soundType
            }
         }
        case 'unend-global': 
          return {
            ...state,
            ended: false,
          }
      case actionTypes.RESET_GLOBAL_SOUND:
        return initialState
        
        default: 
            return state
    }
  }

export default globalPlayingReducer;