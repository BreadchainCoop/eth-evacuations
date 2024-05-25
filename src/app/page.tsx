"use client";

import { useEffect, useState } from "react";
import { ETH_EVACUATONS_ADDRESS } from "../../constants";
import { useAccountData } from "./components/useAccountData";
import { formatDistanceStrict } from "date-fns";

export default function Home() {
  const [aggData, setAggData] = useState<Array<any>>([]);

  const { data: ethData } = useAccountData("eth", ETH_EVACUATONS_ADDRESS);
  const { data: optimismData } = useAccountData(
    "optimism",
    ETH_EVACUATONS_ADDRESS
  );
  const { data: gnosisData } = useAccountData("gnosis", ETH_EVACUATONS_ADDRESS);

  useEffect(() => {
    const mergedArray = [...ethData, ...optimismData, ...gnosisData];

    const sortedArray = mergedArray.sort((a, b) => {
      return (
        new Date(b.block_timestamp).getTime() -
        new Date(a.block_timestamp).getTime()
      );
    });

    setAggData(sortedArray);
  }, [ethData, optimismData, gnosisData]);

  return (
    <main className="bg-neutral-800">
      <h1>Woof Woof</h1>
      <div>
        {aggData &&
          aggData.map((tx) => (
            <div key={`tx_${tx.hash}`} className="grid grid-cols-12 gap-4">
              <span className="col-span-3">{tx.chain}</span>
              <h2 className="col-span-3">
                {formatDistanceStrict(
                  new Date(tx.block_timestamp),
                  new Date(),
                  {
                    addSuffix: true,
                  }
                )}
              </h2>
              <pre className="col-span-4">{tx.summary}</pre>
            </div>
          ))}
      </div>
    </main>
  );
}
