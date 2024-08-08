import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../../components/airtable.js';

export default function BlogIndex() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const fetchedPosts = await fetchPosts();
                console.log('Fetched posts:', fetchedPosts); // Debug line
                setPosts(fetchedPosts);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        getPosts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="max-w-4xl mx-auto pt-32">
            <h1 className="text-6xl font-bold mb-8">You Found My Blogs!</h1>
            {posts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                posts.map(post => (
                    <div key={post.id} className="mb-8 p-4 border-b border-gray-300">
                        <h2 className="text-2xl font-semibold mb-2">
                            <Link to={`/blog/${post.id}`} className="text-blue-500 hover:underline">
                                {post.fields.title}
                            </Link>
                        </h2>
                        <p className="text-gray-600 mb-4">{post.fields.date}</p>
                        <p className="text-lg">{post.fields.excerpt}</p>
                    </div>
                ))
            )}
        </div>
    );
}