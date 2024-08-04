import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [ShowIntro, setShowIntro] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const introRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (introRef.current) {
        const rect = introRef.current.getBoundingClientRect();
        const offsetY = window.scrollY + rect.top;
        const isOutOfView = offsetY > (window.innerHeight + 200);
        setShowIntro(isOutOfView);
        setScrollY(window.scrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
        <div
          ref={introRef}
          className={`${ShowIntro && 'opacity-0'} fixed w-full text-center top-1/2 text-[100px] font-bold`}
        >
          You Found The About Me.
        </div>
        <div
            className="absolute w-full h-full overflow-hidden"
            style={{
            clipPath: "inset(0 0 0 0)",
            }}
        >
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url(/img/background.webp)",
                    backgroundPosition: window.innerWidth > 1536 ? 'center 70%' : 'center 55%',
                    backgroundSize: "cover",
                    filter: 'brightness(65%)'
                }}
            />
            <AnimatePresence>
                { scrollY < (window.innerHeight / 4) && (
                    <motion.div
                        className="absolute flex justify-center items-center flex-col max-w-max bottom-[10%] left-0 right-0 m-auto z-30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: .5 } }}
                        exit={{ opacity: 0 }}
                    >
                        About My Work
                        <svg className="animate-bounce w-12 h-12 fill-white" viewBox="0 0 24 24"><path d="M18.71,8.21a1,1,0,0,0-1.42,0l-4.58,4.58a1,1,0,0,1-1.42,0L6.71,8.21a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.59,4.59a3,3,0,0,0,4.24,0l4.59-4.59A1,1,0,0,0,18.71,8.21Z"/></svg>
                    </motion.div>
                ) }
            </AnimatePresence>
            <div
                className="absolute inset-0 z-20"
                style={{
                    backgroundImage: "url(/img/foreground.webp)",
                    backgroundPosition: window.innerWidth > 1536 ? 'center 70%' : 'center 55%',
                    backgroundSize: "cover",
                }}
            />
            <motion.div
                className="fixed tracking-tighter w-full text-center text-[300px] font-bold z-10"
                style={{ left: '50%', transform: 'translate(-50%, -50%)' }}
                initial={{ opacity: 0, top: '22.5%' }}
                animate={{ opacity: 1, top: '27.5%' }}
                transition={{ duration: .5, delay: .5, ease: 'easeInOut' }}
            >
                I'm Cloud.
            </motion.div>
        </div>
        <div className="w-full pt-[calc(100vh+200px)] text-center">
            <div className={`${!ShowIntro && 'opacity-0'} font-bold text-[100px]`}>You Found The About Me.</div>
        </div>
        <div>
            <img className="float-left w-100 h-100 " src="/" />
            <p className = "float-right text-2xl grid grid-cols-1fr 1fr max-w-5xl pr-64">I'm a photographer based in Colorado Springs. My photography mostly consists of scenes that I capture because
            something in them intrigues me. This usually means foggy atmospheric landscapes, details of everyday life or lighting that i just can't resist to photograph
            I also have a collection of self portait, because i like to have subjects in my landscapes, but most of the time I go out and shoot alone. I started photography about a year ago and learned Affinity Photo 2 around the same
            time as well. My editing and photography back then were terrible at the the time, but I slowly became better at the craft and also found my space in photography. </p>
        </div>

        <div className="pt-[500px] opacity-0">A</div>
    </>
  );
}