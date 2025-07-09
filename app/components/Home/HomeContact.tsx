import React, { JSX } from "react";

const openingHours = [
    { day: "Senin", hours: "10:00 AM - 08:00 PM" },
    { day: "Selasa", hours: "10:00 AM - 08:00 PM" },
    { day: "Rabu", hours: "10:00 AM - 08:00 PM" },
    { day: "Kamis", hours: "10:00 AM - 08:00 PM" },
    { day: "Jumat", hours: "10:00 AM - 08:00 PM" },
    { day: "Sabtu", hours: "10:00 AM - 10:00 PM" },
    { day: "Minggu", hours: "10:00 AM - 10:00 PM" },
];


const HomeContact = (): JSX.Element => {
    return (
        <section
            id="contact"
            className="relative w-full min-h-screen bg-black text-white py-20 px-4"
        >
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-16">
                <h1 className="text-4xl font-bold text-lime-500 mb-4">Hubungi Kami</h1>
                <p className="text-lg text-gray-300">
                    Whether you&apos;re craving a cozy corner or a refreshing chat over tea,
                    we&apos;re always here for you.
                </p>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10 max-w-6xl mx-auto">
                {/* Contact Form */}
                <div className="bg-zinc-900 rounded-xl p-8 shadow-lg space-y-6">
                    <form className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-300">
                                Nama
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="w-full px-4 py-2 bg-zinc-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                                placeholder="Nama Anda"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-300">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-2 bg-zinc-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                                placeholder="email@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-1 text-gray-300">
                                Kesan & Saran
                            </label>
                            <textarea
                                id="message"
                                rows={4}
                                className="w-full px-4 py-2 bg-zinc-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                                placeholder="Masukan kesan dan saran Anda di sini..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-lime-600 hover:bg-lime-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
                        >
                            Berikan Tanggapan
                        </button>
                    </form>
                </div>

                {/* Opening Hours */}
                <div className="space-y-6">
                    <h4 className="text-xl font-bold bg-lime-600 text-white p-4 text-center rounded-box shadow mb-2">
                        Jam Operasional
                    </h4>

                    <ul className="space-y-3">
                        {openingHours.map((item, index) => (
                            <li key={index} className="flex justify-between pt-3 text-gray-300 text-sm">
                                <span>{item.day}</span>
                                <span className="text-gray-400">{item.hours}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default HomeContact;