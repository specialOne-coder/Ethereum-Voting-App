import React, { useContext } from "react";
import { ElectionContext } from "../context/ElectionContext";
import data from "../utils/data-first";
import dataSecond from "../utils/data-second";
import CandidatCardSecond from "./CandidatCardSecond";

const SecondVote = () => {
  const { candidatList } = useContext(ElectionContext);
  return (
    <div className="flex flex-wrap justify-center items-center mt-10">
      {candidatList.findIndex((c) => c.pass === true) !== -1
        ? [...candidatList].map((candidat, i) =>
            candidat.pass === true ? (
              <CandidatCardSecond key={i} {...data[i]} />
            ) : (
              ""
            )
          )
        : [...dataSecond].map((candidat, i) => (
            <CandidatCardSecond key={i} {...candidat} />
          ))}
    </div>
  );
};

export default SecondVote;
