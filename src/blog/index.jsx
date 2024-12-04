import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../../components/airtable.js';

export default function BlogIndex() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPosts = async () => {
            const fetchedPosts = await fetchPosts();
            setPosts(fetchedPosts);
            setLoading(false);
        };
        getPosts();
    }, []);

    if (loading) return (
    <div className='w-screen h-screen flex justify-center items-center'>
        <div class="loader"></div>
    </div>
    );

    return (
        <div className="max-w-4xl mx-auto pt-32">
            <h1 className="text-6xl font-bold mb-8">You Found My Blogs!</h1>
            {posts.map(post => (
                    <div key={post.id} className="mb-8 p-4 border-b border-gray-300">
                        <h2 className="text-2xl font-semibold mb-2">
                            <Link to={`/blog/${post.id}`} className="text-white hover:text-black">
                                {post.fields.title}
                            </Link>
                        </h2>
                        <p className="text-white mb-4">{post.fields.date}</p>
                        <p className="text-lg">{post.fields.excerpt}</p>
                    </div>
            ))}
        </div>
    );
}