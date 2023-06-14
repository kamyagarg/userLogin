import React from "react";

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
  const pageNumbers = nPages && [...Array(nPages + 1).keys()].slice(1);
  console.log("pageNumbers", pageNumbers);

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  return (
    <div className="pagination displayflex justifyContentCenter alignItemCenter">
      <span className="pageItem">
        <button className="pageLink arrow" onClick={prevPage}>
          &lt;
        </button>
      </span>
      {Array.isArray(pageNumbers) &&
        pageNumbers?.map((pgNumber) => (
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
        <button className="pageLink arrow" onClick={nextPage}>
          &gt;
        </button>
      </span>
    </div>
  );
};

export default Pagination;
