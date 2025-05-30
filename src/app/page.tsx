"use client";
import { useEffect, useState } from "react";
import Search from "./_components/search";
import FilterTags from "./_components/filtertags";
import ClearFilters from "./_components/clearfilters";

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedSubgenre, setSelectedSubgenre] = useState<string | null>(null);
  const [isViewing, setIsViewing] = useState(false);

  return (
    <main className="main">
      <h1 className="title">Lista de GTs</h1>

      {!isViewing && (
        <>
          <div className="filters">
            <Search search={search} onSearchChange={setSearch} />
            <FilterTags
              genders={[]}
              subgenres={[]}
              selectedGender={selectedGender}
              selectedSubgenre={selectedSubgenre}
              onGenderChange={setSelectedGender}
              onSubgenreChange={setSelectedSubgenre}
            />
            <ClearFilters
              onClear={() => {
                setSearch("");
                setSelectedGender(null);
                setSelectedSubgenre(null);
              }}
            />
          </div>
        </>
      )}
    </main>
  );
}
