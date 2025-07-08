import Image from "next/image";
import React, { JSX } from "react";
import { FaArrowRight } from "react-icons/fa6";

const HomeMain = (): JSX.Element => {
    return (
        <section
            id="home"
            className="relative h-screen w-full bg-black"
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/img/bg-image.jpg"
                    alt="Teavou Background"
                    fill
                    className="object-cover object-center lg:object-top-bottom"
                    priority
                />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/75 lg:bg-black/85" />

            {/* Content on Top */}
            <div className="absolute max-w-4/5 lg:mx-auto inset-0 flex items-center justify-start px-5">
                <div className="max-w-3xl text-white space-y-6">
                    <h1 className="w-auto lg:w-4/5 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                        Your Cozy Corner for Tea & Fresh Bread
                    </h1>

                    <p className="w-auto lg:w-3/4 text-lg md:text-xl text-gray-200 font-extralight">
                        From a warm cup of tea to freshly baked bread, we bring you calm and comfort.
                    </p>

                    <button className="btn btn-lg border-none bg-lime-600 hover:bg-lime-700 text-white font-semibold px-6 py-3 rounded-box shadow cursor-pointer transition-colors duration-300 ease-in-out">
                        Explore Now
                        <span><FaArrowRight /></span>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default HomeMain