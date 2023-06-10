import { useState } from "react";
import { SEARCH_BAR_PLACEHOLDER } from "../../common/Constants";

const SearchBar = (props) => {
  const { searchVal } = props;
  const [searchBarVal, setSearchBarVal] = useState("");
  // console.log("deatils 1", details);

  function handleSearchInput(e) {
    const searchedValue = e.target.value;
    setSearchBarVal(searchedValue);
    searchVal(searchedValue);
  }

  return (
    <div>
      <input
        value={searchBarVal}
        placeholder={SEARCH_BAR_PLACEHOLDER}
        onChange={handleSearchInput}
      />
    </div>
  );
};

export default SearchBar;
