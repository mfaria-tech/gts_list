"use client";
import React from "react";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
}

const Search: React.FC<Props> = ({ search, onSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="Pesquisar por título (regex)"
      className="search"
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
};

export default Search;
