
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
    const [showIntro, setShowIntro] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0); // Add this state
    const introRef = useRef(null);

    useEffect(() => {
        // Set initial window width
        setWindowWidth(window.innerWidth);

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        const handleScroll = () => {
            if (introRef.current) {
                const rect = introRef.current.getBoundingClientRect();
                const offsetY = window.scrollY + rect.top;
                const isOutOfView = offsetY > (window.innerHeight + 200);
                setShowIntro(isOutOfView);
                setScrollY(window.scrollY);
            }
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <div
                ref={introRef}
                className={`fixed w-full text-center top-[45%] transform -translate-y-1/2 px-4 md:px-20 text-[40px] sm:text-[70px] lg:text-[100px] font-bold ${showIntro && 'opacity-0'}`}
            >
                Driven by Everyday Beauty
            </div>

            <div
                className="absolute inset-0 w-full h-full overflow-hidden"
                style={{
                    clipPath: "inset(0 0 0 0)",
                }}
            >
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: "url(/img/background.webp)",
                        backgroundPosition: windowWidth > 1536 ? 'center 70%' : 'center 55%',
                        backgroundSize: "cover",
                        filter: 'brightness(65%)'
                    }}
                />
                <AnimatePresence>
                    {scrollY < (window.innerHeight / 4) && (
                        <motion.div
                            className="absolute flex justify-center items-center flex-col max-w-max bottom-[10%] left-0 right-0 mx-auto z-30"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { delay: 0.5 } }}
                            exit={{ opacity: 0 }}
                        >
                            About My Work
                            <svg className="animate-bounce w-8 h-8 md:w-12 md:h-12 fill-white" viewBox="0 0 24 24">
                                <path d="M18.71,8.21a1,1,0,0,0-1.42,0l-4.58,4.58a1,1,0,0,1-1.42,0L6.71,8.21a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.59,4.59a3,3,0,0,0,4.24,0l4.59-4.59A1,1,0,0,0,18.71,8.21Z"/>
                            </svg>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div
                    className="absolute inset-0 z-20"
                    style={{
                        backgroundImage: "url(/img/foreground.webp)",
                        backgroundPosition: windowWidth > 1536 ? 'center 70%' : 'center 55%',
                        backgroundSize: "cover",
                    }}
                />
                <motion.div
                    className="fixed tracking-tighter w-full text-center text-[100px] sm:text-[200px] xl:text-[300px] font-bold z-10 leading-[.8]"
                    style={{ left: '50%', transform: 'translate(-50%, -50%)' }}
                    initial={{ opacity: 0, top: '22.5%' }}
                    animate={{ opacity: 1, top: '27.5%' }}
                    transition={{ duration: 0.5, delay: 0.5, ease: 'easeInOut' }}
                >
                    I'm Cloud.
                </motion.div>
            </div>

            <div className="px-4 md:px-20 w-full pt-[calc(100vh+200px)] text-center">
                <div className={`${!showIntro && 'opacity-0'} font-bold text-[40px] sm:text-[70px] lg:text-[100px]`}>
                    Driven by Everyday Beauty
                </div>
            </div>

            <div className="px-8 sm:px-20 xl:px-8 py-8 flex max-lg:flex-col justify-center items-center gap-20 lg:gap-12">
                <div className="relative w-full sm:w-3/4 md:w-[400px] md:h-[400px]">
                    <img className="relative w-full h-full object-cover" src="/img/XT5C4918.jpg" alt="Description"/>
                </div>
                <p className="text-2xl w-full lg:w-[700px]">
                    I'm a photographer based in <strong>Colorado Springs</strong>. My photography mostly consists of scenes that I capture because something in them intrigues me. This usually means foggy atmospheric landscapes, details of everyday life or lighting that I just can't resist to photograph. I also have a collection of self-portraits because I like to have subjects in my landscapes, but most of the time I go out and shoot alone. I started photography about a year ago and learned Affinity Photo 2 around the same time as well. My editing and photography back then were terrible at the time, but I slowly became better at the craft and also found my space in photography.
                </p>
            </div>

            <div className="w-full px-4 py-20 bg-black">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Link
                        to="/projects"
                        className="group relative h-[400px] overflow-hidden"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{
                                backgroundImage: "url(/img/running%20in%20the%20snow.jpg)",
                                filter: "brightness(60%)"
                            }}
                        />
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
                            <h2 className="text-4xl font-bold mb-4">Projects</h2>
                            <div className="w-12 h-[2px] bg-[#043927] transform origin-left transition-transform duration-300 group-hover:scale-x-150" />
                            <p className="mt-4 text-center px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                View my photography projects
                            </p>
                        </div>
                    </Link>

                    <Link
                        to="/gallery"
                        className="group relative h-[400px] overflow-hidden"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{
                                backgroundImage: "url(/img/29%20Fujifilm%20Acros%20II%20100.jpg)",
                                filter: "brightness(60%)"
                            }}
                        />
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
                            <h2 className="text-4xl font-bold mb-4">Gallery</h2>
                            <div className="w-12 h-[2px] bg-[#043927] transform origin-left transition-transform duration-300 group-hover:scale-x-150" />
                            <p className="mt-4 text-center px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Explore my photo collection
                            </p>
                        </div>
                    </Link>

                    <Link
                        to="/contact"
                        className="group relative h-[400px] overflow-hidden"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{
                                backgroundImage: "url(/img/30%20Kodak%20Ultramax%20400%202.jpg)",
                                filter: "brightness(60%)"
                            }}
                        />
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
                            <h2 className="text-4xl font-bold mb-4">Contact</h2>
                            <div className="w-12 h-[2px] bg-[#043927] transform origin-left transition-transform duration-300 group-hover:scale-x-150" />
                            <p className="mt-4 text-center px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Get in touch with me
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}