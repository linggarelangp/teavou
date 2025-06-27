import { JSX } from "react";

import Navbar from "@/app/components/navigation/Navbar/Navbar";
import Footer from "@/app/components/footer/Footer";

const Home = (): JSX.Element => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <section className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Welcome to Our Website</h1>
          <p className="text-lg">This is the home page content.</p>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
};

export default Home;