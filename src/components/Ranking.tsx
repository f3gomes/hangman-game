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
}

export default function Ranking({ show }: RankingProps) {
  const [rankingTable, setRankingTable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [playerName, setPlayerName] = useState(
    String(localStorage.getItem("nick"))
  );

  useEffect(() => {
    if (localStorage.getItem("nick")) {
      let name = String(localStorage.getItem("nick"));
      setPlayerName(name);
    }
  }, []);

  useEffect(() => {
    if (show) {
      handleGetRanking(playerName, setRankingTable, setIsLoading, apiRank);
    }
  }, [show]);

  return (
    <div
      className={cn(
        show ? "translate-x-0" : "translate-x-full",
        "fixed right-0 mt-20 h-911 bg-905 rounded-tl-3xl rounded-bl-3xl msl:h-910 w-[384px] transition-all duration-500"
      )}
    >
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <>
          <div className="ml-6 mt-6">
            <div className="bg-906 w-16 h-16 rounded-full flex justify-center items-center text-4xl">
              {playerName.charAt(0).toUpperCase()}
            </div>

            <div className="absolute font-bold text-4xl ml-20 -mt-14">
              <a
                target={"_blank"}
                href={`https://www.op.gg/summoners/br/${playerName}`}
                className="cursor-pointer transition brightness-90 hover:brightness-125"
              >
                {playerName}
              </a>
            </div>

            <span className="absolute font-bold text-lg ml-20 -mt-6">
              {localStorage.getItem("points")}
            </span>

            <hr className="w-11/12 mt-3" />
          </div>

          <div className="ml-6 mt-2">
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
