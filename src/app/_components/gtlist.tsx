"use client";
import React from "react";

interface GT {
  gt: string;
  titulo: string;
  link: string;
  genero: string;
  subgenero: string;
}

interface Props {
  gts: GT[];
  onSelect: (gt: GT) => void;
}

const coresGradientes = [
  "tag-color-1",
  "tag-color-2",
  "tag-color-3",
  "tag-color-5",
  "tag-color-6",
  "tag-color-7",
];

const GTList: React.FC<Props> = ({ gts, onSelect }) => {
  return (
    <div className="list-gt">
      {gts.map((gt, index) => (
        <div
          key={gt.gt}
          className="item-gt"
          onClick={() => onSelect(gt)}
        >
          <div className="gt-id">{gt.gt}</div>
          <div className="gt-title">{gt.titulo}</div>
          <div className="gt-gender">
            {gt.genero.split(",").map((genero, i) => (
              <span
                key={i}
                className={`tag-gender ${coresGradientes[i % coresGradientes.length]}`}
              >
                {genero.trim()}
              </span>
            ))}
          </div>
          <div className="gt-subgenre">{gt.subgenero}</div>
        </div>
      ))}
    </div>
  );
};

export default GTList;
