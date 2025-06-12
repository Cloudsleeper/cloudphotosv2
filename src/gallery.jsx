import { useState, useEffect, useCallback } from "react";
import Masonry from 'react-masonry-css';
import 'tailwindcss/tailwind.css';
import OAuth from 'oauth-1.0a';
import CryptoJS from 'crypto-js';

// Configuration for SmugMug API
const SMUGMUG_API_URL = 'https://api.smugmug.com/api/v2';
const CONSUMER_KEY = 'xsnnk5xB34tqWTZM5rjJnVSNBXwRHBnq';
const CONSUMER_SECRET = 'MB4hLVbCcP3JCkKM9kcxdvB4PjX36qtpB2s8kLGDZ27n7f8hKcqdTZWTg7SbnTpX';
const ACCESS_TOKEN = 'zGxfbcMwKNJvpLDWGCf5qcLr46xsTPHR';
const ACCESS_TOKEN_SECRET = 'FvkNjg2GG9JR6vQP53V3Tmc2SBt3B8MvBJrQvbHKBRKjtvnSw3hw23LdmtznBS5M';
const ALBUM_ID = 'BsrhhG';

const breakpoints = {
    default: 4,
    1024: 3,
    768: 2,
    480: 1
};

export default function Portfolio() {
    const [photos, setPhotos] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [headerImage, setHeaderImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [debugInfo, setDebugInfo] = useState(null);

    // Initialize OAuth
    const initOAuth = () => {
        return OAuth({
            consumer: {
                key: CONSUMER_KEY,
                secret: CONSUMER_SECRET
            },
            signature_method: 'HMAC-SHA1',
            hash_function(base_string, key) {
                return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
            }
        });
    };

    // Generate OAuth headers for a request
    const getAuthHeader = useCallback((url, method) => {
        const oauth = initOAuth();
        const requestData = {
            url: url,
            method: method
        };

        const token = {
            key: ACCESS_TOKEN,
            secret: ACCESS_TOKEN_SECRET
        };

        return oauth.toHeader(oauth.authorize(requestData, token));
    }, []);

    // Fetch album images from SmugMug
    const fetchAlbumImages = useCallback(async () => {
        try {
            setDebugInfo("Fetching images from SmugMug album...");

            const url = `${SMUGMUG_API_URL}/album/${ALBUM_ID}!images`;
            const authHeader = getAuthHeader(url, 'GET');

            const response = await fetch(url, {
                headers: {
                    ...authHeader,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch photos with status ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            console.log("API Response:", data); // Log the full response for debugging

            if (!data.Response || !data.Response.AlbumImage || data.Response.AlbumImage.length === 0) {
                throw new Error('No images found in the specified album.');
            }

            setDebugInfo(`Fetched ${data.Response.AlbumImage.length} photos successfully`);
            return data.Response.AlbumImage;
        } catch (error) {
            console.error('Error fetching album images:', error);
            throw error;
        }
    }, [getAuthHeader]);

    useEffect(() => {
        // Initialize gallery
        const initializeGallery = async () => {
            try {
                setLoading(true);
                setDebugInfo("Initializing gallery...");

                // Fetch photos from SmugMug
                const photosData = await fetchAlbumImages();

                if (photosData.length === 0) {
                    setError('No photos found in your SmugMug album.');
                    setLoading(false);
                    return;
                }

                // Use the first photo as header
                setHeaderImage(photosData[0]);

                // Use the rest for the gallery
                setPhotos(photosData.slice(1, 50)); // Limit to 50 images for better performance
                setLoading(false);

            } catch (error) {
                console.error('Gallery initialization error:', error);
                setError(`Failed to load gallery: ${error.message}`);
                setLoading(false);
            }
        };

        initializeGallery();
    }, [fetchAlbumImages]);

    const openImageViewer = (photo) => {
        setSelectedImage(photo);
    };

    const closeImageViewer = () => {
        setSelectedImage(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#1A1A19] text-white flex flex-col items-center justify-center p-4">
                <p className="mb-4">Loading gallery...</p>
                {debugInfo && (
                    <div className="mt-4 p-4 bg-gray-800 rounded max-w-lg overflow-auto">
                        <p className="text-sm text-gray-400">Debug info:</p>
                        <p className="text-sm text-gray-300 whitespace-pre-wrap">{debugInfo}</p>
                    </div>
                )}
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#1A1A19] text-white flex flex-col items-center justify-center p-4">
                <p className="text-red-400 mb-4">{error}</p>
                {debugInfo && (
                    <div className="mt-4 p-4 bg-gray-800 rounded max-w-lg overflow-auto">
                        <p className="text-sm text-gray-400">Debug info:</p>
                        <p className="text-sm text-gray-300 whitespace-pre-wrap">{debugInfo}</p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#1A1A19] text-white">
            {/* Header Image with Centered Text */}
            {headerImage && (
                <div className="w-full h-[70vh] mb-8 relative">
                    <img
                        src={headerImage.ArchivedUri || headerImage.ImageUrl}
                        alt={headerImage.Title || "Header"}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h1 className="text-5xl md:text-6xl font-light text-white drop-shadow-lg">
                            Photography
                        </h1>
                    </div>
                </div>
            )}

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
                    {photos.map((photo) => (
                        <div key={photo.ImageKey} className="mb-4">
                            <img
                                src={photo.ArchivedUri || photo.ImageUrl}
                                alt={photo.Title || photo.FileName || "Gallery image"}
                                className="w-full cursor-pointer hover:opacity-90 transition-opacity duration-300"
                                loading="lazy"
                                onClick={() => openImageViewer(photo)}
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
                        src={selectedImage.ArchivedUri || selectedImage.ImageUrl}
                        alt={selectedImage.Title || "Selected image"}
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
                    margin-left: -24px;
                    width: auto;
                }

                .my-masonry-grid_column {
                    padding-left: 24px;
                    background-clip: padding-box;
                }

                .my-masonry-grid_column > div {
                    margin-bottom: 24px;
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
