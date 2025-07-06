import { JSX } from "react";

import Navbar from "@/app/components/navigation/Navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import Link from "next/link";
import Image from "next/image";


const Product = (): JSX.Element => {
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
                                <h3 className="text-blue text-lg font-normal tracking-widest">MENU</h3>
                                <h3 className="text-4xl sm:text-6xl font-bold">Spesial Our Menu</h3>
                            </div>
                            <div className='grid grid-cols-1 lg:grid-cols-4 my-7'>
                                <div>
                                    <div className='bg-white m-3 px-3 pt-3 pb-5 my-3 shadow-lg rounded-3xl relative'>
                                        <Image src="/img/tea.jpg" alt="tea" width={250} height={300} className="inline-block m-auto" />
                                        <Link href="/">
                                            <h3 className="absolute bg-lime-400 text-white hover:bg-black hover:shadow-xl mt-4 mx-40 py-3 px-6 rounded-full article-img">$40</h3>
                                        </Link>
                                        <h4 className='text-2xl font-bold pt-6 text-black'>Hot Tea</h4>
                                        <div>
                                            <h3 className='text-base font-normal pt-6 pb-2 opacity-75'>Spesial best tea</h3>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className='bg-white m-3 px-3 pt-3 pb-5 my-3 shadow-lg rounded-3xl relative'>
                                        <Image src="/img/greentea-1.jpg" alt="greentea" width={350} height={600} className="inline-block m-auto" />
                                        <Link href="/">
                                            <h3 className="absolute bg-lime-400 text-white hover:bg-black hover:shadow-xl mt-4 mx-40 py-3 px-6 rounded-full article-img">$40</h3>
                                        </Link>
                                        <h4 className='text-2xl font-bold pt-6 text-black'>Hot Greentea</h4>
                                        <div>
                                            <h3 className='text-base font-normal pt-6 pb-2 opacity-75'>Spesial leaf tea</h3>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className='bg-white m-3 px-3 pt-3 pb-5 my-3 shadow-lg rounded-3xl relative'>
                                        <Image src="/img/teh hijau3.jpeg" alt="matcha" width={250} height={300} className="inline-block m-auto" />
                                        <Link href="/">
                                            <h3 className="absolute bg-lime-400 text-white hover:bg-black hover:shadow-xl mt-4 mx-40 py-3 px-6 rounded-full article-img">$40</h3>
                                        </Link>
                                        <h4 className='text-2xl font-bold pt-6 text-black'>Hot Matcha</h4>
                                        <div>
                                            <h3 className='text-base font-normal pt-6 pb-2 opacity-75'>Greentea with Milk</h3>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className='bg-white m-3 px-3 pt-3 pb-5 my-3 shadow-lg rounded-3xl relative'>
                                        <Image src="/img/assam.png" alt="kopi" width={400} height={600} className="inline-block m-auto" />
                                        <Link href="/">
                                            <h3 className="absolute bg-lime-400 text-white hover:bg-black hover:shadow-xl mt-4 mx-40 py-3 px-6 rounded-full article-img">$50</h3>
                                        </Link>
                                        <h4 className='text-2xl font-bold pt-6 text-black'>Hot Coffee</h4>
                                        <div>
                                            <h3 className='text-base font-normal pt-6 pb-2 opacity-75'>Spesial coffee</h3>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className='bg-white m-3 px-3 pt-3 pb-5 my-3 shadow-lg rounded-3xl relative'>
                                        <Image src="/img/donat.png" alt="donat" width={250} height={300} className="inline-block m-auto" />
                                        <Link href="/">
                                            <h3 className="absolute bg-lime-400 text-white hover:bg-black hover:shadow-xl mt-4 mx-40 py-3 px-6 rounded-full article-img">$40</h3>
                                        </Link>
                                        <h4 className='text-2xl font-bold pt-6 text-black'>Donat</h4>
                                        <div>
                                            <h3 className='text-base font-normal pt-6 pb-2 opacity-75'>Sugar and Wheat</h3>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className='bg-white m-3 px-3 pt-3 pb-5 my-3 shadow-lg rounded-3xl relative'>
                                        <Image src="/img/cosong.png" alt="Croissant" width={250} height={300} className="inline-block m-auto" />
                                        <Link href="/">
                                            <h3 className="absolute bg-lime-400 text-white hover:bg-black hover:shadow-xl mt-4 mx-40 py-3 px-6 rounded-full article-img">$40</h3>
                                        </Link>
                                        <h4 className='text-2xl font-bold pt-6 text-black'>Croissant</h4>
                                        <div>
                                            <h3 className='text-base font-normal pt-6 pb-2 opacity-75'>Chocolate and Pastry</h3>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className='bg-white m-3 px-3 pt-3 pb-5 my-3 shadow-lg rounded-3xl relative'>
                                        <Image src="/img/baguet.png" alt="Bread" width={250} height={300} className="inline-block m-auto" />
                                        <Link href="/">
                                            <h3 className="absolute bg-lime-400 text-white hover:bg-black hover:shadow-xl  mt-4 mx-40 py-3 px-6 rounded-full article-img">$40</h3>
                                        </Link>
                                        <h4 className='text-2xl font-bold pt-6 text-black'>Bread</h4>
                                        <div>
                                            <h3 className='text-base font-normal pt-6 pb-2 opacity-75'>Wheat</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main >
            <footer>
                <Footer />
            </footer>
        </>
    )
};

export default Product;