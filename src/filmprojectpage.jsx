import { useState } from "react";
import 'tailwindcss/tailwind.css';
import { Cloudinary } from "@cloudinary/url-gen";

const ProjectPage = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dqm0d9qcv'
        }
    });

    const photos = [
        {
            src: '29_lxbfyd',
            alt: 'Negative Space 1'
        },
        {
            src: '31_zthn4c',
            alt: 'Negative Space 2'
        },
        {
            src: '35_olgy7y',
            alt: 'Negative Space 3'
        },
        {
            src: '34_lp1hvv',
            alt: 'Negative Space 4'
        },
        {
            src: '00_ykvysr',
            alt: 'Negative Space 5'
        },
        {
            src: '01_rs6hbx',
            alt: 'Negative Space 6'
        }
    ];

    const getCloudinaryUrl = (imageName, isGalleryImage = true) => {
        const width = isGalleryImage ? 'w_800,' : '';
        return `https://res.cloudinary.com/dqm0d9qcv/image/upload/${width}q_auto,f_auto/v1/${imageName}`;
    };

    const openImageViewer = (src) => {
        setSelectedImage(getCloudinaryUrl(src, false));
    };

    const closeImageViewer = () => {
        setSelectedImage(null);
    };

    return (
        <div className="min-h-screen bg-[#000000] text-white">
            {/* Hero Image with Overlay Text */}
            <div className="w-full h-[80vh] relative">
                <img
                    src={getCloudinaryUrl(photos[0].src)}
                    alt="Project Hero"
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => openImageViewer(photos[0].src)}
                />
                {/* Title Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white">
                        Negative Space
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <div className="px-4 sm:px-6 md:px-12 lg:px-24 py-12 sm:py-16">
                <div className="max-w-7xl mx-auto">
                    {/* Project Title */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8 sm:mb-12">
                        Negative Space
                    </h2>

                    {/* Description and Side Image Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
                        <div className="lg:col-span-7">
                            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                                Negative Space - A photographic exploration where reality softens at the edges, inviting viewers into spaces where mystery feels like home. (More of a place holder for Maybe a better project, take these photos not a serious.)
                            </p>
                        </div>
                        <div className="lg:col-span-5">
                            <div className="h-48 md:h-64">
                                <img
                                    src={getCloudinaryUrl(photos[1].src)}
                                    alt={photos[1].alt}
                                    className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity duration-300"
                                    onClick={() => openImageViewer(photos[1].src)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {photos.map((photo, index) => (
                            <div key={index} className="aspect-[3/2]">
                                <img
                                    src={getCloudinaryUrl(photo.src)}
                                    alt={photo.alt}
                                    className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity duration-300"
                                    loading="lazy"
                                    onClick={() => openImageViewer(photo.src)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
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
        </div>
    );
};

export default ProjectPage;
