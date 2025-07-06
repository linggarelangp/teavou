import { JSX } from "react";

import Navbar from "@/app/components/navigation/Navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import { CiInstagram } from "react-icons/ci";


const About = (): JSX.Element => {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <section className="container mx-auto px-4 py-8">
                    <div className="bg-lightgrey" id="blog-section">
                        <div className='mx-auto max-w-7xl sm:py-4 lg:px-8 '>
                            <div className="text-center">
                                <h3 className="text-black text-lg font-normal tracking-widest">About Us</h3>
                                <h3 className="text-4xl sm:text-6xl font-bold">Know More About Us</h3>
                                <br />
                                <p>Welcome to TeavoU Cafe, a hidden haven to escape the hustle and bustle of city life. As you step inside, let your senses be pampered by the fragrant aromas of our curated collection of the finest teas from around the world. Here, each cup is not just a drink, but an invitation to embark on a journey of taste, exploring the unique stories and rich traditions behind it. With a warm and calming atmosphere, we create the perfect space for you to relax, find inspiration, or simply enjoy a precious moment in silence. Come discover your favorite tea and recreate your ritual of serenity with us.</p>
                                <br />
                                <div className="aspect-video w-300 rounded-lg overflow-hidden shadow-xl">
                                    <video className="w-full h-full object-cover justify-center" src="img/tea.mp4" controls loop>
                                        Browser Anda tidak mendukung tag video.
                                    </video>
                                </div>
                            </div>

                            <div className="text-center mt-20">
                                <div className='mx-auto max-w-7xl my-5 p-10 bg-gradient-to-b from-lime-100 to-white rounded-3xl relative'>
                                    <h3 className="text-black text-lg font-normal tracking-widest">Contact Us</h3>
                                    <h3 className="text-4xl sm:text-6xl font-bold">Come and Join to Us</h3>
                                    <br />
                                    <div className='grid grid-cols-1 lg:grid-cols-3 my-7'>
                                        <div>
                                            <h5 className="text-black text-lg font-bold tracking-widest">Address</h5>
                                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.281890488202!2d110.40443267031077!3d-7.759899559822606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a599bd3bdc4ef%3A0x6f1714b0c4544586!2sUniversitas%20Amikom%20Yogyakarta!5e0!3m2!1sid!2sid!4v1751223993359!5m2!1sid!2sid" className="w-100 h-100 m-5"></iframe>
                                            <p>Jl. Ring Road Utara, Ngringin, Condongcatur, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281</p>
                                        </div>
                                        <div>
                                            <h5 className="text-black text-lg font-bold tracking-widest">Opening Hours</h5>
                                            <p className="m-5">Monday - Friday</p>
                                            <p>10:00 AM - 08:00 PM</p>
                                            <p>10:00 AM - 08:00 PM</p>
                                            <p>10:00 AM - 08:00 PM</p>
                                            <p>10:00 AM - 08:00 PM</p>
                                            <p>10:00 AM - 08:00 PM</p>
                                        </div>
                                        <div>
                                            <h5 className="text-black text-lg font-bold tracking-widest">Social</h5>
                                            <CiInstagram className="w-32 h-32" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
            </main >
            <footer>
                <Footer />
            </footer>
        </>
    )
};

export default About;