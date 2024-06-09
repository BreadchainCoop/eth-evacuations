import { useEffect, useState } from "react";
import { formatDistanceStrict } from "date-fns";

import { useAccountData } from "./useAccountData";

import { ETH_EVACUATONS_ADDRESS } from "../../../constants";

export function Donations() {
  const [aggData, setAggData] = useState<Array<any>>([]);

  const { data: ethData, status: ethDataStatus } = useAccountData(
    "eth",
    ETH_EVACUATONS_ADDRESS
  );
  const { data: optimismData, status: optimismDataStatus } = useAccountData(
    "optimism",
    ETH_EVACUATONS_ADDRESS
  );
  const { data: gnosisData, status: gnosisDataStatus } = useAccountData(
    "gnosis",
    ETH_EVACUATONS_ADDRESS
  );
  const { data: arbitrumData, status: arbitrumDataStatus } = useAccountData(
    "arbitrum",
    ETH_EVACUATONS_ADDRESS
  );

  useEffect(() => {
    if (
      ethDataStatus === "loading" ||
      optimismDataStatus === "loading" ||
      gnosisDataStatus === "loading" ||
      arbitrumDataStatus === "loading"
    ) {
      return;
    }

    let combinedArray: Array<any> = [];

    if (ethDataStatus === "success")
      combinedArray = [...combinedArray, ...ethData];
    if (optimismDataStatus === "success")
      combinedArray = [...combinedArray, ...optimismData];
    if (gnosisDataStatus === "success")
      combinedArray = [...combinedArray, ...gnosisData];
    if (arbitrumDataStatus === "success")
      combinedArray = [...combinedArray, ...arbitrumData];

    const sortedArray = combinedArray.sort((a, b) => {
      return (
        new Date(b.block_timestamp).getTime() -
        new Date(a.block_timestamp).getTime()
      );
    });

    setAggData(sortedArray);
  }, [
    ethData,
    optimismData,
    gnosisData,
    arbitrumData,
    ethDataStatus,
    optimismDataStatus,
    gnosisDataStatus,
    arbitrumDataStatus,
  ]);
  return (
    <div className="grid gap-2 h-96 overflow-hidden relative min-w-0">
      {aggData &&
        aggData.map((tx) => <Donation key={`tx_${tx.hash}`} tx={tx} />)}
      <div className="absolute -bottom-0 left-0 right-0 h-16 transactions-gradient-bg" />
    </div>
  );
}

function Donation({ tx }: { tx: any }) {
  return (
    <div className="bg-white rounded-lg p-4 flex justify-between gap-4 min-w-0">
      <h2 className="col-span-3 min-w-0 text-[#8b8b8b]">
        {formatDistanceStrict(new Date(tx.block_timestamp), new Date(), {
          addSuffix: true,
        })}
      </h2>
      <div className="flex gap-2 font-medium">
        {tx.erc20_transfers.length ? (
          <>
            <span>
              {formatBalance(tx.erc20_transfers[0].value_formatted, 2)}
            </span>
            <span>{tx.erc20_transfers[0].token_symbol}</span>
          </>
        ) : tx.native_transfers.length ? (
          <>
            <span>
              {formatBalance(tx.native_transfers[0].value_formatted, 2)}
            </span>
            <span>{tx.native_transfers[0].token_symbol}</span>
          </>
        ) : (
          "err"
        )}
      </div>
    </div>
  );
}

function formatBalance(value: number, decimals: number) {
  const balanceFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: decimals,
    minimumIntegerDigits: 1,
    useGrouping: true,
  });
  return balanceFormatter.format(value);
}
