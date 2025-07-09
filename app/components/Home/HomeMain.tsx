import Image from "next/image";
import Link from "next/link";
import React, { JSX } from "react";
import { FaArrowRight } from "react-icons/fa6";

const HomeMain = (): JSX.Element => {
    return (
        <section
            id="home"
            className="relative w-full min-h-screen bg-black text-white overflow-hidden"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/img/bg-image.jpg"
                    alt="Teavou Background"
                    fill
                    className="object-cover object-center lg:object-top"
                    priority
                />
                {/* Overlay di atas image */}
                <div className="absolute inset-0 bg-black/75 lg:bg-black/80 z-10" />
            </div>

            {/* Content */}
            <div className="relative flex items-center justify-start px-6 sm:px-10 lg:px-16 py-24 min-h-screen max-w-7xl mx-auto">
                <div className="space-y-6 max-w-3xl">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                        Your Cozy Corner for Tea & Fresh Bread
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-gray-200 font-extralight">
                        From a warm cup of tea to freshly baked bread, we bring you calm and comfort.
                    </p>

                    <Link
                        href="#menu"
                        className="inline-flex items-center gap-2 bg-lime-600 hover:bg-lime-700 text-white font-semibold px-6 py-3 rounded-box shadow transition-colors duration-300 ease-in-out text-base sm:text-lg"
                    >
                        Explore Now
                        <FaArrowRight className="text-sm sm:text-base" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default HomeMain