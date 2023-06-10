export const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,15}$/;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const LOGIN_URL =
  "https://mocki.io/v1/1637e8f6-f7b3-45e2-bc69-82dca4a96b2e";

export const SEARCH_BAR_PLACEHOLDER = "Search";
export const EMAIL_CONST = "email";
export const CLOSE_CONST = "close";

export const GMAIL_DOMAIN_CONST = "gmail.com";
export const YAHOO_DOMAIN_CONST = "yahoo.com";
export const OUTLOOK_DOMAIN_COST = "outlook.com";

export const loginFieldsError = {
  userNameError: "Invalid Username",
  passWordError: "Invalid Password"
};

const database = [
  {
    username: "user1",
    password: "pass1"
  },
  {
    username: "user2",
    password: "pass2"
  }
];
