"use client";
import Image from "next/image";
import clsx from "clsx";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { CopyAddressButton } from "./components/CopyAddressButton";
import { Donations } from "./components/Donations";

import { PAGE_WRAP } from "./util";

export default function Home() {
  return (
    <>
      <Header />
      <main className={clsx(PAGE_WRAP, "grow lg:pt-6")}>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-16">
          <section className="grid gap-4 pb-8 lg:col-span-1 lg:col-start-1 lg:pb-0">
            <h1 className="text-4xl font-bold tracking-[-.02em]">
              Fund evacuations from Gaza with crypto
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
                  <CopyAddressButton />
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
            <div className="grid grid-cols-2 pt-6 pb-6">
              <div className="grid justify-center text-center gap-1">
                <h3 className="text-neutral-500 font-medium text-xl">
                  Total
                  <br className="lg:hidden" /> Raised
                </h3>
                <span className="text-4xl text-black font-bold flex items-end">
                  + $300k
                </span>
              </div>
              <div className="grid justify-center text-center gap-1">
                <h3 className="text-neutral-500 font-medium text-xl">
                  Evacuations Registered
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
            <Donations />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
