"use client";

import { useEffect, useState } from "react";
import { formatDistanceStrict } from "date-fns";
import Image from "next/image";

import { useAccountData } from "./components/useAccountData";

import { ETH_EVACUATONS_ADDRESS } from "../../constants";
import clsx from "clsx";
import { PAGE_WRAP } from "./util";

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
    <>
      <header className={clsx(PAGE_WRAP, "w-full px-2 py-4")}>
        <Image
          className="transform -translate-x-1.5"
          src="/logo.png"
          alt="logo"
          width="40"
          height="40"
        />
      </header>
      <main className={clsx(PAGE_WRAP, "grow lg:pt-6")}>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-16">
          <section className="grid gap-4 pb-8 lg:col-span-1 lg:col-start-1 lg:pb-0">
            <h1 className="text-4xl font-bold tracking-[-.02em]">
              Fund evacuations from gaza with crypto
            </h1>
            <h3 className="text-xl font-medium text-neutral-400">
              Crypto was made for this
            </h3>
          </section>

          <section className="lg:order-3 lg:col-span-1 lg:col-start-2 lg:row-span-2">
            <div className="lg:bg-white lg:rounded-[2rem] flex items-center justify-center lg:py-16">
              <div>
                <div className="grid justify-center">
                  <span className="px-4 py-2 font-medium text-xl rounded-full bg-white text-black">
                    ethevacuations.eth
                  </span>
                  <CopyAddress />
                </div>
                <div className="flex justify-center pt-4">
                  <Image
                    src="/qr_code.jpg"
                    alt="hero"
                    width="190"
                    height="189"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="lg:order-4 pb-4">
            <div className="grid grid-cols-2 pt-6 pb-4">
              <div className="grid justify-center text-center">
                <h3 className="text-neutral-500 font-medium text-xl">
                  Total Raised
                </h3>
                <span className="text-4xl text-black font-bold">+ $300k</span>
              </div>
              <div className="grid justify-center text-center">
                <h3 className="text-neutral-500 font-medium text-xl">
                  People Saved
                </h3>
                <span className="text-4xl text-black font-bold">+ 60</span>
              </div>
            </div>
            <div className="pb-4 flex justify-between items-center lg:pt-12">
              <h2 className="text-2xl font-bold">Recent Donations</h2>
              <div>
                <Image
                  src="/network_icons.png"
                  alt="network icons"
                  width="84"
                  height="25"
                />
              </div>
            </div>
            <div className="grid gap-2 max-h-96 overflow-hidden relative">
              {aggData &&
                aggData.map((tx) => <Donation key={`tx_${tx.hash}`} tx={tx} />)}
              <div className="absolute -bottom-0 left-0 right-0 h-16 transactions-gradient-bg" />
            </div>
          </section>
        </div>
      </main>
      <footer className="pt-8 pb-2">
        <div className="text-center py-4">
          <p className="text-sm flex items-center justify-center gap-2">
            Made with{" "}
            <span className="w-4 h-4 inline-block">
              <svg
                viewBox="0 0 60 58"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.4348 0.5C4.67181 0.5 0 5.17181 0 10.9348C0 16.3448 4.11705 20.7932 9.38895 21.3178V44.8476C9.38895 52.0514 15.2287 57.8911 22.4324 57.8911H37.0408C44.2445 57.8911 50.0842 52.0514 50.0842 44.8477V21.3569C55.6061 21.0864 60 16.5237 60 10.9348C60 5.17181 55.3282 0.5 49.5652 0.5L10.4348 0.5Z"
                  fill="url(#paint0_linear_2974_31682)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_2974_31682"
                    x1="8.25"
                    y1="45.6955"
                    x2="49.412"
                    y2="9.45708"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#D04EC5" />
                    <stop offset="1" stopColor="#ED7BC7" />
                  </linearGradient>
                </defs>
              </svg>
            </span>{" "}
            by{" "}
            <a
              href="https://twitter.com/breadchain_"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              @breadchain_
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}

function Donation({ tx }: { tx: any }) {
  console.log(tx);
  return (
    <div className="bg-white rounded-lg p-4 flex justify-between gap-4">
      <h2 className="col-span-3 text-[#8b8b8b]">
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

function CopyAddress() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [setCopied, copied]);

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(ETH_EVACUATONS_ADDRESS);
        setCopied(true);
      }}
      className="flex gap-2 items-center justify-center font-medium text-neutral-400 pt-2 hover:text-neutral-600 active:text-black transition-all"
      title="copy address"
    >
      {copied ? (
        <span className="text-[#0FBC00] flex items-center gap-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.1475 7.3525C14.2528 7.45797 14.312 7.60094 14.312 7.75C14.312 7.89906 14.2528 8.04203 14.1475 8.1475L8.8975 13.3975C8.79204 13.5028 8.64907 13.562 8.5 13.562C8.35094 13.562 8.20797 13.5028 8.1025 13.3975L5.8525 11.1475C5.75314 11.0409 5.69905 10.8998 5.70162 10.7541C5.70419 10.6084 5.76323 10.4693 5.86629 10.3663C5.96935 10.2632 6.10839 10.2042 6.25411 10.2016C6.39984 10.199 6.54087 10.2531 6.6475 10.3525L8.5 12.2041L13.3525 7.3525C13.458 7.24716 13.6009 7.18799 13.75 7.18799C13.8991 7.18799 14.042 7.24716 14.1475 7.3525ZM19.5625 10C19.5625 11.8913 19.0017 13.7401 17.9509 15.3126C16.9002 16.8852 15.4067 18.1108 13.6594 18.8346C11.9121 19.5584 9.9894 19.7477 8.13445 19.3788C6.27951 19.0098 4.57564 18.099 3.2383 16.7617C1.90096 15.4244 0.990216 13.7205 0.621245 11.8656C0.252274 10.0106 0.441643 8.08791 1.16541 6.34059C1.88917 4.59327 3.11482 3.09981 4.68736 2.04907C6.25991 0.998331 8.10872 0.4375 10 0.4375C12.5352 0.440477 14.9658 1.44891 16.7584 3.24158C18.5511 5.03425 19.5595 7.46478 19.5625 10ZM18.4375 10C18.4375 8.33122 17.9427 6.69992 17.0155 5.31238C16.0884 3.92484 14.7706 2.84338 13.2289 2.20477C11.6871 1.56615 9.99064 1.39906 8.35393 1.72462C6.71722 2.05019 5.2138 2.85378 4.03379 4.03379C2.85379 5.21379 2.05019 6.71721 1.72463 8.35393C1.39907 9.99064 1.56616 11.6871 2.20477 13.2289C2.84338 14.7706 3.92484 16.0884 5.31238 17.0155C6.69992 17.9426 8.33122 18.4375 10 18.4375C12.237 18.435 14.3817 17.5453 15.9635 15.9635C17.5453 14.3817 18.435 12.237 18.4375 10Z"
              fill="#0FBC00"
            />
          </svg>
          copied!
        </span>
      ) : (
        <>
          {truncateAddress(ETH_EVACUATONS_ADDRESS)}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 1.99988H5.5C5.36739 1.99988 5.24021 2.05256 5.14645 2.14632C5.05268 2.24009 5 2.36727 5 2.49988V4.99988H2.5C2.36739 4.99988 2.24021 5.05256 2.14645 5.14632C2.05268 5.24009 2 5.36727 2 5.49988V13.4999C2 13.6325 2.05268 13.7597 2.14645 13.8534C2.24021 13.9472 2.36739 13.9999 2.5 13.9999H10.5C10.6326 13.9999 10.7598 13.9472 10.8536 13.8534C10.9473 13.7597 11 13.6325 11 13.4999V10.9999H13.5C13.6326 10.9999 13.7598 10.9472 13.8536 10.8534C13.9473 10.7597 14 10.6325 14 10.4999V2.49988C14 2.36727 13.9473 2.24009 13.8536 2.14632C13.7598 2.05256 13.6326 1.99988 13.5 1.99988ZM10 12.9999H3V5.99988H10V12.9999ZM13 9.99988H11V5.49988C11 5.36727 10.9473 5.24009 10.8536 5.14632C10.7598 5.05256 10.6326 4.99988 10.5 4.99988H6V2.99988H13V9.99988Z" />
          </svg>
        </>
      )}
    </button>
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

function truncateAddress(address: string): string {
  return `${address.slice(0, 5)}...${address.slice(address.length - 5)}`;
}
