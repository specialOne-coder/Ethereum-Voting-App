import React, { useState, useContext } from "react";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { ElectionContext } from "../context/ElectionContext";
import {dateSecondTour } from "../utils/constants";
import ReactRoundedImage from "react-rounded-image";
import { FaVoteYea } from "react-icons/fa";
import Loader from "./Loader";
const Alert = require("sweetalert2");

const CandidatCardSecond = ({ nom, photo, numero, parti }) => {
  const [disabled, setDisabled] = useState(false);
  const { secondVote, loadingD, goodNetwork, candidatD, networkVerify } =
    useContext(ElectionContext);

  //check si c'est le jour de l'election
  const compareDateSecondTour = () => {
    const date = new Date();
    if (
      date.getDate() <= dateSecondTour.getDate() &&
      date.getMonth() === dateSecondTour.getMonth() &&
      date.getFullYear() === dateSecondTour.getFullYear()
    ) {
      return true;
    }
  };

  // check si le second tour n'est pas fini
  const finishVoteSecondTour = () => {
    const date = new Date();
    if (
      date.getDate() > dateSecondTour.getDate() &&
      date.getMonth() === dateSecondTour.getMonth() &&
      date.getFullYear() === dateSecondTour.getFullYear()
    ) {
      return true;
    }
  };

  const voteSecondTour = async (numeroP) => {
    if (finishVoteSecondTour()) {
      return Alert.fire({
        title: "Finish",
        text: "Le second tour est terminé",
        icon: "error",
        width: "40%",
        showConfirmButton: false,
      });
    } else if (compareDateSecondTour()) {
      if (goodNetwork) {
        await secondVote(numeroP);
      } else {
        networkVerify();
      }
    } else {
      const months = [
        "Janvier",
        "Fevrier",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Decembre",
      ];
      Alert.fire({
        title: "Soon",
        icon: "info",
        width: "40%",
        showConfirmButton: false,
        text:
          "Le second tour n'a pas encore commencé, il commence le : " +
          dateSecondTour.getDate() +
          " " +
          months[dateSecondTour.getMonth()] +
          " " +
          dateSecondTour.getFullYear(),
      });
    }
  };

  return (
    <div className="">
      <div className="flex w-full justify-center items-center">
        <div className="flex mf:flex-row flex-col items-start justify-center md:p-5 py-12 px-4">
          <div className="flex flex-1 justify-center items-center flex-col  mf:ml-30">
            <div className="p-3 justify-center items-start flex-col rounded-xl sm:w-60 w-full my-5 eth-card .white-glassmorphism ">
              <div className="flex justify-center flex-col w-full h-full">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                    <SiEthereum fontSize={21} color="#fff" />
                  </div>
                  <BsInfoCircle fontSize={17} color="#fff" />
                </div>
                <p className="text-white font-light text-sm">
                  {/* {shortenAddress(currentAccount)} */}
                </p>
                <div className="cardEth">
                  {nom === "" ? 
                   (
                      <div className="flex justify-center items-center py-3">
                        <div
                          className={`animate-spin rounded-full h-52 w-52 border-b-2 border-red-700`}
                        />
                      </div>
                    )
                   : (
                    <>
                      <ReactRoundedImage
                        image={photo}
                        roundedColor=""
                        imageWidth="150"
                        imageHeight="150"
                        roundedSize="0"
                        hoverColor="#DD1144"
                      />
                      <p className="text-white text-center font-semibold text-lg mt-1">
                        {nom}
                      </p>
                    </>
                  )}
                  {nom === "" ? '':
                   (
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={async () => {
                      setDisabled(true);
                      await voteSecondTour(numero);
                      setDisabled(false);
                    }}
                    className="flex flex-row justify-center items-center bg-[#2952e3] p-2 rounded-full cursor-pointer hover:bg-[#2546bd] sp"
                  >
                    {loadingD && candidatD === numero ? (
                      <Loader taille={10} />
                    ) : (
                      <>
                        <FaVoteYea fontSize={25} className="text-white mr-2" />
                        <p className="text-white text-base font-semibold">
                          Voter
                        </p>
                      </>
                    )}
                  </button>
                   )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatCardSecond;
