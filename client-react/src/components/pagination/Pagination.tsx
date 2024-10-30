import React from 'react';
import './pagination-style.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages < 2) {
    return null;
  }

  const handlePrevPageClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPageClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav className="os-pagination">
      <ul className="page-list" data-element="pagination">
        {currentPage > 1 && (
          <li>
            <button className="page-link previous" onClick={handlePrevPageClick}>
              <i className="bi bi-chevron-left"/>
            </button>
          </li>
        )}

        {(new Array(totalPages).fill(true).map((_, index) => (
          <li key={index}>
            <button className={`page-link ${index + 1 === currentPage ? 'active' : ''}`} onClick={() => onPageChange(index + 1)}>{index + 1}</button>
          </li>
        )))}

        {currentPage !== totalPages && (
          <li>
            <button className="page-link next" onClick={handleNextPageClick}>
              <i className="bi bi-chevron-right"></i>
            </button>
          </li>
        )}
      </ul>

    </nav>
  );
};

export default Pagination;