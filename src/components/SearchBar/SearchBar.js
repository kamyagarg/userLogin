import { useState } from "react";
import { SEARCH_BAR_PLACEHOLDER } from "../../common/Constants";

const SearchBar = (props) => {
  const { searchVal } = props;
  const [searchBarVal, setSearchBarVal] = useState("");

  function handleSearchInput(e) {
    const searchedValue = e.target.value;
    setSearchBarVal(searchedValue);
    searchVal(searchedValue);
  }

  return (
    <div className="wrap">
      <div className="search">
        <input
          type="text"
          className="searchTerm"
          value={searchBarVal}
          placeholder={SEARCH_BAR_PLACEHOLDER}
          onChange={handleSearchInput}
        />
      </div>
    </div>
  );
};

export default SearchBar;
