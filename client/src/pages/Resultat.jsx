import React, { useContext } from "react";
import data from "../utils/data-first";
import dataSecond from "../utils/data-second";
import ReactRoundedImage from "react-rounded-image";
import { Loader } from "../components";
import { ElectionContext } from "../context/ElectionContext";

const companyCommonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[220px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Resultat = () => {
  const { candidatList } = useContext(ElectionContext);
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-center justify-between  py-12 px-4">
        <div className="flex flex-1 justify-center items-center flex-col  mf:ml-30">
          <h1 className="text-3xl text-white text-gradient py-1">
            Premier Tour
          </h1>
          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-5">
            <div
              className={`rounded-tl-2xl sm:rounded-bl-2xl ${companyCommonStyles}`}
            >
              <p className="font-bold text-[20px]">Candidats</p>
            </div>
            <div className={companyCommonStyles}>
              <p className="font-bold text-[20px]">Noms</p>
            </div>
            <div
              className={`sm:rounded-tr-2xl rounded-br-2xl ${companyCommonStyles}`}
            >
              <p className="font-bold text-[20px]">Points de vote</p>
            </div>
          </div>
          {[...candidatList]
            .sort(function (a, b) {
              return b.votes - a.votes;
            })
            .map((candidats, i) => (
              <div className="grid sm:grid-cols-3 grid-cols-2 w-full" key={i}>
                <>
                  <div
                    className={`rounded-tl-2xl sm:rounded-bl-2xl ${companyCommonStyles}`}
                  >
                    <ReactRoundedImage
                      key={i}
                      image={
                        data[
                          candidatList.findIndex(
                            (c) => c.name === candidats.name
                          )
                        ].photo
                      }
                      roundedColor=""
                      imageWidth="50"
                      imageHeight="50"
                      roundedSize="0"
                      hoverColor="#DD1144"
                    />
                  </div>
                  <div className={companyCommonStyles}>{candidats.name}</div>
                  <div
                    className={`sm:rounded-tr-2xl rounded-br-2xl ${companyCommonStyles}`}
                  >
                    {candidats.votes}
                  </div>
                </>
              </div>
            ))}
          <h1 className="text-3xl text-white text-gradient py-10">
            Second Tour
          </h1>
          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-5">
            <div
              className={`rounded-tl-2xl sm:rounded-bl-2xl ${companyCommonStyles}`}
            >
              <p className="font-bold text-[20px]">Candidats</p>
            </div>
            <div className={companyCommonStyles}>
              <p className="font-bold text-[20px]">Noms</p>
            </div>
            <div
              className={`sm:rounded-tr-2xl rounded-br-2xl ${companyCommonStyles}`}
            >
              <p className="font-bold text-[20px]">Points de vote</p>
            </div>
          </div>
          {candidatList.findIndex((c) => c.pass === true) !== -1
            ? [...candidatList]
                .sort(function (a, b) {
                  return b.voteSecond - a.voteSecond;
                })
                .map((candidats, i) => (
                  <div
                    className="grid sm:grid-cols-3 grid-cols-2 w-full"
                    key={i}
                  >
                    {candidats.pass === true ? (
                      <>
                        <div
                          className={`rounded-tl-2xl sm:rounded-bl-2xl ${companyCommonStyles}`}
                        >
                          <>
                            <ReactRoundedImage
                              image={
                                data[
                                  candidatList.findIndex(
                                    (c) => c.name === candidats.name
                                  )
                                ].photo
                              }
                              roundedColor=""
                              imageWidth="50"
                              imageHeight="50"
                              roundedSize="0"
                              hoverColor="#DD1144"
                            />
                          </>
                        </div>
                        <div className={companyCommonStyles}>
                          {candidats.name}
                        </div>
                        <div
                          className={`sm:rounded-tr-2xl rounded-br-2xl ${companyCommonStyles}`}
                        >
                          {candidats.voteSecond}
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                ))
            : [...dataSecond].map((candidat, i) => (
                <div className="grid sm:grid-cols-3 grid-cols-2 w-full" key={i}>
                  <>
                    <div
                      className={`rounded-tl-2xl sm:rounded-bl-2xl ${companyCommonStyles}`}
                    >
                      <Loader taille={10} />
                    </div>
                    <div className={companyCommonStyles}>
                      <Loader taille={10} />
                    </div>
                    <div
                      className={`sm:rounded-tr-2xl rounded-br-2xl ${companyCommonStyles}`}
                    >
                      <Loader taille={10} />
                    </div>
                  </>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Resultat;
