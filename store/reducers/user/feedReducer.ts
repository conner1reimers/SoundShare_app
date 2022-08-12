
interface FeedActions {
  id: string
  user_id: number
  target_id: number
  type: string
  date: string
  second_target_id: any
}

interface FeedSoundData {
  id: string
  img_path: string | any
  reposts: Array<any>
  favs: Array<any>
  name: string
  downloads: number
  path: string
  username: string
  description: string | any
  sound_creator_id: number
  date_time: string
  type: string
  sound_id: null | any
  message: null | any
  creator_id: null | any
  com_id: null | any
}

export interface FeedUserData {
  id: string
  email: string
  username: string
  password: string
  comments: Array<any>
  join_date: string
  following: Array<any>
  user_img_path: any
  bio: string | null
  twitter_link: string | any
  facebook_link: string | any
  instagram_link: string | any
  youtube_link: string | any
}

interface FeedRepostData {
  user_id: number
  sound_id: number
  repost_date: string
}

export interface FeedState {
  actions: Array<FeedActions> 
  soundData: Array<FeedSoundData> 
  userData: Array<FeedUserData> 
  repostData: Array<FeedRepostData> 
}

const initialState: FeedState = {
  actions: [],
  soundData: [],
  userData: [{
    id: '',
    email: '',
    username: '',
    password: '',
    comments: [],
    join_date: '',
    following: [],
    user_img_path: '',
    bio: '',
    twitter_link: '',
    facebook_link: '',
    instagram_link: '',
    youtube_link: ''
  }],
  repostData: []
}


const feedReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'FETCH_FEED_ASYNC':
        return {
          ...state,
          actions: action.results.actions,
          soundData: action.results.soundData,
          userData: action.results.userData,
          repostData: action.results.repostData,
        }
    
        
      default: 
            return state
    }
  }

export default feedReducer;