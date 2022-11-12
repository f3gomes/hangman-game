import React, { useEffect, useState } from "react";
import { getRanking } from "../services/api";
import Loading from "./Loading";

interface RankingProps {
  show: boolean;
  win: boolean;
}

export default function Ranking({ show, win }: RankingProps) {
  const [rankingTable, setRankingTable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [playerName, setPlayerName] = useState("?");

  const handleGetRanking = async () => {
    try {
      setIsLoading(true);
      const resp = await getRanking.get("/ranking");
      setRankingTable(resp.data.rank);
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  useEffect(() => {
    handleGetRanking();
    let name = String(localStorage.getItem("nick"));
    setPlayerName(name);
  }, []);

  useEffect(() => {
    if (win) {
      handleGetRanking();
    }
  }, [win]);

  return (
    <div
      className={`${
        show ? "" : "hidden"
      } absolute right-0 mt-14 w-96 h-2/3 bg-905 rounded-tl-3xl rounded-bl-3xl`}
    >
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <>
          <div className="ml-6 mt-6">
            <div className="bg-906 w-16 h-16 rounded-full flex justify-center items-center text-4xl font-sans">
              {playerName.charAt(0).toUpperCase()}
            </div>
            <div className="absolute font-bold text-4xl ml-20 -mt-14">
              {playerName}
            </div>
            <hr className="w-11/12 mt-3" />
          </div>
          <div className="ml-6 mt-6">
            {rankingTable.map((item: any, index: number) => (
              <div key={index} className="font-sans">
                <span className="text-2xl font-bold">{item?.nick}</span>
                <span className="float-right mr-7 text-lg">{item?.points}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
