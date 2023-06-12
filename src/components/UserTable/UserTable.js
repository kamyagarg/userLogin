import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { response } from "../../common/Mockdata";
import AccountInfo from "../AccountInfo/AccountInfo";
import SearchBar from "../SearchBar/SearchBar";
import CommonModal from "../../common/CommonComponents/CommonModal";
import { setLastAccessedAt } from "../../Redux/Actions";
import { USER_ACCOUNTS_URL } from "../../common/Constants";
import Pagination from "../Pagination/Pagination";
import "../../common/globalStyles.css";

import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import DeselectIcon from "@mui/icons-material/Deselect";

const UserTable = () => {
  const { loggedInUserCreds } = useSelector((state) => state?.loginReducers);
  const [accountsToDisplay, setAccountsToDisplay] = useState([]);
  const [modifiedList, setModifiedList] = useState();
  const [displayAccountDetails, setDisplayAccountDetails] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState({});
  const [markFav, setMarkFav] = useState(false);
  const [isGrouped, setIsGrouped] = useState(false);
  const [favAccounts, setFavAccounts] = useState([]);
  const [toggledSort, setToggleSort] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(3);
  const nPages = Math.ceil(accountsToDisplay?.length / recordsPerPage);

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
    setModifiedList(accounts?.availableIds.slice(0, 3));
  }

  // useEffect(() => {
  //   const storedVal = JSON.parse(localStorage.getItem("USER_EMAIL_ACCOUNTS"));
  //   if (storedVal && storedVal?.length !== 0) {
  //     setAccountsToDisplay(storedVal);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem(
  //     "USER_EMAIL_ACCOUNTS",
  //     JSON.stringify(loggedInUserCreds)
  //   );
  // }, [loggedInUserCreds]);

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

  function debounce(fn, delay) {
    let timerId;
    return (...arg) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        fn(...arg);
      }, delay);
    };
  }

  function searchTerm(searchTerm) {
    if (!searchTerm.length) {
      setModifiedList(accountsToDisplay);
    }
    const filteredAccountsList = accountsToDisplay.filter((account) => {
      return account.email.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setModifiedList(filteredAccountsList);
  }

  const debounceSearchingTerm = debounce(searchTerm, 350);

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

  function toggleFav() {
    if (favAccounts.length === 0) {
      setShowErrorMessage("Please mark favourite");
      setTimeout(() => {
        setShowErrorMessage("");
      }, 1000);
      return;
    }
    if (favAccounts.length && !isGrouped) {
      const groupByFavAcc = modifiedList.filter((acc) => {
        if (favAccounts.includes(acc.email)) return acc;
      });
      setModifiedList(groupByFavAcc);
    } else {
      setModifiedList(accountsToDisplay);
    }
    setIsGrouped(!isGrouped);
  }

  function accountsForPaginations() {
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = accountsToDisplay.slice(
      indexOfFirstRecord,
      indexOfLastRecord
    );
    setModifiedList(currentRecords);
  }

  const groupBy = (key) => (array) =>
    array.reduce((objectsByKeyValue, obj) => {
      const value = obj[key];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});

  return (
    <div className="displayflex flexDirectionColumn alignItemCenter justifyContentCenter">
      <span>User Details</span>
      <div className="displayflex alignItemCenter justifyContentCenter">
        <SearchBar searchVal={debounceSearchingTerm} />
        <span className="groupByType" onClick={toggleFav}>
          {isGrouped ? "Show All" : "Show Favourites"}
        </span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Favourite</th>
            <th onClick={() => handleSortAccounts("email")}>
              Account Id <SwapVertIcon />
            </th>
            <th onClick={() => handleSortAccounts("lastAccessedAt")}>
              Last Accessed
              <SwapVertIcon />
            </th>
          </tr>
        </thead>
        <tbody>
          {modifiedList?.map((account) => {
            const { email, lastAccessedAt } = account;
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
                  <td>{lastAccessedAt}</td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
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
