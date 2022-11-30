import React from "react";
import copyright from "../assets/copyright.svg";

export default function Footer({ handleOpenCredits, show }: any) {
  return (
    <footer>
      <div
        className={`text-slate-300 left-0 w-full text-sm bottom-3 absolute text-center msl:text-xs msl:w-10/12 msl:left-7 ${
          !show ? "" : "hidden"
        }`}
      >
        Todos os direitos de “League of Legends” e seus atributos são reservados
        à Riot Games, Inc.
      </div>
      <button
        className={`absolute right-3 bottom-3 cursor-pointer focus:outline-none msl:w-8 ${
          show && "hidden"
        }`}
        onClick={handleOpenCredits}
      >
        <img src={copyright} alt="copyright" />
      </button>
    </footer>
  );
}
