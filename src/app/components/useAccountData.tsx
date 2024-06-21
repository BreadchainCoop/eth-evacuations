import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const FROM_BLOCK = "19435069";

const chainMap = {
  eth: "0x1",
  gnosis: "0x64",
  polygon: "0x89",
  optimism: "0xa",
  base: "0x2105",
  arbitrum: "0xa4b1",
};

export function useAccountData(
  chainString: keyof typeof chainMap,
  account: string
) {
  const [dataState, setDataState] = useState<{
    status: "loading" | "success" | "error";
    data: any[];
  }>({
    status: "loading",
    data: [],
  });

  const fetchTransactions = () => {
    console.log("fetching transactions...");
    return fetch("/.netlify/functions/account-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chain: chainMap[chainString],
        account,
        fromBlock: FROM_BLOCK,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // setCursor(data.cursor);
        return data;
      })
      .catch((err) => {
        setDataState({ status: "error", data: [] });
      });
  };

  const { data } = useQuery({
    queryKey: [`accountData_${chainString}`],
    queryFn: () => fetchTransactions(),
    placeholderData: keepPreviousData,
    refetchInterval: 2000,
  });

  useEffect(() => {
    if (!data) return;

    const parsedData = data.result.length
      ? data.result
          .filter((tx: any) => {
            return (
              (tx.category === "receive" || tx.category == "token receive") &&
              !tx.possible_spam &&
              tx.block_timestamp
            );
          })
          .map((tx: any) => {
            return {
              ...tx,
              chain: chainString,
            };
          })
      : [];

    setDataState({ status: "success", data: parsedData });
  }, [data, account, chainString]);

  return dataState;
}
