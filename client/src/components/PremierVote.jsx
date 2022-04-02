import React from "react";

import data from "../utils/data-first";
import CandidatCard from "./CandidatCard";


const PremierVote = () => {
  return (
    <div className="flex flex-wrap justify-center items-center mt-10">
      {[...data].map((candidat, i) => (
        <CandidatCard key={i} {...candidat} />
      ))}
    </div>
  );
};

export default PremierVote;
