"use client";
import React from "react";

interface Props {
  generos: string[];
  subgeneros: string[];
  selectedGenero: string | null;
  selectedSubgenero: string | null;
  onGeneroChange: (value: string | null) => void;
  onSubgeneroChange: (value: string | null) => void;
}

const FilterTags: React.FC<Props> = ({
  generos,
  subgeneros,
  selectedGenero,
  selectedSubgenero,
  onGeneroChange,
  onSubgeneroChange,
}) => {
  return (
    <div className="filter-tags">
      <select
        className="filter-genero"
        value={selectedGenero ?? ""}
        onChange={(e) => onGeneroChange(e.target.value || null)}
      >
        <option value="">Todos os Gêneros</option>
        {generos.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      <select
        className="filter-subgenero"
        value={selectedSubgenero ?? ""}
        onChange={(e) => onSubgeneroChange(e.target.value || null)}
      >
        <option value="">Todos os Subgêneros</option>
        {subgeneros.map((sg) => (
          <option key={sg} value={sg}>
            {sg}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterTags;
