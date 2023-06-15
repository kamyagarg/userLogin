import { useState, useEffect } from "react";

const Pagination = (props) => {
  const {recordsToShowPerPage, lengthOfTotalAccount,currentPage , changeCurrentPage} = props;
  
  const [totalNumberOfPages, setTotalNumberOfPages] = useState()
  const [pageNumbersArray, setPageNumbersArray] = useState([])
  
  useEffect(() => {
      const totalNumber = Math.ceil( lengthOfTotalAccount / recordsToShowPerPage)
      const pageNumbersArray = totalNumber && [...Array(totalNumber + 1).keys()].slice(1);
      setTotalNumberOfPages(totalNumber)
      setPageNumbersArray(pageNumbersArray);
  },[recordsToShowPerPage, lengthOfTotalAccount])

  const nextPage = () => {
    if (currentPage !== totalNumberOfPages) changeCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) changeCurrentPage(currentPage - 1);
  };
  return (
    <div className="pagination displayflex justifyContentCenter alignItemCenter">
      <span className="pageItem">
        <button className="pageLink arrow" onClick={prevPage}>
          &lt;
        </button>
      </span>
      {!pageNumbersArray && <div>1</div>}
      {Array.isArray(pageNumbersArray) &&
        pageNumbersArray?.map((pgNumber) => (
          <span
            key={pgNumber}
            className={`pageItem pageLink ${currentPage == pgNumber ? "active" : ""} `}
            onClick={() => changeCurrentPage(pgNumber)}
          >
            {pgNumber}
          </span>
        ))}
      <span className="pageItem">
        <button className="pageLink arrow" onClick={nextPage}>
          &gt;
        </button>
      </span>
    </div>
  );
};

export default Pagination;
