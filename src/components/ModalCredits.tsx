import React from "react";
import { AiFillGithub, AiFillBehanceCircle } from "react-icons/ai";

interface ModalCreditsProps {
  show: boolean;
}

export default function ModalCredits({ show }: ModalCreditsProps) {
  return (
    <div
      className={`${
        show ? "translate-x-0" : "translate-x-full"
      } bg-902 fixed h-45 bottom-20 right-0 w-[320px] rounded-tl-xl rounded-bl-xl text-901 font-bold text-center flex-col flex justify-center gap-1 transition-all duration-500`}
    >
      <h2 className="uppercase text-xl">Criadores</h2>

      <div className="flex flex-col">
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

      <div className="flex justify-center">
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
