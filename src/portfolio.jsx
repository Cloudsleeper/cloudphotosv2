import { useState, useEffect } from "react";
import Masonry from 'react-masonry-css';
import { motion } from 'framer-motion';
import 'tailwindcss/tailwind.css';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css'; // Import the lightbox styles

const photos = [
    { src: '/img/MichaelandNickWithCoffee.webp', alt: 'Photo 1' },
    { src: '/img/Train.webp', alt: 'Photo 2' },
    { src: '/img/NickLookingOut.webp', alt: 'Photo 1' },
    { src: '/img/UndergroundClub.jpg', alt: 'Photo 2' },
    { src: '/img/UndergroundClub.jpg', alt: 'Photo 2' },
    { src: '/img/MichaelandNickWithCoffee.webp', alt: 'Photo 1' },
    { src: '/img/UndergroundClub.jpg', alt: 'Photo 2' },
    { src: '/img/MichaelandNickWithCoffee.webp', alt: 'Photo 1' },
    { src: '/img/MichaelandNickWithCoffee.webp', alt: 'Photo 1' },
    { src: '/img/UndergroundClub.jpg', alt: 'Photo 2' },
    { src: '/img/MichaelandNickWithCoffee.webp', alt: 'Photo 1' },
    { src: '/img/UndergroundClub.jpg', alt: 'Photo 2' },
    { src: '/img/UndergroundClub.jpg', alt: 'Photo 2' },
    { src: '/img/MichaelandNickWithCoffee.webp', alt: 'Photo 1' },
    { src: '/img/UndergroundClub.jpg', alt: 'Photo 2' },
    { src: '/img/MichaelandNickWithCoffee.webp', alt: 'Photo 1' },
];

const breakpoints = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
};

export default function Portfolio() {
    const [showIntro, setShowIntro] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setShowIntro(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    return (
        <>
            <div className="relative">
                <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-500 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="text-white text-5xl font-bold"
                    >
                        My Photography Portfolio
                    </motion.h1>
                </div>

                <Masonry
                    breakpointCols={breakpoints}
                    className="my-masonry-grid p-4"  // Add padding around the grid
                    columnClassName="my-masonry-grid_column"
                >
                    {photos.map((photo, index) => (
                        <div key={index} className="p-2">
                            <img
                                src={photo.src}
                                alt={photo.alt}
                                className="w-full h-auto rounded-lg shadow-md cursor-pointer"  // Make images clickable
                                onClick={() => openLightbox(index)}
                            />
                        </div>
                    ))}
                </Masonry>

                {lightboxOpen && (
                    <Lightbox
                        images={photos.map(photo => photo.src)}
                        currentIndex={currentImageIndex}
                        onClose={closeLightbox}
                        onPrev={() =>
                            setCurrentImageIndex((currentImageIndex + photos.length - 1) % photos.length)
                        }
                        onNext={() =>
                            setCurrentImageIndex((currentImageIndex + 1) % photos.length)
                        }
                    />
                )}

                <div className="w-full text-center py-10">
                    <h2 className="text-4xl font-bold">About My Work</h2>
                    <p className="text-lg mt-4 max-w-2xl mx-auto">
                        I’m a photographer based in Colorado Springs. My work primarily captures scenes that intrigue me, often focusing on foggy landscapes, intriguing details, or captivating lighting. I also enjoy including self-portraits in my landscapes but usually shoot alone. I started photography a year ago and have since improved my craft and found my unique style.
                    </p>
                </div>
            </div>
        </>
    );
}