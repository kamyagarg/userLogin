export const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,15}$/;
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const USER_ACCOUNTS_URL =
  // "https://mocki.io/v1/1637e8f6-f7b3-45e2-bc69-82dca4a96b2e";
  // "https://mocki.io/v1/1b68488f-2f0d-4a1e-805b-bd5d4b2f6120";
  "https://mocki.io/v1/ad74b4eb-4f0a-4553-9db2-7a31d36483c9";
export const LOGIN_URL =
  "https://mocki.io/v1/0ad34513-c38e-4f45-a9a7-d59efb70f356";

export const SEARCH_BAR_PLACEHOLDER = "Search";
export const EMAIL_CONST = "email";
export const CLOSE_CONST = "close";

export const GMAIL_DOMAIN_CONST = "gmail.com";
export const YAHOO_DOMAIN_CONST = "yahoo.com";
export const OUTLOOK_DOMAIN_COST = "outlook.com";

export const loginFieldsError = {
  userNameError: "Invalid Username",
  passWordError: "Invalid Password",
};

export const NOT_A_MEMBER = "You are not registered with us!";

const database = [
  {
    username: "user1",
    password: "pass1",
  },
  {
    username: "user2",
    password: "pass2",
  },
];
