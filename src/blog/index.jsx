import { Link } from 'react-router-dom';

export default function BlogIndex() {
    const posts = [
        {
            id: 1,
            title: 'My First Blog Post',
            date: 'August 3, 2024',
            excerpt: 'Welcome to my blog! This is the first post. Here, I\'ll share my thoughts, experiences, and updates.',
        },
        {
            id: 2,
            title: 'Another Post',
            date: 'August 4, 2024',
            excerpt: 'This is another post. I plan to write about various topics, including photography, travel, and personal insights.',
        },
        // Add more posts here
    ];
    return (
    // Sample blog post data
        <div className="max-w-4xl mx-auto pt-32">
            <h1 className="text-6xl font-bold mb-8">You Found My Blogs!</h1>
            {posts.map(post => (
                <div key={post.id} className="mb-8 p-4 border-b border-gray-300">
                    <h2 className="text-2xl font-semibold mb-2">
                        <Link to={`/blog/${post.id}`} className="text-blue-500 hover:underline">
                            {post.title}
                        </Link>
                    </h2>
                    <p className="text-gray-600 mb-4">{post.date}</p>
                    <p className="text-lg">{post.excerpt}</p>
                </div>
            ))}
        </div>
    )
}