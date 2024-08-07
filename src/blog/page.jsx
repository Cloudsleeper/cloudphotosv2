import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostById } from '../../components/airtable.js';

export default function BlogPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

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

    if (!post) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto pt-32">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-600 mb-8">{post.date}</p>
            <p className="text-lg">{post.body}</p>
        </div>
    );
}