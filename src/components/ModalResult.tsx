import React from "react";

interface ModalResultProps {
  show: boolean;
  splash: any;
  closeModal: () => void;
  championName: string;
  championTitle: string;
  isWinner: boolean;
  plusPoints: number;
}

export default function ModalResult({
  show,
  closeModal,
  splash,
  plusPoints,
  championName,
  championTitle,
  isWinner,
}: ModalResultProps) {
  return (
    <div className={`${show ? "" : "hidden"}`}>
      <div
        id="defaultModal"
        tabIndex={-1}
        aria-hidden="true"
        className="flex justify-center items-center absolute md:inset-0 h-modal md:h-full"
      >
        <div className="splash w-80 h-80 text-901 bg-904 rounded-full z-50 flex justify-center msl:-ml-40 msl:mt-20">
          <img
            src={splash}
            alt="Champion Slash Not Found"
            className="rounded-full h-full"
          />
        </div>

        <div className="relative p-4 w-96 h-full -ml-20 md:h-auto msl:absolute msl:mt-800">
          <div
            className={`relative ${
              isWinner ? "bg-904" : "bg-red-300"
            } rounded-3xl shadow dark:bg-gray-700 msl:w-9/12`}
          >
            <div className="flex justify-between items-start p-4 rounded-t">
              <h3
                className={`text-xl font-semibold ml-24 ${
                  isWinner ? "text-902" : "text-907"
                } dark:text-white ml-32 uppercase`}
              >
                Você {isWinner ? "acertou" : "errou"}!
              </h3>
              <p className="text-gray-900 font-sans">
                {isWinner ? `+${plusPoints}` : "-100"}
              </p>
            </div>
            <div className="flex justify-center">
              <p className="text-gray-900 text-4xl font-bold font-sans">
                {championName}
              </p>
            </div>
            <div className="p-6 space-y-6 flex justify-center">
              <p className="text-xl text-gray-500 dark:text-gray-400">
                {championTitle}
              </p>
            </div>
            <div className="text-center">
              <p className="text-slate-900 text-center font-sans">
                Pressione <strong>ENTER</strong> para um novo jogo!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
