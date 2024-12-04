import { useState } from "react";
import Masonry from 'react-masonry-css';
import 'tailwindcss/tailwind.css';
import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
    cloud: {
        cloudName: 'dqm0d9qcv'
    }
});

const photos = [
    {
        src: '16_Kodak_Ultramax_400_2_esijcn',
        alt: 'Birds'
    },
    {
        src: '28_Candido_200_35mm_bwxapk',
        alt: 'Yellow trees'
    },
    {
        src: 'MichaelInNature_xzljtk',
        alt: 'MichaelInNature'
    },
    {
        src: 'kai1_tayxli',
        alt: 'KaiInBotanicGardens'
    },
    {
        src: 'MichaelisinHeaven_xuhutu',
        alt: 'MichaelisinHeaven'
    },
    {
        src: '34_tczvth',
        alt: 'Abstract landscape'
    },
];

const breakpoints = {
    default: 4,
    1024: 4, // Maintain 4 columns on larger screens
    768: 2,  // 2 columns on tablet/mobile
    480: 2   // Keep 2 columns on smaller mobile
};

export default function Portfolio() {
    const [selectedImage, setSelectedImage] = useState(null);

    const getCloudinaryUrl = (imageName, isGalleryImage = true) => {
        // For gallery images, limit width to 800px for better quality
        // For lightbox, use full resolution
        const width = isGalleryImage ? 'w_800,' : '';
        return `https://res.cloudinary.com/dqm0d9qcv/image/upload/${width}q_auto,f_auto/${imageName}`;
    };

    const openImageViewer = (src) => {
        setSelectedImage(getCloudinaryUrl(src, false));
    };

    const closeImageViewer = () => {
        setSelectedImage(null);
    };

    return (
        <div className="min-h-screen bg-#1A1A19 text-white">
            {/* Header Image with Centered Text */}
            <div className="w-full h-[70vh] mb-8 relative">
                <img
                    src={getCloudinaryUrl('29_Fujifilm_Acros_II_100_osxu9f', false)} // Full res for header
                    alt="Header"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-5xl md:text-6xl font-light text-white">
                        Photography
                    </h1>
                </div>
            </div>

            {/* Description Section */}
            <div className="px-6 md:px-12 lg:px-24 mb-12">
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-white text-lg md:text-xl leading-relaxed">
                        I'm a photographer based in Colorado Springs. My work primarily captures scenes that intrigue me,
                        often focusing on foggy landscapes, intriguing details, or captivating lighting. I started photography
                        a year ago and have since improved my craft and found my unique style.
                    </p>
                </div>
            </div>

            {/* Gallery Section */}
            <div className="container mx-auto px-4">
                <Masonry
                    breakpointCols={breakpoints}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {photos.map((photo, index) => (
                        <div key={index} className="mb-4">
                            <img
                                src={getCloudinaryUrl(photo.src)}
                                alt={photo.alt}
                                className="w-full cursor-pointer hover:opacity-90 transition-opacity duration-300"
                                loading="lazy"
                                onClick={() => openImageViewer(photo.src)}
                            />
                        </div>
                    ))}
                </Masonry>
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
                    onClick={closeImageViewer}
                >
                    <img
                        src={selectedImage}
                        alt="Selected"
                        className="max-w-[90vw] max-h-[90vh] object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button
                        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200"
                        onClick={closeImageViewer}
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}

            <style jsx global>{`
                .my-masonry-grid {
                    display: flex;
                    margin-left: -24px; /* Increased gap between columns */
                    width: auto;
                }

                .my-masonry-grid_column {
                    padding-left: 24px;
                    background-clip: padding-box;
                }

                .my-masonry-grid_column > div {
                    margin-bottom: 24px; /* Increased gap between rows */
                }

                .my-masonry-grid img {
                    transition: opacity 0.2s ease;
                    width: 100%;
                    height: auto;
                    display: block;
                }

                .my-masonry-grid img:hover {
                    opacity: 0.8;
                }

                @media (max-width: 768px) {
                    .my-masonry-grid {
                        margin-left: -16px;
                    }
                    .my-masonry-grid_column {
                        padding-left: 16px;
                    }
                    .my-masonry-grid_column > div {
                        margin-bottom: 16px;
                    }
                }
            `}</style>
        </div>
    );
}
