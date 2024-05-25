import type { Context } from "@netlify/functions";

import { ETH_EVACUATONS_ADDRESS } from "../../constants";

export default async (req: Request, context: Context) => {
  const MORALIS_API_KEY = process.env.MORALIS_API_KEY;
  if (MORALIS_API_KEY === undefined) return Response.error();

  const body = await req.json();

  const data = await fetch(
    `https://deep-index.moralis.io/api/v2.2/wallets/${ETH_EVACUATONS_ADDRESS}/history?chain=${body.chain}&from_block=${body.fromBlock}&include_internal_transactions=false&order=DESC`,
    {
      headers: {
        accept: "application/json",
        "X-API-Key": MORALIS_API_KEY,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

  return Response.json(data);
};
