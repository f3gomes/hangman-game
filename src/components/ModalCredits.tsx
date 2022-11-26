import React from "react";
import { AiFillGithub, AiFillBehanceCircle } from "react-icons/ai";

interface ModalCreditsProps {
  show: boolean;
}

export default function ModalCredits({ show }: ModalCreditsProps) {
  return (
    <div
      className={`${
        show ? "" : "hidden"
      } bg-902 absolute bottom-20 right-3 rounded-xl text-901 font-bold text-center animate-page w-80 msl:bottom-16`}
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

      <div className="flex justify-center mb-4">
        <a href="https://github.com/fomes" target={"_blank"} className="-mr-6">
          <AiFillGithub size={50} />
        </a>
        <a href="https://www.behance.net/k4udesign" target={"_blank"}>
          <AiFillBehanceCircle size={50} />
        </a>
      </div>
    </div>
  );
}
