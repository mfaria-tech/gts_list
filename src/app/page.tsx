"use client";
import { useEffect, useState } from "react";
import Search from "./_components/search";

export default function Home() {
  const [search, setSearch] = useState("");
  const [isViewing, setIsViewing] = useState(false);

  return (
    <main className="main">
      <h1 className="title">Lista de GTs</h1>

      {!isViewing && (
        <>
          <div className="filters">
            <Search search={search} onSearchChange={setSearch} />
          </div>
        </>
      )}
    </main>
  );
}
