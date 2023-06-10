import { Fragment, useState } from "react";
import {
  EMAIL_CONST,
  GMAIL_DOMAIN_CONST,
  YAHOO_DOMAIN_CONST,
  OUTLOOK_DOMAIN_COST
} from "../../common/Constants";

import gmail from "../../Assets/Icons/gmail.svg";
import outlook from "../../Assets/Icons/outlook.svg";
import yahoo from "../../Assets/Icons/yahoo.svg";
import mailbox from "../../Assets/Icons/mailbox.svg";

const AccountInfo = (props) => {
  const {
    details: { email, domain }
  } = props;

  const iconMapping = {
    [GMAIL_DOMAIN_CONST]: gmail,
    [YAHOO_DOMAIN_CONST]: yahoo,
    [OUTLOOK_DOMAIN_COST]: outlook
  };

  return (
    <div>
      <div></div>
      <div>
        <img src={iconMapping[domain] ?? mailbox} alt={EMAIL_CONST} />
        <div>{email}</div>
      </div>
    </div>
  );
};

export default AccountInfo;
