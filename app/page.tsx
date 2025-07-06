import Image from "next/image";
import React, { JSX } from "react";

import Navbar from "@/app/components/navigation/Navbar/Navbar";
import { Footer } from "@/app/components/Footer";

const Home = (): JSX.Element => {
  return (
    <React.Fragment>
      <header>
        <Navbar />
      </header>

      <main className="w-full px-4 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center">
            <div className="py-5 text-center lg:text-start">
              <h1 className="text-2xl lg:text-5xl/tight font-bold text-lime-500 mb-4 lg:mb-6">Your Cozy Corner for Tea & Fresh Bread</h1>
              <p className="w-full lg:w-3/4 text-lg font-medium text-orange-500">From a warm cup of tea to freshly baked bread we bring the very best to customers.</p>

              <div className="hidden lg:block my-7">
                <button className="text-base lg:text-xl py-4 px-7 rounded-4xl cursor-pointer bg-lime-500 text-white font-semibold shadow-lg hover:bg-lime-600 transition duration-300 ease-in-out">
                  Get Started
                </button>
              </div>
            </div>
          </div>

          <div className="px-4 lg:px-0 lg:flex lg:justify-end lg:items-center mb-10">
            <Image
              src="/img/greentea.jpg"
              alt="greentea-image"
              width={500}
              height={500}
              className="w-full lg:w-3/4 lg:h-3/4 rounded-3xl shadow-lg bg-cover object-cover"
            />
          </div>
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </React.Fragment>
  );
};

export default Home;