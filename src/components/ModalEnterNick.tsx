import React from "react";

interface ModalNickProps {
  show: boolean;
  handleOnChange: any;
}

export default function ModalEnterNick({
  show,
  handleOnChange,
}: ModalNickProps) {
  return (
    <div
      className={`${
        show ? "" : "hidden"
      } bg-902 absolute flex flex-col justify-center items-center bottom-2/4 w-96 h-36 rounded-3xl`}
    >
      <p className="text-903 font-bold uppercase font-sans">Digite seu nick</p>
      <input
        type="text"
        className="w-8/12 h-9 rounded-xl text-903 text-center font-bold font-sans"
        onChange={handleOnChange}
      />
    </div>
  );
}
