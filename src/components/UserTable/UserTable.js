import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { response } from "../../common/Mockdata";
import AccountInfo from "../AccountInfo/AccountInfo";
import SearchBar from "../SearchBar/SearchBar";
import CommonModal from "../../common/CommonComponents/CommonModal";
import { USER_ACCOUNTS_URL } from "../../common/Constants";
import Pagination from "../Pagination/Pagination";
import { debounce } from "../../common/Utils";
import "../../common/globalStyles.css";

import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import SwapVertIcon from "@mui/icons-material/SwapVert";

const UserTable = () => {
  const { loggedInUserCreds } = useSelector((state) => state?.loginReducers);
  const [accountsToDisplay, setAccountsToDisplay] = useState([]);
  const [modifiedList, setModifiedList] = useState();
  const [displayAccountDetails, setDisplayAccountDetails] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState({});
  const [markFav, setMarkFav] = useState(false);
  const [favAccounts, setFavAccounts] = useState([]);
  const [toggledSort, setToggleSort] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [toggleMarkAllFav, setToggleMarkAllFav] = useState(false);
  const [recordsToShowPerPage] = useState(4);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    accountsForPaginations();
  }, [currentPage]);

  async function fetchData() {
    const res = await fetch(USER_ACCOUNTS_URL);
    const data = await res.json();
    const accounts = data.find((userCreds) => {
      if (
        userCreds.username === loggedInUserCreds.username &&
        userCreds.password === loggedInUserCreds.password
      ) {
        return userCreds.availableIds;
      }
    });
    setAccountsToDisplay(accounts?.availableIds);
    setModifiedList(accounts?.availableIds.slice(0, recordsToShowPerPage));
  }

  function handleAccountClick(accountInfo) {
    setSelectedAccount(accountInfo);
    setDisplayAccountDetails(true);
  }

  function toggleFavouriteAcc(email) {
    setMarkFav(!markFav);
    let favIds = [];
    const alreadyMarkedFav = favAccounts.includes(email);
    if (alreadyMarkedFav) {
      favIds = favAccounts.filter((id) => id !== email);
    } else favIds = [...favAccounts, email];
    setFavAccounts(favIds);
  }

  function handleToggleSelectAllFavourites() {
    setToggleMarkAllFav(!toggleMarkAllFav);
    if (toggleMarkAllFav) {
      setFavAccounts([]);
    } else {
      const allFavAcc = accountsToDisplay.map((acc) => acc.email);
      setFavAccounts(allFavAcc);
    }
  }

  function onTermSearch(searchTerm) {
    if (!searchTerm?.length) {
      accountsForPaginations();
    } else {
      const filteredAccountsList = accountsToDisplay.filter((account) => {
        return account.email.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setModifiedList(filteredAccountsList);
    }
  }

  const debounceSearchingTerm = debounce(onTermSearch, 350);

  function handleSortAccounts(sortByAttribute) {
    let sortedAccounts;
    if (toggledSort) {
      sortedAccounts = modifiedList.sort((a, b) => {
        return a[sortByAttribute].localeCompare(b[sortByAttribute]);
      });
    } else {
      sortedAccounts = modifiedList.sort((a, b) => {
        return b[sortByAttribute].localeCompare(a[sortByAttribute]);
      });
    }
    setToggleSort(!toggledSort);
    setModifiedList(sortedAccounts);
  }

  // const groupBy = (key) => (array) =>
  //   array.reduce((objectsByKeyValue, obj) => {
  //     const value = obj[key];
  //     objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
  //     return objectsByKeyValue;
  //   }, {});
    
    const toggleGroupping = key => {
  const list = modifiedList.reduce((accumulator, obj) => (
    {
      ...accumulator,
      [obj[key]]: (accumulator[obj[key]] || []).concat(obj)
    }),{}
  );
  
  console.log("groupped list",list)
  }

  function accountsForPaginations() {
    const indexOfLastRecord = currentPage * recordsToShowPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsToShowPerPage;
    const currentRecords = accountsToDisplay.slice(
      indexOfFirstRecord,
      indexOfLastRecord
    );
    setModifiedList(currentRecords);
  }

  return (
    <div className="displayflex flexDirectionColumn alignItemCenter justifyContentCenter">
      <span>User Details</span>
      <div className="displayflex alignItemCenter justifyContentCenter">
        <SearchBar searchVal={debounceSearchingTerm} />
        <span className="groupByType" onClick={() => toggleGroupping('domain')}>
          Group by: email
        </span>
      </div>
      <table>
        <thead>
          <tr>
            <th className="tableHeader">
              <div onClick={handleToggleSelectAllFavourites}>
                {toggleMarkAllFav ? <StarIcon /> : <StarBorderIcon />}
              </div>
              <span>Favourite</span>
            </th>
            <th
              className="tableHeader"
              onClick={() => handleSortAccounts("email")}
            >
              <span>Account Id </span>
              <SwapVertIcon />
            </th>
            <th
              className="tableHeader"
              onClick={() => handleSortAccounts("lastAccessedAt")}
            >
              <span> Last Accessed</span>
              <SwapVertIcon />
            </th>
          </tr>
        </thead>
        <tbody>
          {console.log("here, mpdofeirf list", modifiedList)}
          {modifiedList?.map((account) => {
            const { email, lastAccessedAt } = account;
            return (
              <Fragment key={email}>
                <tr>
                  <td onClick={() => toggleFavouriteAcc(email)}>
                    {console.log("fav accounts", favAccounts)}
                    {favAccounts?.includes(email) ? (
                      <StarIcon />
                    ) : (
                      <StarBorderIcon />
                    )}
                  </td>
                  <td onClick={() => handleAccountClick(account)}>{email}</td>
                  <td>{lastAccessedAt}</td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
      <Pagination
        recordsToShowPerPage={recordsToShowPerPage}
        lengthOfTotalAccount={accountsToDisplay?.length}
        currentPage={currentPage}
        changeCurrentPage={setCurrentPage}
      />

      {showErrorMessage && <div>{showErrorMessage}</div>}
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
