import { useState } from "react";
import Masonry from 'react-masonry-css';
import 'tailwindcss/tailwind.css';
import { Cloudinary } from "@cloudinary/url-gen";

// Initialize Cloudinary
const cld = new Cloudinary({
    cloud: {
        cloudName: 'dqm0d9qcv' // Replace with your cloud name
    }
});

// Update photos array to use Cloudinary URLs
const photos = [
    {
        src: 'DSCF3860_k57ism', // Just the file name without extension
        alt: 'SilverCar'
    },
    {
        src: 'KaiOnRocks2_ch5hcg', // Just the file name without extension
        alt: 'KaiOnRocks'
    },
    {
        src: 'MichaelInNature_xzljtk', // Just the file name without extension
        alt: 'MichaelInNature'
    },
    {
        src: 'kai1_tayxli', // Just the file name without extension
        alt: 'KaiInBotanicGardens'
    },
    {
        src: 'MichaelisinHeaven_xuhutu', // Just the file name without extension
        alt: 'MichaelisinHeaven'
    },
    // ... other photos
];

const breakpoints = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
};

export default function Portfolio() {
    const [selectedImage, setSelectedImage] = useState(null);

    // Helper function to get Cloudinary URL
    const getCloudinaryUrl = (imageName) => {
        return `https://res.cloudinary.com/dqm0d9qcv/image/upload/q_auto,f_auto/${imageName}`;
    };

    const openImageViewer = (src) => {
        setSelectedImage(src);
    };

    const closeImageViewer = () => {
        setSelectedImage(null);
    };

    return (
        <div className="bg-#232325 min-h-screen text-white">
            <div className="container mx-auto px-4 pt-20 pb-12">
                <h1 className="text-5xl font-bold text-center mb-8 text-white">My Portfolio</h1>

                <Masonry
                    breakpointCols={breakpoints}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {photos.map((photo, index) => (
                        <div key={index} className="mb-4">
                            <div className="overflow-hidden rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                                <img
                                    src={getCloudinaryUrl(photo.src)}
                                    alt={photo.alt}
                                    className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
                                    loading="lazy"
                                    onClick={() => openImageViewer(getCloudinaryUrl(photo.src))}
                                    style={{ maxHeight: '300px' }}
                                />
                            </div>
                        </div>
                    ))}
                </Masonry>

                {selectedImage && (
                    <div
                        className="fixed inset-0 bg-[#232325] bg-opacity-95 flex items-center justify-center z-50"
                        onClick={closeImageViewer}
                    >
                        <div
                            className="relative max-w-[95%] max-h-[95%] flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage}
                                alt="Selected"
                                className="max-w-full max-h-full object-contain"
                                style={{ maxHeight: '90vh', maxWidth: '90vw' }}
                            />
                            <button
                                className="absolute top-4 right-4 text-white bg-white bg-opacity-10 rounded-full p-2 hover:bg-opacity-25 transition-colors duration-200"
                                onClick={closeImageViewer}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                <div className="mt-16 border border-gray-800 rounded-lg p-8">
                    <h2 className="text-4xl font-bold text-center text-white mb-6">About My Work</h2>
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        I'm a photographer based in Colorado Springs. My work primarily captures scenes that intrigue me, often focusing on foggy landscapes, intriguing details, or captivating lighting. I also enjoy including self-portraits in my landscapes but usually shoot alone. I started photography a year ago and have since improved my craft and found my unique style.
                    </p>
                </div>
            </div>
        </div>
    );
}