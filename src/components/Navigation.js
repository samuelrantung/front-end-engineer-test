import React from "react";

const Navigation = ({ currentPage, next, previous }) => {
  return (
    <div className="navigation">
      <a onClick={() => previous(currentPage)} href="#" className="previous">
        &laquo; Previous
      </a>
      <div className="pageNumber">
        <p>{currentPage + 1}</p>
      </div>
      <a onClick={() => next(currentPage)} href="#" className="next">
        Next &raquo;
      </a>
    </div>
  );
};

export default Navigation;
