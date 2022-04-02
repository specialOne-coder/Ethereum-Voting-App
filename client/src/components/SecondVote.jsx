import React from "react";
import data from "../utils/data-second";
import CandidatCardSecond from "./CandidatCardSecond";


const SecondVote = () => {
  return (
    <div className="flex flex-wrap justify-center items-center mt-10">
      {[...data].map((candidat, i) => (
        <CandidatCardSecond key={i} {...candidat} />
      ))}
    </div>
  );
};

export default SecondVote;
