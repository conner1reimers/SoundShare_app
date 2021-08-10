export interface UserState {
  isLoggedIn: boolean,
  userId: any,
  token: any,
  userName: any,
  full: any,
  uncheckedNotifications: any,
  notifications: any,
  navbar: any,
  master: boolean
}

const initialState: UserState = {
  isLoggedIn: false,
  userId: null,
  token: null,
  userName: null,
  full: {
    reposts: [],
    favs: null,
    sounds: [],
    following: [],
    followers: [],
    comments: [],
    
  },
  uncheckedNotifications: null,
  notifications: [],
  navbar: {
    notif: false,
    xtra: false,
  },
  master: false

};



//REDUCER
const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SIGN_IN":
      
      return {
        ...state,
        isLoggedIn: true,
        userId: action.userId,
        token: action.token,
        userName: action.userName,
        following: action.following,
      };
    case "LOGOUT":
      return initialState;
    case "FETCH_LOGGED_USER_ASYNC":
      const uncheckedNotifications = action.results.notifications.filter(
        (el: any) => {
          return el.checked === false;
        }
      );
      return {
        ...state,
        full: action.results.user,
        notifications: action.results.notifications,
        uncheckedNotifications,
      };
    case "CLEAR_NOTIFICATIONS":
      return {
        ...state,
        uncheckedNotifications: null,
      };
    case "GET_ALL_NOTIFICATIONS":
      return {
        ...state,
        notifications: action.results,
      };
    case "FOLLOW_A_USER": 
      return {
        ...state,
        full: {
          ...state.full,
          following: [...state.full.following, action.id]

        }
      }
    case "UNFOLLOW_A_USER": 
      const newFollowingArray = state.full.following.filter((el: any) => {
        return el !== action.id
      }) 
      return {
        ...state,
        full: {
          ...state.full,
          following: newFollowingArray

        }
      }
    case "USER_FAV_SOUND": 
      return {
        ...state,
        full: {
          ...state.full,
          favs: [...state.full.favs, action.id]

        }
      }
    case "USER_UNFAV_SOUND": 
      const newFavsArray = state.full.favs.filter((el: any) => {
        return el !== action.id
      }) 
      return {
        ...state,
        full: {
          ...state.full,
          favs: newFavsArray

        }
      }
    case "USER_REPOST_SOUND": 
      return {
        ...state,
        full: {
          ...state.full,
          reposts: [...state.full.reposts, action.id]

        }
      }
    case "USER_UNREPOST_SOUND": 
      const newReposts = state.full.reposts.filter((el: any) => {
        return el !== action.id
      }) 
      
      return {
        ...state,
        full: {
          ...state.full,
          reposts: newReposts

        }
      }
    case 'NEW_MAIN_USER_PIC':
        return {
          ...state,
         full: {
           ...state.full,
           user_img_path: action.path
         }
          
        }
    case "CHECK_COOKIE_ASYNC":
      if (action.results.msg === 'LOGGED IN!') {
        const uncheckedNotifications = action.results.notifications.filter(
          (el: any) => {
            return el.checked === false;
          }
        );
        return {
          ...state,
          userId: action.results.res.id,
          userName: action.results.res.username,
          token: action.results.token,
          isLoggedIn: true,
          full: action.results.res,
          notifications: action.results.notifications,
          uncheckedNotifications
        };
      } else {
        return state
      }
    case "SET_MASTER_USER":
      return {
        ...state,
        master: true
      }

    default:
      return state;
  }
};

export default userReducer;
