import React from "react";
import { PremierVote, Table } from "../components/index";



const companyCommonStyles =
  "min-h-[50px] sm:px-0 px-2 sm:min-w-[250px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";
const Premier = () => {
  return (
    <div className="gradient-bg-welcome">
      <div className="flex w-full justify-center items-center">
        <div className="flex mf:flex-row flex-col items-start justify-between md:p-5 py-12 px-4">
          <div className="flex flex-1 justify-center items-center flex-col  mf:ml-30">
            <h1 className="text-3xl text-white text-gradient py-1">
              Le premier tour commence le 10 avril
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
              pour etre early le jour du vote
            </p>
            <Table/>
          </div>
        </div>
      </div>
      <PremierVote />
    </div>
  );
};

export default Premier;
