import React from "react";

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  return (
    <div className="pagination displayflex justifyContentCenter alignItemCenter">
      <span className="pageItem">
        <span className="pageLink arrow" onClick={prevPage}>
          &lt;
        </span>
      </span>
      {pageNumbers.map((pgNumber) => (
        <span
          key={pgNumber}
          className={`pageItem ${currentPage == pgNumber ? "active" : ""} `}
        >
          <span onClick={() => setCurrentPage(pgNumber)} className="pageLink">
            {pgNumber}
          </span>
        </span>
      ))}
      <span className="pageItem">
        <span className="pageLink arrow" onClick={nextPage}>
          &gt;
        </span>
      </span>
    </div>
  );
};

export default Pagination;
