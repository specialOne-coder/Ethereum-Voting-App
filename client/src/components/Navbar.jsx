import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { ElectionContext } from "../context/ElectionContext";
import { shortenAddress } from "../utils/ShortAdress";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { currentAccount, connectWallet } = useContext(ElectionContext);

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <div className="text-white md:flex  list-none fex-row justify-between items-center fex-initial">
          <p className="text-[25px] text-white">
            <Link to="/">Election</Link>
          </p>
        </div>
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        <li className="mx-4 cursor-pointer">
          <Link to="/premier-tour"> Premier Tour</Link>
        </li>
        <li className="mx-4 cursor-pointer">
          <Link to="/second-tour"> Second Tour</Link>
        </li>
        <li className="mx-4 cursor-pointer">
          <Link to="/resultat"> Resultat </Link>
        </li>
        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
          <button onClick={connectWallet}>
            {!currentAccount
              ? "Connect Wallet"
              : shortenAddress(currentAccount)}
          </button>
        </li>
      </ul>
      <div className="flex relative">
        {!toggleMenu ? (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        ) : (
          <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => {
              setToggleMenu(false);
            }}
          />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
                   flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            <li className="mx-4 cursor-pointer">
              <Link to="/premier-tour"> Premier Tour</Link>
            </li>
            <li className="mx-4 cursor-pointer">
              <Link to="/second-tour"> Second Tour</Link>
            </li>
            <li className="mx-4 cursor-pointer">
              <Link to="/resultat"> Resultat </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
