import React from "react";
import { FaGithub, FaMailBulk, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
      <div className="flex justify-center items-center flex-col mt-5">
        <p className="text-white text-sm text-center">
          Rejoins moi pour de merveilleuses aventures
        </p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/0xferdinand"
        >
          <div className="flex flex-row justify-center items-center p-1 cursor-pointer">
            <FaTwitter fontSize={25} className="text-white mr-2" />
            <p className="text-white text-sm text-center font-medium mt-2">
              Ferdinand
            </p>
          </div>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/specialOne-coder?tab=repositories"
        >
          <div className="flex flex-row justify-center items-center p-1 cursor-pointer">
            <FaGithub fontSize={25} className="text-white mr-2" />
            <p className="text-white text-sm text-center font-medium mt-2">
              SpecialOne-coder
            </p>
          </div>
        </a>
        <div className="flex flex-row justify-center items-center p-1 cursor-pointer">
          <FaMailBulk fontSize={25} className="text-white mr-2" />
          <p className="text-white text-sm text-center font-medium mt-2">
            ferdinand.att@gmail.com
          </p>
        </div>
      </div>

      <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

      <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
        <p className="text-white text-left text-xs">@specialOne-coder</p>
        <p className="text-white text-right text-xs">All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
