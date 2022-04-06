import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaConnectdevelop, FaVoteYea } from "react-icons/fa";
import { ElectionContext } from "../context/ElectionContext";

const Welcome = () => {
  const { currentAccount, connectWallet } = useContext(ElectionContext);
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-center items-center flex-col  mf:ml-30">
          <h1 className="text-3xl text-center sm:text-5xl text-white text-gradient py-1">
            Gm les degens, les builders du ct fr
          </h1>
          <p className="text-center mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Les élections c'est pour bientôt, que diriez vous d'une élection sur
            la blockchain ?{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://forms.gle/YFNbeCHzWuJDD7Dq5"
              className="font-semibold href"
            >
              Inscrivez vous
            </a>{" "}
            avec votre adresse et votez pour le candidat qui va all in le budget
            national sur ETH.
          </p>
          <div className="flex justify-between items-center cursor-pointer">
            {!currentAccount && (
              <button
                type="button"
                onClick={connectWallet}
                className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 ml-5 rounded-full cursor-pointer hover:bg-[#2546bd] "
              >
                <FaConnectdevelop fontSize={25} className="text-white mr-2" />
                <p className="text-white text-base font-semibold">Connect</p>
              </button>
            )}
            <Link to="/premier-tour">
              <button
                type="button"
                // onClick={connectWallet}
                className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd] spacer sp"
              >
                <FaVoteYea fontSize={25} className="text-white mr-2" />
                <p className="text-white text-base font-semibold">Voter</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
