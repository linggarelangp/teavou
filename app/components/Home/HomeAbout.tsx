import Image from "next/image";
import React, { JSX } from "react";
import { FaLeaf } from "react-icons/fa6";

const HomeAbout = (): JSX.Element => {
    return (
        <section
            id="about"
            className="relative h-screen w-full bg-black"
        >
            <div className="absolute w-full lg:max-w-4/5 md:mx-auto inset-0 flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-center relative px-5">

                    {/* Background Leaf Icons (Optional Decoration) */}
                    <FaLeaf className="absolute text-lime-200 text-[8rem] -top-10 right-10 rotate-[180deg] hidden lg:block" />

                    {/* Left Image */}
                    <div className="relative order-2 lg:order-1">
                        <Image
                            src="/img/tea-splash.jpg"
                            alt="Tea cup"
                            width={500}
                            height={600}
                            priority
                            className="w-full lg:w-3/4 h-full rounded-2xl shadow-xl object-cover"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/50" />
                    </div>

                    {/* Right Content */}
                    <div className="space-y-6 order-1 lg:order-2 mb-5 md:mb-0">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-lime-600">
                            About Teavou
                        </h2>

                        <p className="text-sm md:text-base text-white font-light leading-relaxed text-justify">
                            At Teavou, we believe tea is more than just a drink it&apos;s a ritual, a story, and a moment of peace. Every cup is carefully brewed using handpicked leaves, served in an environment crafted to soothe your soul and inspire tranquility.
                        </p>

                        <p className="text-sm md:text-base text-white font-light leading-relaxed text-justify">
                            From classic green tea to bold herbal blends, our selection invites you to explore the diverse world of teas in the most comforting way.
                        </p>
                        <button className="mt-4 inline-block px-6 py-3 bg-lime-600 text-white font-semibold rounded-box shadow hover:bg-lime-700 transition cursor-pointer">
                            Discover Our Teas
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeAbout;