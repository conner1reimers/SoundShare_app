import * as actionTypes from "../../actions/actionTypes";

const OPEN_MAIN_BROWSE_OPTIONS = 'OPEN_MAIN_BROWSE_OPTIONS';
const CLOSE_MAIN_BROWSE_OPTIONS = 'CLOSE_MAIN_BROWSE_OPTIONS';
const FETCH_BROWSE_ASYNC = 'FETCH_BROWSE_ASYNC';
const SEARCH_BROWSE_HOME = 'SEARCH_BROWSE_HOME';
const REFRESH_BROWSE_ASYNC = 'REFRESH_BROWSE_ASYNC';
const FETCH_BROWSE_SAVE_LASTOPTIONS = 'FETCH_BROWSE_SAVE_LASTOPTIONS';
const BROWSE_FINISH_MSG = 'BROWSE_FINISH_MSG';
const CLEAR_BROWSE_ERROR = 'CLEAR_BROWSE_ERROR';
const RESET_BROWSE = 'RESET_BROWSE';


export interface BrowseState {
  mainOpen: boolean,
  options: any,
  xtraOptions: any,
  tags: any,
  results: any,
  lastQuery: {
    lastOrder: any,
    text: any,
    vals: any,
    lastQueryForRefresh: any,
    finishMsgShown: boolean
  },
  error: any,
  offset: number,
  refreshFinish: boolean,
  lastOptions: any,
  page: number,
  modalOpen: boolean,
  msg: any
}

const initialState: BrowseState = {
    mainOpen: false,
    options: {

    },
    xtraOptions: null,
    tags: null,
    results: null,
    lastQuery: {
      lastOrder: null,
      text: null,
      vals: null,
      lastQueryForRefresh: null,
      finishMsgShown: false
    },
    error: null,
    offset: 0,
    refreshFinish: false,
    lastOptions: null,
    page: 0,
    modalOpen: false,
    msg: {
      active: false,
      msg: null
    }


}



type BrowseActionTypes = {
  type: string,
  options?: any,
  results?: any,
  time?: any,
  genre?: any,
  tags?: any,
  msg?: any,
}



const browseReducer = (state = initialState, action: BrowseActionTypes) => {
    switch (action.type) {
      case OPEN_MAIN_BROWSE_OPTIONS:
        return {
          ...state,
          mainOpen: true
        }
    case CLOSE_MAIN_BROWSE_OPTIONS:
        return {
          ...state,
          mainOpen: false
        }
    case actionTypes.SAVE_BROWSE:
        return {
          ...state,
          options: action.options
        }
    case FETCH_BROWSE_ASYNC:
      console.log(action)
      if (!action.results.results) {
        
        return {
          ...state,
          error: action.results.message
        }
      } else {
        return {
          ...state,
          results: action.results.results,
          lastQuery: {
            ...action.results.lastQuery,
            lastQueryForRefresh: {...action.results.lastQuery.lastQueryForRefresh}
          },
          offset: action.results.results.length,
          refreshFinish: false,
          error: null
        }
      }
      case SEARCH_BROWSE_HOME:
        
        return {
          ...state,
          results: action.results.results,
          lastQuery: {
            lastOrder: action.results.lastQuery.lastOrder,
            text: null,
            vals: null,
            lastQueryForRefresh: {
              text: action.results.lastQuery.text,
              vals: action.results.lastQuery.vals
            }
          },
          offset: action.results.results.length,
          refreshFinish: false,
          error: null

        }
    case REFRESH_BROWSE_ASYNC:
        let newOffset = state.offset + action.results.results.length
        if (action.results.results.length === 0) {
          return {
            ...state,
            refreshFinish: true,
            error: null
          }
        } 
         else {
          return {
            ...state,
            results: [...state.results, ...action.results.results],
            offset: newOffset,
            refreshFinish: false,
            error: null
          }
        }
    case FETCH_BROWSE_SAVE_LASTOPTIONS:
          return {
            ...state,
            lastOptions: {
              time: action.time,
              genre: action.genre,
              type: action.type
            },
            error: null
          }
    case RESET_BROWSE:
          return {
            ...state,
            lastOptions: null,
            error: null
          }
    case actionTypes.SAVE_BROWSE_TAGS:
        return {
          ...state,
          tags: action.tags,
          error: null
        }
    case actionTypes.SAVE_XTRA_BROWSE:
        return {
          ...state,
          xtraOptions: action.options,
          error: null
        }
    case CLEAR_BROWSE_ERROR:
        return {
          ...state,
          error: null
        }
    case BROWSE_FINISH_MSG:
        return {
          ...state,
          lastQuery: {
            ...state.lastQuery,
            finishMsgShown: true
          }
        }
    case "SET_BROWSE_MODAL_OPEN":
        return {
          ...state,
          modalOpen: true
        }
    case "SET_BROWSE_MODAL_CLOSED":
        return {
          ...state,
          modalOpen: false
        }
    case "SET_BROWSE_MSG":
        return {
            ...state,
            msg: {
              active: true,
              msg: action.msg,
            }
        }
    case "RESET_BROWSE_MSG":
        return {
            ...state,
            msg: {
              active: false,
              msg: '',
            }
            
        }
    case "REMOVE_BROWSE_MSG":
        return {
          ...state,
          msg: {
            ...state.msg,
            active: false
          }
        }
        
      default: 
            return state
    }
  }

export default browseReducer;