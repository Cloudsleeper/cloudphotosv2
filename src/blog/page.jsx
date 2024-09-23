
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostById } from '../../components/airtable.js';

export default function BlogPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const getPost = async () => {
            try {
                const fetchedPost = await fetchPostById(id);
                setPost(fetchedPost);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };
        getPost();
    }, [id]);

    const handleImageClick = (url) => {
        setSelectedImage(url);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    if (!post) return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;

    return (
        <div className="max-w-6xl mx-auto pt-32 px-4 text-white">
            <h1 className="text-5xl font-bold mb-4 text-center">{post.title}</h1>
            <p className="text-xl mb-8 text-center">{post.date}</p>

            {post.headerImage && (
                <div className="mb-12 overflow-hidden rounded-lg shadow-lg">
                    <img
                        src={post.headerImage}
                        alt="Header"
                        className="w-full h-auto object-cover"
                        loading="lazy"
                    />
                </div>
            )}

            <div className="mb-12 text-lg leading-relaxed">
                {post.body}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {post.images.map((img, index) => (
                    <div key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                        <img
                            src={img}
                            alt={`Image ${index + 1}`}
                            className="w-full h-64 object-cover cursor-pointer transform hover:scale-105 transition-transform duration-300"
                            onClick={() => handleImageClick(img)}
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>

            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4"
                    onClick={closeModal}
                >
                    <div className="relative max-w-4xl max-h-full">
                        <img
                            src={selectedImage}
                            alt="Selected"
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button
                            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors duration-200"
                            onClick={closeModal}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}