import React from "react";
import github from "../assets/github.svg";
import behance from "../assets/behance.svg";

interface ModalCreditsProps {
  show: boolean;
}

export default function ModalCredits({ show }: ModalCreditsProps) {
  return (
    <div
      className={`${
        show ? "" : "hidden"
      } bg-902 absolute bottom-20 right-3 rounded-xl text-901 font-bold font-sans text-center w-80`}
    >
      <h2 className="uppercase text-xl p-3 mb-2">Criadores</h2>

      <div className="flex flex-col mb-3">
        <span>
          Felipe "<strong className="text-904">Fomes</strong>" Gomes
        </span>
        <span>
          Kauan "<strong className="text-904">Kauzone</strong>" Rodrigues
        </span>
      </div>

      <div className="flex justify-center gap-4 mb-4">
        <a href="https://github.com/fomes" target={"_blank"}>
          <img src={github} alt="github" />
        </a>
        <a href="https://www.behance.net" target={"_blank"}>
          <img src={behance} alt="behance" />
        </a>
      </div>
    </div>
  );
}
