import React from "react";
import copyright from "../assets/copyright.svg";
import tips from "../assets/btn_tip.svg";

export default function Footer({
  show,
  handleOpenCredits,
  handleOpenHelp,
}: any) {
  return (
    <footer className={`${!show ? "" : "hidden"}`}>
      <div
        className={`text-slate-300 left-0 w-full text-sm bottom-3 absolute text-center msl:text-xs msl:w-9/12 msl:left-14`}
      >
        Todos os direitos de “League of Legends” e seus atributos são reservados
        à Riot Games, Inc.
      </div>
      <button
        className={`absolute right-3 bottom-3 cursor-pointer focus:outline-none msl:w-8`}
        onClick={handleOpenCredits}
      >
        <img src={copyright} alt="copyright" />
      </button>

      <button
        className={`absolute right-20 bottom-3 cursor-pointer focus:outline-none msl:w-8 msl:left-3`}
        onClick={handleOpenHelp}
      >
        <img src={tips} alt="copyright" />
      </button>
    </footer>
  );
}
