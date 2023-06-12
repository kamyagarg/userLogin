import { SET_LOGGED_IN_USER_ID } from "./Types";

export const setLoggedInUserCreds = (creds) => {
  return {
    type: SET_LOGGED_IN_USER_ID,
    payload: creds,
  };
};
