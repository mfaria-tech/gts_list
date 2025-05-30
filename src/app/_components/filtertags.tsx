"use client";
import React from "react";

interface Props {
  genders: string[];
  subgenres: string[];
  selectedGender: string | null;
  selectedSubgenre: string | null;
  onGenderChange: (value: string | null) => void;
  onSubgenreChange: (value: string | null) => void;
}

const FilterTags: React.FC<Props> = ({
  genders,
  subgenres,
  selectedGender,
  selectedSubgenre,
  onGenderChange,
  onSubgenreChange,
}) => {
  return (
    <div className="filter-tags">
      <select
        className="filter-gender"
        value={selectedGender ?? ""}
        onChange={(e) => onGenderChange(e.target.value || null)}
      >
        <option value="">Todos os Gêneros</option>
        {genders.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      <select
        className="filter-subgenre"
        value={selectedSubgenre ?? ""}
        onChange={(e) => onSubgenreChange(e.target.value || null)}
      >
        <option value="">Todos os Subgêneros</option>
        {subgenres.map((sg) => (
          <option key={sg} value={sg}>
            {sg}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterTags;
