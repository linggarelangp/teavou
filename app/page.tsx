import { JSX } from "react";

import Navbar from "@/app/components/navigation/Navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import Image from "next/image";

const Home = (): JSX.Element => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <section className="container mx-auto px-4 py-8">
          <div className='max-w-7xl my-1srun lg:px-8'>
            <div className='mx-auto max-w-7xl px-4 lg:px-8 bg-digital rounded-3xl bg-lime-100 relative'>
              <div className='grid grid-cols-1 lg:grid-cols-2 my-16'>
                <div className="mx-auto sm:mx-5 my-20">
                  <div className="py-5 text-center lg:text-start">
                    <h1 className='text-6xl lg:text-80xl font-bold text-darkpurple'>
                      Nikmati <br /> kesegaran <br /> dalam tiap <br /> tegukan.
                    </h1>
                  </div>
                  <div className='my-7 text-center lg:text-start'>
                    <button className='text-sm md:text-xl font-semibold hover:shadow-xl bg-lime-400 text-white py-3 px-6 md:py-5 md:px-14 rounded-full hover:bg-hoblue'>
                      Get Started
                    </button>
                  </div>
                </div>

                <div className='lg:-m-24 lg:pt-20 hidden lg:block'>
                  <Image src="/img/banner.png" alt="banner-image" width={800} height={642} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
};

export default Home;