import React from "react";
import { SecondVote } from "../components/index";


const Second = () => {
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
          </div>
        </div>
      </div>
      <SecondVote/>
    </div>
  );
};

export default Second;
