const initialState = {
  notif: false,
  xtra: false,
};

const navbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_NOTIFICATIONS":
      return {
        xtra: false,
        notif: !state.notif,
      };
    case "TOGGLE_NAVBAR_XTRA":
      return {
        xtra: !state.xtra,
        notif: false,
      };
    case "CLOSE_NAVBAR_OPTIONS":
      return {
        xtra: false,
        notif: false,
      };
    default:
      return state;
  }
};

export default navbarReducer;
