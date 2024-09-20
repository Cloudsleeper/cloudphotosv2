import { useState } from "react";
import Masonry from 'react-masonry-css';
import 'tailwindcss/tailwind.css';

const photos = [
    { src: '/img/MichaelandNickWithCoffee.webp', alt: 'Michael and Nick with coffee' },
    { src: '/img/Train.webp', alt: 'Train' },
    { src: '/img/NickLookingOut.webp', alt: 'Nick looking out' },
    { src: '/img/UndergroundClub.jpg', alt: 'Underground club' },
    // Ensure there are no duplicate entries or filter them if necessary
];

const breakpoints = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
};

export default function Portfolio() {
    const [selectedImage, setSelectedImage] = useState(null);

    const openImageViewer = (src) => {
        setSelectedImage(src);
    };

    const closeImageViewer = () => {
        setSelectedImage(null);
    };

    return (
        <>
            <div className="relative pt-16"> {/* Add padding-top to accommodate the navbar */}
                <Masonry
                    breakpointCols={breakpoints}
                    className="my-masonry-grid p-4"
                    columnClassName="my-masonry-grid_column"
                >
                    {photos.map((photo, index) => (
                        <div key={index} className="p-2">
                            <img
                                src={photo.src}
                                alt={photo.alt}
                                className="w-full h-auto rounded-lg shadow-md cursor-pointer"
                                loading="lazy" // Enable lazy loading
                                onClick={() => openImageViewer(photo.src)}
                            />
                        </div>
                    ))}
                </Masonry>

                {selectedImage && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                        onClick={closeImageViewer} // Close on clicking anywhere outside the image
                    >
                        <div
                            className="relative max-w-[90%] max-h-[90%] flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the image container
                        >
                            <img
                                src={selectedImage}
                                alt="Selected"
                                className="max-w-full max-h-full object-contain"
                                style={{ maxWidth: '90vw', maxHeight: '90vh' }}
                                // Ensure the image is appropriately sized and centered
                            />
                        </div>
                    </div>
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