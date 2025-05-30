"use client";
import React, { useState } from "react";
import Loading from "./loading";

interface Props {
  selectedGT: { link: string; titulo: string } | null;
  onBack: () => void;
}

const OpenGT: React.FC<Props> = ({ selectedGT, onBack }) => {
  const [isLoading, setIsLoading] = useState(true);

  if (!selectedGT) return null;

  return (
    <div className="open-gt">
      <button
        onClick={onBack}
        className="button-back"
      ></button>
      <h2 className="title-gt">{selectedGT.titulo}</h2>
      {isLoading && <Loading />}
      <iframe
        src={selectedGT.link}
        className="page-gt"
      ></iframe>
    </div>
  );
};

export default OpenGT;
