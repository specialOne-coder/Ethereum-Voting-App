import React, { useContext } from "react";
import { SecondVote, Table } from "../components/index";
import { ElectionContext } from "../context/ElectionContext";

const companyCommonStyles =
  "min-h-[50px] sm:px-0 px-2 sm:min-w-[110px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Second = () => {
  const { inscrits, voteS } = useContext(ElectionContext);
  return (
    <div className="gradient-bg-welcome">
      <div className="flex w-full justify-center items-center">
        <div className="flex mf:flex-row flex-col items-start justify-between md:p-5 py-12 px-4">
          <div className="flex flex-1 justify-center items-center flex-col  mf:ml-30">
            <h1 className="text-3xl text-white text-gradient py-1">
              Le second tour commence le 24 avril
            </h1>
            <p className="text-center text-white font-light md:w-9/12 w-11/12 text-base">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://forms.gle/YFNbeCHzWuJDD7Dq5"
                className="font-semibold href"
              >
                Inscrivez vous
              </a>{" "}
              si ce n'est pas encore fait
            </p>
            <div className="grid-cols-2 mt-5">
              <div
                className={`rounded-tl-2xl  rounded-tr-2xl ${companyCommonStyles}`}
              >
                <p className="font-bold text-[20px]"> {inscrits} inscrits </p>
              </div>
              <div
                className={` rounded-bl-2xl rounded-br-2xl ${companyCommonStyles}`}
              >
                <p className="font-bold text-[20px]">{voteS} votes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SecondVote />
    </div>
  );
};

export default Second;
