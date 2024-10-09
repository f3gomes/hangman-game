import { useEffect, useState } from "react";
import { CurrentChampionProps, useGlobalContext } from "../context/global";
import cn from "../functions/cn";

interface ModalResultProps {
  show: boolean;
  isWinner: boolean;
  currentPoints: number;
  handleClose: () => void;
}

export default function ModalResult({
  show,
  isWinner,
  handleClose,
  currentPoints,
}: ModalResultProps) {
  const { isLoading, currentChampion } = useGlobalContext();
  const [champion, setChampion] = useState<CurrentChampionProps>({});

  useEffect(() => {
    if (!isLoading && currentChampion) {
      setChampion(currentChampion);
    }
  }, [isLoading]);

  return (
    <div
      className={cn(
        show ? "flex" : "hidden",
        "justify-center items-center w-full h-svh"
      )}
    >
      <div
        tabIndex={-1}
        id="defaultModal"
        className="flex flex-col justify-center items-center"
      >
        <div className="splash w-60 text-901 bg-906 flex justify-center">
          <img alt="splash" src={champion.splash} className="" />
        </div>

        <div className="relative p-4 w-96 md:h-auto">
          <div
            className={cn(
              isWinner ? "bg-904" : "bg-red-300",
              "relative rounded-3xl shadow"
            )}
          >
            <div className="flex justify-center items-start p-2 rounded-t">
              <h3
                className={cn(
                  isWinner ? "text-green-600" : "text-red-500",
                  "text-xl font-semibold border- uppercase drop-shadow-lg"
                )}
              >
                Você {isWinner ? "acertou" : "errou"}!
              </h3>

              <p className="text-gray-900 absolute right-4">
                {isWinner ? (
                  <span className="text-green-600 text-xl">
                    +{currentPoints}
                  </span>
                ) : (
                  <span className="text-red-500 text-xl">-100</span>
                )}
              </p>
            </div>

            <div className="flex justify-center">
              <p className="text-gray-900 text-4xl font-bold">
                {champion.name}
              </p>
            </div>

            <div className="p-6 space-y-6 flex justify-center">
              <p className="text-xl text-slate-600">
                {champion.title &&
                  champion.title.charAt(0).toUpperCase() +
                  champion?.title.slice(1)}
              </p>
            </div>

            <div className="text-center">
              <p className="text-slate-900 text-center msl:-m-2 msl:text-xl">
                Cique{" "}
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={handleClose}
                >
                  AQUI
                </span>{" "}
                para jogar novamente!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
