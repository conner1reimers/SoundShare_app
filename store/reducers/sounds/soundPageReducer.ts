import { HYDRATE } from "next-redux-wrapper"

interface SoundComment {
  com_id: string | number,
  comment_creator: number | string,
  comment_date: string | Date,
  message: string,
  user_img_path: string,
  username: string
};

interface SoundData {
  name: string,
  size: string,
  lastmodified: number
};


interface Sound {
  bpm: number,
  category: string,
  comments: Array<any>,
  creator_id: number,
  data: SoundData,
  date: Date,
  date_time: string,
  description: string,
  document_with_weights: string,
  downloads: number,
  favs: Array<any>,
  genre: string,
  id: number,
  img_path: null,
  listorder: null,
  name: string,
  path: string,
  reposts: Array<any>,
  tags: Array<any>,
  type: string,
  username: string,
  xtra_tags: Array<any>,
  isFavorited: Boolean
}


export interface SoundState {
  comments: Array<SoundComment>,
  offset: number,
  refreshFinished: Boolean,
  sound: Sound
}


const initState: SoundState = {
  comments: [],
  offset: 0,
  refreshFinished: false,
  sound: null
}



interface ActionsForUi {
  type: string,
  results: any | null,
  payload: any | null
}


type ActionTypes = ActionsForUi




const soundpageReducer = (state = initState, action: ActionTypes) => {
  switch (action.type) {
      
    case HYDRATE: {
      if (action.payload) {
          return { ...state, ...action.payload.singleSound }
      } else {
          return {...state}
      }

    }
    
    case "FETCH_SINGLE_SOUND_SERVER_ASYNC":
      return {
        ...action.results,
        refreshFinished: true
      }
    case "FETCH_SINGLE_SOUND_ASYNC":
      return {
        ...action.results,
        refreshFinished: true
      }
    case "EDIT_SOUND_NAME":
      return {
        ...state,
        sound: {
            ...state.sound,
            name: action.payload
        }
      }
    case "SINGLESOUND_UNFAV":
      const newLikes =
        state.sound.favs.filter((el: any) => el !== action.payload.tostring());

      return {
        ...state,
        sound: {
          ...state.sound,
          favs: newLikes,
          isFavorited: false
        }
      }
    case "SINGLESOUND_NEW_FAV":
      const newFav = [...state.sound.favs, action.payload.tostring()];
      return {
        ...state,
        sound: {
          ...state.sound,
          favs: newFav,
          isFavorited: true
        }
      }
    case "SINGLESOUND_NEW_COMMENT":
      let newComments = [action.payload, ...state.comments];
      return {
        ...state,
        comments: newComments,
        offset: state.offset + 1
      }

    case 'FETCH_MORE_COMMENTS':
      let moreComments = [...state.comments, ...action.payload];

      return {
        ...state,
        comments: moreComments,
        refreshFinish: action.payload.length < 20,
        offset: moreComments.length
      }
    case "SINGLESOUND_DELETE_COMMENT":
      const newCommentsDeleted = state.comments.filter(el => {
        return el !== state.comments[action.payload]
      })
      return {
        ...state,
        comments: newCommentsDeleted,
        offset: state.offset - 1
      }
    case "SINGLESOUND_UPDATE_COMMENT":
      let items = [...state.comments];

      let item = {
        ...items[action.payload.indx],
        message: action.payload.msg
      }

      items[action.payload.indx] = item;

      return {
        ...state,
        comments: items
      }
    case "SINGLESOUND_CHANGE_IMG":
      return {
        ...state,
        sound: {
            ...state.sound,
            img_path: action.payload
        }
      }
    case "SINGLESOUND_REMOVE_REPOST":
      const newRepostsRemoved = state.sound.reposts.filter((el: any) => {
        return el !== action.payload.toString()
      });

      return {
        ...state,
        sound: {
          ...state.sound,
          reposts: newRepostsRemoved
        }
      }
    case "SINGLESOUND_REPOST":
      const newReposts = [...state.sound.reposts, action.payload.toString()];

      
      return {
        ...state,
        sound: {
          ...state.sound,
          reposts: newReposts
        }
      }
    
    case "SINGLESOUND_UPDATE_DESC":
      return {
        ...state,
        sound: {
            ...state.sound,
            description: action.payload
        }
    }
    default: 
          return state
  }
}

export default soundpageReducer;