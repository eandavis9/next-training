import React from 'react';

const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [...Array(totalPages).keys()].map((index) => index + 1);

  return (
    <div className="flex justify-end mt-4">
      <nav>
        <ul className="pagination">
          <li
            className={`pagination-item ${
              currentPage === 1 ? 'disabled' : ''
            }`}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <button className="pagination-button">Previous</button>
          </li>
          {pages.map((page) => (
            <li key={page} className="pagination-item">
              <button
                className={`pagination-button ${
                  currentPage === page ? 'active' : ''
                }`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          ))}
          <li
            className={`pagination-item ${
              currentPage === totalPages ? 'disabled' : ''
            }`}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <button className="pagination-button">Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;