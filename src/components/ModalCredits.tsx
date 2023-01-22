import React from "react";
import { AiFillGithub, AiFillBehanceCircle } from "react-icons/ai";

interface ModalCreditsProps {
  show: boolean;
}

export default function ModalCredits({ show }: ModalCreditsProps) {
  return (
    <div
      className={`${
        show ? "content showCredits" : "content"
      } bg-902 absolute h-45 bottom-20 right-0 rounded-tl-xl rounded-bl-xl text-901 font-bold text-center msl:bottom-16`}
    >
      <h2 className="uppercase text-xl p-3 mb-2">Criadores</h2>

      <div className="flex flex-col mb-3">
        <span>
          Felipe "
          <a href="https://github.com/fomes" target={"_blank"}>
            <strong className="text-904 transition hover:brightness-125 cursor-pointer">
              Fomes
            </strong>
          </a>
          " Gomes
        </span>
        <span>
          Kauan "
          <a href="https://www.behance.net/k4udesign" target={"_blank"}>
            <strong className="text-904 transition hover:brightness-125 cursor-pointer">
              Kauzone
            </strong>
          </a>
          " Rodrigues
        </span>
      </div>

      <div className="flex justify-center mb-4">
        <a href="https://github.com/fomes" target={"_blank"}>
          <AiFillGithub size={50} />
        </a>
        <a href="https://www.behance.net/k4udesign" target={"_blank"}>
          <AiFillBehanceCircle size={50} />
        </a>
      </div>
    </div>
  );
}
