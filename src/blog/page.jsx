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

    if (!post) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto pt-32">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-600 mb-8">{post.date}</p>

            {post.headerImage && (
                <div className="mb-8">
                    <img
                        src={post.headerImage}
                        alt="Header"
                        className="w-full h-auto object-cover"
                    />
                </div>
            )}

            {post.images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                    {post.images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Image ${index}`}
                            className="w-full h-auto object-cover cursor-pointer"
                            onClick={() => handleImageClick(img)}
                        />
                    ))}
                </div>
            )}

            <p className="text-lg">{post.body}</p>

            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50" onClick={closeModal}>
                    <img
                        src={selectedImage}
                        alt="Selected"
                        className="max-w-full max-h-full object-contain"
                        onClick={(e) => e.stopPropagation()} // Prevent click event from propagating to the modal background
                    />
                </div>
            )}
        </div>
    );
}
