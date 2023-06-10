import { SET_USER_ACCOUNTS } from "./Types";

export const setUserIds = (ids) => {
  return {
    type: SET_USER_ACCOUNTS,
    data: ids
  };
};
