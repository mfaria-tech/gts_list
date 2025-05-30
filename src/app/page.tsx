"use client";
import { useEffect, useState } from "react";
import Search from "./_components/search";
import FilterTags from "./_components/filtertags";
import ClearFilters from "./_components/clearfilters";

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedGenero, setSelectedGenero] = useState<string | null>(null);
  const [selectedSubgenero, setSelectedSubgenero] = useState<string | null>(null);
  const [isViewing, setIsViewing] = useState(false);

  return (
    <main className="main">
      <h1 className="title">Lista de GTs</h1>

      {!isViewing && (
        <>
          <div className="filters">
            <Search search={search} onSearchChange={setSearch} />
            <FilterTags
              generos={[]}
              subgeneros={[]}
              selectedGenero={selectedGenero}
              selectedSubgenero={selectedSubgenero}
              onGeneroChange={setSelectedGenero}
              onSubgeneroChange={setSelectedSubgenero}
            />
            <ClearFilters
              onClear={() => {
                setSearch("");
                setSelectedGenero(null);
                setSelectedSubgenero(null);
              }}
            />
          </div>
        </>
      )}
    </main>
  );
}
