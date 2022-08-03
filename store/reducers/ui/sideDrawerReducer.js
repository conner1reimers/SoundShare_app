
const initialState = {
  open: false,
  authModalOpen: false
  
}


const sideDrawerReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'OPEN_SIDE_DRAWER':
        return {
          ...state,
          open: true
        }
        case 'CLOSE_SIDE_DRAWER':
            return {
            ...state,
            open: false
        }
      case 'OPEN_AUTH_MODAL':
        return {
          ...state,
          authModalOpen: true
        }
      case 'CLOSE_AUTH_MODAL':
          return {
          ...state,
          authModalOpen: false
      }
    
        
      default: 
            return state
    }
  }

export default sideDrawerReducer;