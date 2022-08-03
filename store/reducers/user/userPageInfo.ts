import { HYDRATE } from "next-redux-wrapper"

export interface UserpageState {
  following: any,
  date_joined: any,
  loading: any,
  followers: any,
  editOpen: any,
  refreshOptions: any,
  user: any,
  sounds: any,
  reposts: any,
  actions: any,
  loaded: any,
  favSounds: any,
  soundsOnlyUser: any,
  userReposts: any,
  recentActivities: any

}

const initialState: UserpageState = {
  following: false,
  date_joined: null,
  loading: true,
  followers: null,
  editOpen: false,
  refreshOptions: {
    soundFinished: false,
    repostFinished: false,
    favFinished: false

  },
  user: {
    username: null,
    bio: null,
    id: null,
    twitter_link: null,
    instagram_link: null,
    youtube_link: null,
    facebook_link: null,
    favs: [],
    reposts: null,
    user_img_path: null,
    followers: [],
    sounds: [],
    join_date: null,
    store_link: null
    
  },
  sounds: [],
  reposts: [],
  actions: null,
  loaded: false,
  favSounds: null,
  soundsOnlyUser: null,
  userReposts: null,
  recentActivities: null

}


const userPageReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case HYDRATE: {
      if (action.payload) {
          return { ...state, ...action.payload.userPage }
      } else {
          return {...state}
      }
      
    }
    case 'FETCH_USER_ASYNC':
        return {
          ...action.results,
          loaded: true,
          refreshOptions: {
            ...action.results.refreshOptions,

          }
        
      } || state
      
      case 'FETCH_USER_SERVER_ASYNC':
        return {
          ...action.results,
          loaded: true,
          refreshOptions: {
            ...action.results.refreshOptions,

          }
        
      } || state
    
    
      case 'FOLLOW_USER':
        return {
          ...state,
          following: true
        }
      case 'UNFOLLOW_USER':
        return {
          ...state,
          following: false
        }
      case 'FETCH_FOLLOWERS_ASYNC':
        return {
          ...state,
          followers: action.results || []
        }
      case 'OPEN_CLOSE_USERPAGE_EDIT':
        return {
          ...state,
          editOpen: !state.editOpen
        }
      case 'CLOSE_USERPAGE_EDIT':
        return {
          ...state,
          editOpen: false
        }
      case 'CHANGE_USER_BIO':
        return {
          ...state,
          user: {
            ...state.user,
            bio: action.bio
          }
        }
      case 'CHANGE_USER_SOCIAL':
        let newLink: any = action.link;
        const regExHttps = /https:/gi;
        const hasHttps = regExHttps.test(action.link);
      
        if (!hasHttps) {
          newLink = 'https://' + action.link;
        }

        if (action.social === 'insta') {
          return {
            ...state,
            user: {
              ...state.user,
              instagram_link: newLink
            }
          }
        } else if (action.social === 'youtube') {
          return {
            ...state,
            user: {
              ...state.user,
              youtube_link: newLink
            }
          }
        } else if (action.social === 'twitter') {
          return {
            ...state,
            user: {
              ...state.user,
              twitter_link: newLink
            }
          }
        } else if (action.social === 'facebook') {
          return {
            ...state,
            user: {
              ...state.user,
              facebook_link: newLink
            }
          }
        }
        break
      case 'CHANGE_USER_STORE':
        let newStoreLink: any = action.link;
        const storeRegExHttps = /https:/gi;
        const storeHasHttps = storeRegExHttps.test(action.link);
      
        if (!storeHasHttps) {
          newStoreLink = 'https://' + action.link;
        }
        return {
          ...state,
          user: {
            ...state.user,
            store_link: newStoreLink
          }
        }
        
      case 'REFRESH_USER_REPOSTS':
        return {
          ...state,
          userReposts: [...state.userReposts, ...action.sounds],
          refreshOptions: {
            ...state.refreshOptions,
            offsetReposts: state.refreshOptions.offsetReposts + action.sounds.length,
            repostFinished: action.sounds.length < 17
          }
          
        }
      case 'REFRESH_USER_FAVS':
        return {
          ...state,
          favSounds: [...state.favSounds, ...action.sounds],
          refreshOptions: {
            ...state.refreshOptions,
            offsetFavs: state.refreshOptions.offsetFavs + action.sounds.length,
            favFinished: action.sounds.length < 17
          }
          
        }
      case 'REFRESH_USER_SOUNDS':
        return {
          ...state,
          soundsOnlyUser: [...state.soundsOnlyUser, ...action.sounds],
          refreshOptions: {
            ...state.refreshOptions,
            offsetSounds: state.refreshOptions.offsetSounds + action.sounds.length,
            soundFinished: action.sounds.length < 17
          }
          
        }
      case 'NEW_USER_PIC':
        return {
          ...state,
         user: {
           ...state.user,
           user_img_path: action.path
         }
          
        }
      case 'RESET_USER':
        return initialState
      
      default: 
            return state
    }
  }

export default userPageReducer;