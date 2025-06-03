"use client";
import { useEffect, useState } from "react";
import Search from "./_components/search";
import FilterTags from "./_components/filtertags";
import ClearFilters from "./_components/clearfilters";
import GTList from "./_components/gtlist";
import Pagination from "./_components/pagination";
import OpenGT from "./_components/opengt";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [isViewing, setIsViewing] = useState(false);

  const itensPerPage = 15;

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

    setCurrentPage(1);
    setFilteredGts(tempGts);
  }, [search, selectedGender, selectedSubgenre, gts]);

  const totalPages = Math.ceil(filteredGts.length / itensPerPage);
  const paginatedGts = filteredGts.slice(
    (currentPage - 1) * itensPerPage,
    currentPage * itensPerPage
  );

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
          <GTList gts={paginatedGts} onSelect={handleSelectGT} />
          <div className="counter-pagination">
            <p className="counter-records">
              Total de registros encontrados: {filteredGts.length}
            </p>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}

      {isViewing && selectedGT && (
        <OpenGT selectedGT={selectedGT} onBack={handleBack} />
      )}
    </main>
  );
}
