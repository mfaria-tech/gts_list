"use client";
import React from "react";

interface Props {
  onClear: () => void;
}

const ClearFilters: React.FC<Props> = ({ onClear }) => {
  return (
    <button
      onClick={onClear}
      className="clear-button"
    >
      Limpar Filtros
    </button>
  );
};

export default ClearFilters;
