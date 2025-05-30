"use client";
import React from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      <button
        onClick={() => {
          onPageChange(Math.max(currentPage - 1, 1));
          window.scrollTo(0,0);
        }}
        disabled={currentPage === 1}
        className="previous-button-pagination"
      >
        ➜
      </button>
      <span className="label-pagination">
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={() => {
          onPageChange(Math.min(currentPage + 1, totalPages));
          window.scrollTo(0,0);
        }}
        disabled={currentPage === totalPages}
        className="next-button-pagination"
      >
        ➜
      </button>
    </div>
  );
};

export default Pagination;
