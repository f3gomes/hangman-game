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
        <div className="splash w-60 h-60 bg-904 rounded-full z-50">
          <img
            src={splash}
            alt="champion image"
            className="rounded-full h-full"
          />
        </div>

        <div className="relative p-4 w-96 h-full -ml-20 md:h-auto">
          <div className="relative bg-904 rounded-3xl shadow dark:bg-gray-700">
            <div className="flex justify-between items-start p-4 rounded-t">
              <h3 className="text-xl font-semibold text-902 dark:text-white ml-20 uppercase">
                Você {isWinner ? "acertou" : "errou"}!
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="true"
                onClick={closeModal}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="flex justify-center">
              <p className="text-gray-900 text-2xl">{championName}</p>
            </div>
            <div className="p-6 space-y-6 flex justify-center">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {championTitle.charAt(0).toUpperCase() + championTitle.slice(1)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
