import React,{useContext} from "react";
import { ElectionContext } from "../context/ElectionContext";


const companyCommonStyles =
  "min-h-[50px] sm:px-0 px-2 sm:min-w-[110px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Table = () => {
  const {inscrits,voteP} = useContext(ElectionContext);
  return (
    <div className="grid-cols-2 mt-5">
      <div className={`rounded-tl-2xl  rounded-tr-2xl ${companyCommonStyles}`}>
        <p className="font-bold text-[20px]"> {inscrits} inscrits </p>
      </div>
      <div className={` rounded-bl-2xl rounded-br-2xl ${companyCommonStyles}`}>
        <p className="font-bold text-[20px]">{voteP} votes</p>
      </div>
    </div>
  );
};

export default Table;
