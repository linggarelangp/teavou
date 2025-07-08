import React, { JSX } from "react";

const openingHours = [
    { day: "Monday", hours: "10:00 AM - 08:00 PM" },
    { day: "Tuesday", hours: "10:00 AM - 08:00 PM" },
    { day: "Wednesday", hours: "10:00 AM - 08:00 PM" },
    { day: "Thursday", hours: "10:00 AM - 08:00 PM" },
    { day: "Friday", hours: "10:00 AM - 08:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 10:00 PM" },
    { day: "Sunday", hours: "10:00 AM - 10:00 PM" },
];


const HomeContact = (): JSX.Element => {
    return (
        <section id="contact" className="relative w-full bg-black text-white py-20 px-4">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-16">
                <h1 className="text-4xl font-bold text-lime-500 mb-4">Contact</h1>
                <p className="text-lg text-gray-300">
                    Whether you&apos;re craving a cozy corner or a refreshing chat over tea,
                    we&apos;re always here for you.
                </p>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 lg:gap-y-0 lg:gap-10 max-w-6xl mx-auto">
                {/* Left: Google Maps */}
                <div className="col-span-2 bg-zinc-900 rounded-xl p-8 shadow-lg space-y-6">
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold mb-1">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                                placeholder="Your Name"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-semibold mb-1">Message</label>
                            <textarea
                                id="message"
                                rows={4}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                                placeholder="Write your message..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="bg-lime-600 hover:bg-lime-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Right: Info Blocks */}
                <div className="space-y-2">
                    <h4 className="text-xl font-bold bg-lime-600 p-3 text-center rounded-box mb-10">Opening Hours</h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                        {openingHours.map((item, index) => (
                            <li key={index} className="flex items-center justify-between gap-2 space-y-2 ">
                                <span className="text-gray-300">{item.day}</span>
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