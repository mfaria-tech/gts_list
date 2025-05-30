"use client";
import { useEffect, useState } from "react";
import Search from "./_components/search";
import FilterTags from "./_components/filtertags";
import ClearFilters from "./_components/clearfilters";
import GTList from "./_components/gtlist";

interface GT {
  gt: string;
  titulo: string;
  link: string;
  genero: string;
  subgenero: string;
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedSubgenre, setSelectedSubgenre] = useState<string | null>(null);
  const [gts, setGts] = useState<GT[]>([]);
  const [filteredGts, setFilteredGts] = useState<GT[]>([]);
  const [selectedGT, setSelectedGT] = useState<GT | null>(null);
  const [isViewing, setIsViewing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/data/list_gts.json");
      const data = await res.json();
      setGts(data);
      setFilteredGts(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let tempGts = gts;

    if (search) {
      const regex = new RegExp(search, "i");
      tempGts = tempGts.filter((gt) => regex.test(gt.titulo));
    }

    if (selectedGender) {
      tempGts = tempGts.filter((gt) =>
        gt.genero.toLowerCase().includes(selectedGender.toLowerCase())
      );
    }

    if (selectedSubgenre) {
      tempGts = tempGts.filter((gt) =>
        gt.subgenero.toLowerCase().includes(selectedSubgenre.toLowerCase())
      );
    }

    setFilteredGts(tempGts);
  }, [search, selectedGender, selectedSubgenre, gts]);

  const generos = Array.from(
    new Set(gts.flatMap((gt) => gt.genero.split(",").map((g) => g.trim())))
  ).sort((a, b) => a.localeCompare(b));

  const subgeneros = Array.from(
    new Set(gts.map((gt) => gt.subgenero))
  ).sort((a, b) => a.localeCompare(b));

  const handleSelectGT = (gt: GT) => {
    setSelectedGT(gt);
    setIsViewing(true);
  };

  const handleBack = () => {
    setSelectedGT(null);
    setIsViewing(false);
  };

  return (
    <main className="main">
      <h1 className="title">Lista de GTs</h1>

      {!isViewing && (
        <>
          <div className="filters">
            <Search search={search} onSearchChange={setSearch} />
            <FilterTags
              genders={generos}
              subgenres={subgeneros}
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
          <GTList gts={filteredGts} onSelect={handleSelectGT} />
        </>
      )}
    </main>
  );
}
