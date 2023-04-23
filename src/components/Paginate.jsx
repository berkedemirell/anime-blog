import React from "react";
import { Link } from "react-router-dom";

export const Paginate = ({
  postsPerPage,
  totalPosts,
  paginate,
  previousPage,
  nextPage,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      <ul className="pagination">
        {pageNumbers.length === 1 ? (
          ""
        ) : (
          <Link onClick={previousPage}>
            <li className="page-number">Prev</li>
          </Link>
        )}
        {pageNumbers.map((number) => (
          <Link onClick={() => paginate(number)}>
            <li key={number} className="">
              {number}
            </li>
          </Link>
        ))}
        {pageNumbers.length === 1 ? (
          ""
        ) : (
          <Link>
            <li className="page-number" onClick={nextPage}>
              Next
            </li>{""}
          </Link>
        )}
      </ul>
      <h4 className="pagination-nav">
        {currentPage} / {pageNumbers.length}
      </h4>
    </div>
  );
};
