import { SET_USER_ACCOUNTS } from "./Types";

const INITIAL_STATE = {
  loggedInUserIDs: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER_ACCOUNTS: {
      return {
        ...state,
        loggedInUserIDs: action.data
      };
    }
    default:
      return state;
  }
};
