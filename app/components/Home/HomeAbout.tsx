import Image from "next/image";
import Link from "next/link";
import React, { JSX } from "react";
import { FaLeaf } from "react-icons/fa6";

const HomeAbout = (): JSX.Element => {
    return (
        <section id="about" className="relative w-full min-h-screen bg-black text-white py-20 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
                {/* Leaf Decoration */}
                <FaLeaf className="absolute text-lime-200 text-[8rem] -top-10 right-10 rotate-[180deg] hidden lg:block z-0 opacity-20" />

                {/* Left Image */}
                <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl shadow-xl order-2 lg:order-1 z-0">
                    <Image
                        src="/img/tea-splash.jpg"
                        alt="Tea cup"
                        fill
                        priority
                        className="object-cover rounded-2xl"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 rounded-2xl z-10" />
                </div>

                {/* Right Content */}
                <div className="space-y-6 order-1 lg:order-2">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-lime-500">
                        Tentang Kami
                    </h2>

                    <p className="text-base md:text-lg font-light leading-relaxed text-gray-200 text-justify">
                        Di Teavou, kami percaya teh lebih dari sekadar minuman - melainkan sebuah ritual, kisah, dan momen kedamaian. Setiap cangkir diseduh dengan cermat menggunakan daun teh pilihan, disajikan dalam suasana yang dirancang untuk menenangkan jiwa dan menginspirasi ketenangan.
                    </p>

                    <p className="text-base md:text-lg font-light leading-relaxed text-gray-300 text-justify">
                        Dari teh hijau klasik hingga racikan herbal yang berani, pilihan kami mengundang anda untuk menjelajahi dunia teh yang beragam dengan cara yang paling menenangkan.
                    </p>

                    <Link
                        href="/products"
                        className="inline-block bg-lime-600 hover:bg-lime-700 text-white font-semibold px-6 py-3 rounded-box shadow-md transition duration-300"
                    >
                        Temukan Produk Kami
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HomeAbout;