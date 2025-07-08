
import React, { JSX } from "react";

import { UserPayload } from "@/app/types";
import { Footer } from "@/app/components/Footer";
import { getUserFromToken } from "@/app/libs/node";
import { Navbar } from "@/app/components/navigation";
import { HomeMain, HomeAbout, HomeMenu, HomeContact } from "@/app/components/Home";

const Home = async (): Promise<JSX.Element> => {
  const token: UserPayload | null = await getUserFromToken();

  return (
    <React.Fragment>
      <header className="w-full relative">
        <Navbar token={token} />
      </header>

      <main className="w-full min-h-screen overflow-hidden space-y-24 bg-black">
        {/* Hero Image */}
        <HomeMain />
        {/* Separator */}
        <div className="w-full h-10 my-10" />
        {/* About Section */}
        <HomeAbout />
        {/* Menu Section */}
        <HomeMenu />
        {/* Contact / Info Section */}
        <HomeContact />
      </main>

      <footer>
        <Footer />
      </footer>
    </React.Fragment>
  );
};

export default Home;