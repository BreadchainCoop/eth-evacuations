"use client";

import { useEffect, useState } from "react";
import { formatDistanceStrict } from "date-fns";
import Image from "next/image";

import { useAccountData } from "./components/useAccountData";

import { ETH_EVACUATONS_ADDRESS } from "../../constants";
import clsx from "clsx";
import { PAGE_WRAP } from "./util";

export const truncateAddress = (address: string): string =>
  `${address.slice(0, 5)}...${address.slice(address.length - 5)}`;

export default function Home() {
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

  useEffect(() => {
    if (
      ethDataStatus === "loading" ||
      optimismDataStatus === "loading" ||
      gnosisDataStatus === "loading"
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
    ethDataStatus,
    optimismDataStatus,
    gnosisDataStatus,
  ]);

  return (
    <>
      <header className={clsx(PAGE_WRAP, "px-2 py-4")}>
        <Image
          className="transform -translate-x-1.5"
          src="/logo.png"
          alt="logo"
          width="40"
          height="40"
        />
      </header>
      <main className={PAGE_WRAP}>
        <section className="grid gap-4 pb-8">
          <h1 className="text-4xl font-bold tracking-[-.02em]">
            Fund evacuations from gaza with crypto
          </h1>
          <h3 className="text-xl font-medium text-neutral-400">
            Crypto was made for this
          </h3>
          <div className="grid justify-center">
            <span className="px-4 py-2 font-medium text-xl rounded-full bg-white text-black">
              ethevacuations.eth
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(ETH_EVACUATONS_ADDRESS);
              }}
              className="flex gap-2 items-center justify-center font-medium text-neutral-400 pt-2"
              title="copy address"
            >
              {truncateAddress(ETH_EVACUATONS_ADDRESS)}

              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.5 1.99988H5.5C5.36739 1.99988 5.24021 2.05256 5.14645 2.14632C5.05268 2.24009 5 2.36727 5 2.49988V4.99988H2.5C2.36739 4.99988 2.24021 5.05256 2.14645 5.14632C2.05268 5.24009 2 5.36727 2 5.49988V13.4999C2 13.6325 2.05268 13.7597 2.14645 13.8534C2.24021 13.9472 2.36739 13.9999 2.5 13.9999H10.5C10.6326 13.9999 10.7598 13.9472 10.8536 13.8534C10.9473 13.7597 11 13.6325 11 13.4999V10.9999H13.5C13.6326 10.9999 13.7598 10.9472 13.8536 10.8534C13.9473 10.7597 14 10.6325 14 10.4999V2.49988C14 2.36727 13.9473 2.24009 13.8536 2.14632C13.7598 2.05256 13.6326 1.99988 13.5 1.99988ZM10 12.9999H3V5.99988H10V12.9999ZM13 9.99988H11V5.49988C11 5.36727 10.9473 5.24009 10.8536 5.14632C10.7598 5.05256 10.6326 4.99988 10.5 4.99988H6V2.99988H13V9.99988Z"
                  fill="#8B8B8B"
                />
              </svg>
            </button>
          </div>
          <div className="flex justify-center">
            <Image src="/qr_code.png" alt="hero" width="190" height="189" />
          </div>
          <div className="grid grid-cols-2 pt-6">
            <div className="grid justify-center text-center">
              <h3 className="text-neutral-500 font-medium text-xl">
                Total Raised
              </h3>
              <span className="text-4xl text-black font-bold">$250k</span>
            </div>
            <div className="grid justify-center text-center">
              <h3 className="text-neutral-500 font-medium text-xl">
                People Saved
              </h3>
              <span className="text-4xl text-black font-bold">100</span>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold">Recent Donations</h2>

          <div className="grid gap-2">
            {aggData &&
              aggData.map((tx) => <Donation key={`tx_${tx.hash}`} tx={tx} />)}
          </div>
        </section>
      </main>
    </>
  );
}

function Donation({ tx }: { tx: any }) {
  console.log(tx);
  return (
    <div className="bg-white rounded-lg p-2 flex justify-between gap-4">
      <h2 className="col-span-3">
        {formatDistanceStrict(new Date(tx.block_timestamp), new Date(), {
          addSuffix: true,
        })}
      </h2>
      <div>
        {tx.erc20_transfers.length ? (
          <>
            <span>{tx.erc20_transfers[0].value_formatted}</span>
            <span>{tx.erc20_transfers[0].token_symbol}</span>
          </>
        ) : tx.native_transfers.length ? (
          <>
            <span>{tx.native_transfers[0].value_formatted}</span>
            <span>{tx.native_transfers[0].token_symbol}</span>
          </>
        ) : (
          "err"
        )}
      </div>
    </div>
  );
}
