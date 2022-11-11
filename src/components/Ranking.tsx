import React, { useEffect, useState } from "react";
import { getRanking } from "../services/api";

interface RankingProps {
  show: boolean;
}

export default function Ranking({ show }: RankingProps) {
  const [rankingTable, setRankingTable] = useState([]);

  const handleGetRanking = async () => {
    const resp = await getRanking.get("");
    setRankingTable(resp.data.rank);
  };

  // useEffect(() => {
  //   handleGetRanking();
  // }, []);

  return (
    <div
      className={`${
        show ? "" : "hidden"
      } absolute right-4 mt-14 w-96 h-2/3 bg-905`}
    >
      <div className="ml-6 mt-6">
        <div className="bg-906 w-16 h-16 rounded-full flex justify-center items-center text-4xl font-sans">
          K
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
    </div>
  );
}
