import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-xl font-bold mb-2">Your Brand</h3>
                        <p className="text-sm">A brief description of your brand or website.</p>
                    </div>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
                        <ul className="text-sm">
                            <li><Link to="/privacy-policy" className="hover:text-gray-300">Privacy Policy</Link></li>
                            <li><Link to="/terms-of-service" className="hover:text-gray-300">Terms of Service</Link></li>
                            <li><Link to="/contact" className="hover:text-gray-300">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3">
                        <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="https://twitter.com/youraccount" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="https://facebook.com/youraccount" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="https://instagram.com/youraccount" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
