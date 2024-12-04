import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { FaGithub, FaInstagram } from 'react-icons/fa';

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
        <div className="min-h-screen relative">
            {/* Background Image */}
            <div
                className="fixed inset-0 z-0"
                style={{
                    backgroundImage: "url('/img/30 Kodak Ultramax 400 2.jpg')", // Make sure to add your image to public/img/
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                    filter: "brightness(0.3)" // Darkens the background image
                }}
            />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 py-6">
                <div className="mb-5 mt-3">
                    <div className="lg:w-2/3 mx-auto">
                        <h1 className="text-6xl text-left font-bold mb-4 pt-32">Contact Me</h1>
                        <hr className="border-t-2 border-white my-4" />
                    </div>
                    <div className="mx-auto items-center w-full text-2xl text-center">
                        <p className="text-white/90">Let's get in touch soon</p>
                    </div>

                    <div className="w-full lg:w-1/2 px-0 flex items-center mx-auto p-6">
                        <form onSubmit={handleSubmit} className="w-full backdrop-blur-sm bg-black/30 p-8 rounded-lg">
                            <div className="flex flex-wrap -mx-2 mb-4">
                                <div className="w-full lg:w-1/2 px-2 mb-4 lg:mb-0">
                                    <label htmlFor="name" className="sr-only">Name</label>
                                    <input
                                        className="form-input w-full border rounded-none px-3 py-2 text-white bg-black/50 backdrop-blur-sm focus:bg-black/70 transition-all duration-300"
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
                                        className="form-input w-full border rounded-none px-3 py-2 text-white bg-black/50 backdrop-blur-sm focus:bg-black/70 transition-all duration-300"
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
                                className="form-textarea w-full border rounded-none px-3 py-2 mb-4 text-white bg-black/50 backdrop-blur-sm focus:bg-black/70 transition-all duration-300"
                                id="message"
                                name="message"
                                placeholder="Message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                            <button
                                className={`bg-[#000000] text-white py-2 px-4 rounded transition-all duration-300 ${
                                    isSending
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'hover:bg-[#043927] hover:text-black'
                                }`}
                                type="submit"
                                disabled={isSending}
                            >
                                {isSending ? 'Sending...' : 'Send'}
                            </button>
                            {status && (
                                <p className="mt-4 text-center text-white">
                                    {status}
                                </p>
                            )}
                        </form>
                    </div>

                    {/* Social Media Links */}
                    <div className="mt-8 text-center">
                        <p className="text-xl mb-4 text-white/90">Follow or Contact me on:</p>
                        <div className="flex justify-center space-x-4">
                            <a
                                href="https://github.com/Cloudsleeper"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-transform duration-300 hover:scale-110"
                            >
                                <FaGithub className="text-3xl text-white hover:text-[#043927]" />
                            </a>
                            <a
                                href="https://www.instagram.com/cloudsleeper03/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-transform duration-300 hover:scale-110"
                            >
                                <FaInstagram className="text-3xl text-white hover:text-[#043927]" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
