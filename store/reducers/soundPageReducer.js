
const initialState = {
  curOffset: 0,
  soundId: null
//   sound: {
//     bpm: null,
//     comments: null,
//     creator_id: 6,
//     data: null,
//     date: null,
//     date_time: null,
//     description: null,
//     downloads: null,
//     favs: null,
//     genre: null,
//     id: null,
//     img_path: null,
//     name: null,
//     path: null,
//     reposts: null,
//     tags: null,
//     type: null,
//     username: null,
//     xtra_tags: null,
//   },


}


const soundpageReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_MORE_COMMENTS':
        return action.result || state
 
      default: 
            return state
    }
  }

export default soundpageReducer;