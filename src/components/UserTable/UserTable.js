import { Fragment, useState } from "react";
// import { response } from "../../common/Mockdata";
import AccountInfo from "../AccountInfo/AccountInfo";
import SearchBar from "../SearchBar/SearchBar";
import CommonModal from "../../common/CommonComponents/CommonModal";
import { useSelector } from "react-redux";
import "../../common/globalStyles.css";

import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

const UserTable = () => {
  const { loggedInUserIDs } = useSelector((state) => state.loginReducer);
  const avaAccounts = loggedInUserIDs;

  const [accountsToDisplay, setAccountsToDisplay] = useState(avaAccounts);
  const [displayAccountDetails, setDisplayAccountDetails] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState({});
  const [markFav, setMarkFav] = useState(false);
  const [favAccounts, setFavAccounts] = useState([]);

  function handleAccountClick(accountInfo) {
    console.log("selected account", accountInfo);
    setSelectedAccount(accountInfo);
    setDisplayAccountDetails(true);
  }

  function toggleFavouriteAcc(email) {
    ``
    setMarkFav(!markFav);
    let favIds = [];
    const alreadyMarkedFav = favAccounts.includes(email);
    if (alreadyMarkedFav) {
      favIds = favAccounts.filter((id) => id !== email);
    } else favIds = [...favAccounts, email];
    setFavAccounts(favIds);
  }

  function handleSearch(value) {
    if (value === "") {
      setAccountsToDisplay(avaAccounts);
      return;
    }
    const filteredAcc = accountsToDisplay.filter((account) => {
      return account.email.toLowerCase().includes(value.toLowerCase());
    });
    setAccountsToDisplay(filteredAcc);
  }

  return (
    <div className="displayflex flexDirectionColumn alignItemCenter justifyContentCenter">
      <span>User Details</span>
      <SearchBar searchVal={handleSearch} />
      <table>
        <thead>
          <tr>
            <th>Favourite</th>
            <th>Account Id</th>
            <th>Last Accessed</th>
          </tr>
        </thead>
        <tbody>
          {accountsToDisplay?.map((account) => {
            const { email } = account;
            return (
              <Fragment key={email}>
                <tr>
                  <td onClick={() => toggleFavouriteAcc(email)}>
                    {favAccounts.includes(email) ? (
                      <StarIcon />
                    ) : (
                      <StarBorderIcon />
                    )}
                  </td>
                  <td onClick={() => handleAccountClick(account)}>{email}</td>
                  <td>{ }</td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
      {displayAccountDetails && (
        <CommonModal
          display={displayAccountDetails}
          onClose={() => setDisplayAccountDetails(false)}
        >
          <AccountInfo details={selectedAccount} />
        </CommonModal>
      )}
    </div>
  );
};

export default UserTable;
