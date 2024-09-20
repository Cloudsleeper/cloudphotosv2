import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { FaGithub, FaInstagram } from 'react-icons/fa'; // Import icons

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSending, setIsSending] = useState(false);
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSending(true);

        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            e.target,
            import.meta.env.VITE_EMAILJS_USER_ID
        )
            .then((result) => {
                setIsSending(false);
                setStatus('Message sent successfully!');
                setFormData({
                    name: '',
                    email: '',
                    message: '',
                });
            }, (error) => {
                setIsSending(false);
                setStatus('Error sending message.');
                console.error('EmailJS Error:', error.text);
            });
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="mb-5 mt-3">
                <div className="lg:w-2/3 mx-auto">
                    <h1 className="text-6xl text-left font-bold mb-4 pt-32">Contact Me</h1>
                    <hr className="border-t-2 border-white my-4" />
                </div>
                <div className="mx-auto items-center w-full text-2xl text-center">
                    <p>Let's get in touch soon</p>
                </div>

                <div className="w-full lg:w-1/2 px-0 flex items-center mx-auto p-6">
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="flex flex-wrap -mx-2 mb-4">
                            <div className="w-full lg:w-1/2 px-2 mb-4 lg:mb-0">
                                <label htmlFor="name" className="sr-only">Name</label>
                                <input
                                    className="form-input w-full border rounded-none px-3 py-2 text-white bg-black"
                                    id="name"
                                    name="name"
                                    placeholder="Name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="w-full lg:w-1/2 px-2">
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input
                                    className="form-input w-full border rounded-none px-3 py-2 text-white bg-black"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <label htmlFor="message" className="sr-only">Message</label>
                        <textarea
                            className="form-textarea w-full border rounded-none px-3 py-2 mb-4 text-white bg-black"
                            id="message"
                            name="message"
                            placeholder="Message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                        <button
                            className={`bg-white text-black py-2 px-4 rounded ${isSending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-400'}`}
                            type="submit"
                            disabled={isSending}
                        >
                            {isSending ? 'Sending...' : 'Send'}
                        </button>
                        {status && <p className="mt-4 text-center">{status}</p>}
                    </form>
                </div>

                {/* Social Media Links */}
                <div className="mt-8 text-center">
                    <p className="text-xl mb-4">Follow or Contact me on:</p>
                    <div className="flex justify-center space-x-4">
                        <a href="https://github.com/Cloudsleeper" target="_blank" rel="noopener noreferrer">
                            <FaGithub className="text-3xl text-white-800 hover:text-yellow-400" />
                        </a>
                        <a href="https://www.instagram.com/cloudsleeper03/" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="text-3xl text-white-600 hover:text-yellow-400" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}