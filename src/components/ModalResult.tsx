import React from "react";

interface ModalResultProps {
  show: boolean;
  splash: any;
  closeModal: () => void;
  championName: string;
  championTitle: string;
  isWinner: boolean;
}

export default function ModalResult({
  show,
  closeModal,
  splash,
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
        <div className="splash w-60 h-60 text-901 bg-904 rounded-full z-50 flex justify-center">
          <img
            src={splash}
            alt="Champion Slash Not Found"
            className="rounded-full h-full"
          />
        </div>

        <div className="relative p-4 w-96 h-full -ml-20 md:h-auto">
          <div
            className={`relative ${
              isWinner ? "bg-904" : "bg-red-300"
            } rounded-3xl shadow dark:bg-gray-700`}
          >
            <div className="flex justify-between items-start p-4 rounded-t">
              <h3 className="text-xl font-semibold text-902 dark:text-white ml-20 uppercase">
                Você {isWinner ? "acertou" : "errou"}!
              </h3>
            </div>
            <div className="flex justify-center">
              <p className="text-gray-900 text-2xl">{championName}</p>
            </div>
            <div className="p-6 space-y-6 flex justify-center">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {championTitle.charAt(0).toUpperCase() + championTitle.slice(1)}
              </p>
            </div>
            <div>
              <p className="text-slate-900 text-center">
                Pressione ENTER para um novo jogo!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
