import { SET_LOGGED_IN_USER_ID, LOL } from "./Types";

const INITIAL_STATE = {
  loggedInUserCreds: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOGGED_IN_USER_ID: {
      return {
        ...state,
        loggedInUserCreds: action.payload,
      };
    }
    default:
      return state;
  }
};
