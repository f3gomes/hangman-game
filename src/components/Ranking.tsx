import React, { useEffect, useState } from "react";
import { apiRank } from "../services/api";
import Loading from "./Loading";
import challenger from "../assets/challenger.png";
import diamond from "../assets/diamond.png";
import bronze from "../assets/bronze.png";
import "../styles/ranking.css";
import { handleGetRanking } from "../services/getRanking";
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
    if (show) {
      handleGetRanking(playerName, setRankingTable, setIsLoading, apiRank);

      if (!localStorage.getItem("nick")) {
        let name = String(localStorage.getItem("nick"));
        setPlayerName(name);
      }
    }
  }, [show]);

  return (
    <div
      className={`${
        show ? "content showRanking" : "content"
      } absolute right-0 mt-20 h-911 bg-905 rounded-tl-3xl rounded-bl-3xl msl:h-910`}
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
                href={`https://www.op.gg/summoners/br/${playerName}`}
                className="cursor-pointer transition brightness-90 hover:brightness-125"
                target={"_blank"}
              >
                {playerName}
              </a>
            </div>
            <span className="absolute font-bold text-lg ml-20 -mt-6">
              {localStorage.getItem("points")}
            </span>
            <hr className="w-11/12 mt-3" />
          </div>
          <div className="ml-6 mt-6">
            {rankingTable.map(
              (item: any, index: number) =>
                index < 10 && (
                  <div key={index}>
                    <span className="flex flex-row">
                      <span className="text-2xl font-bold">{item?.nick}</span>
                      <span>
                        {index === 0 && (
                          <img
                            src={challenger}
                            alt="challenger icon"
                            className="w-14 -mt-4 ml-2 absolute"
                          />
                        )}

                        {index === 1 && (
                          <img
                            src={diamond}
                            alt="challenger icon"
                            className="w-12 -mt-3 ml-2 absolute"
                          />
                        )}

                        {index === 2 && (
                          <img
                            src={bronze}
                            alt="challenger icon"
                            className="w-10 -mt-1 ml-2 absolute"
                          />
                        )}
                      </span>
                    </span>
                    <span className="float-right mr-7 text-lg -mt-7">
                      {item?.points}
                    </span>
                  </div>
                )
            )}
          </div>
        </>
      )}
    </div>
  );
}
