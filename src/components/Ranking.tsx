import Loading from "./Loading";
import bronze from "../assets/bronze.png";
import diamond from "../assets/diamond.png";
import challenger from "../assets/challenger.png";

import { apiRank } from "../services/api";
import { useEffect, useState } from "react";
import { handleGetRanking } from "../services/getRanking";
import cn from "../functions/cn";

interface RankingProps {
  show: boolean;
  playerName: string;
}

export default function Ranking({ show, playerName }: RankingProps) {
  const [rankingTable, setRankingTable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (show) {
      handleGetRanking(playerName, setRankingTable, setIsLoading, apiRank);
    }
  }, [show]);

  return (
    <div
      className={cn(
        show ? "translate-x-0" : "translate-x-full",
        "fixed z-10 right-0 mt-20 p-4 h-[33rem] bg-905 rounded-tl-3xl rounded-bl-3xl transition-all duration-500 w-96"
      )}
    >
      {isLoading ? (
        <div className="h-[33rem] flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <>
          <div className="flex gap-4">
            <div className="bg-906 w-16 h-16 rounded-full flex justify-center items-center text-4xl">
              {playerName.charAt(0).toUpperCase()}
            </div>

            <div>
              <div className="font-bold text-4xl">{playerName}</div>

              <span className="font-bold text-lg">
                {localStorage.getItem("points")}
              </span>
            </div>
          </div>

          <hr className="w-full mt-3" />

          <div className="mt-2">
            {rankingTable.map(
              (item: any, index: number) =>
                index < 10 && (
                  <div
                    key={index}
                    className="flex items-center justify-between w-11/12"
                  >
                    <div className="flex flex-row">
                      <div className="flex items-center gap-1">
                        <div className="w-12">
                          {index === 0 && (
                            <img src={challenger} alt="challenger icon" />
                          )}

                          {index === 1 && (
                            <img
                              src={diamond}
                              alt="challenger icon"
                              className="w-11"
                            />
                          )}

                          {index > 1 && (
                            <img
                              src={bronze}
                              alt="challenger icon"
                              className="w-10"
                            />
                          )}
                        </div>

                        <div className="text-2xl font-bold">{item?.nick}</div>
                      </div>
                    </div>

                    <div className="float-right text-lg">{item?.points}</div>
                  </div>
                )
            )}
          </div>
        </>
      )}
    </div>
  );
}
