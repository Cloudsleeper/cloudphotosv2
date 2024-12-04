import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <motion.div
            initial={{ top: -96, opacity: 0 }}
            animate={{ top: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 px-6 py-4 flex items-center z-30 bg-[#000000] text-[#ffffff]"
        >
            {/* Logo */}
            <img src="/camerafaviconwhite.png" className="w-8 h-8 md:w-10 md:h-10" alt="Logo" />

            {/* Desktop Navigation */}
            <div className="hidden md:flex flex-grow justify-end items-center gap-6 text-gray-400">
                <Link className={`nav-link transition ${isActive("/") ? "active text-white" : ""}`} to="/">Home</Link>
                <Link className={`nav-link transition ${isActive("/projects") ? "active text-white" : ""}`} to="/projects">Projects</Link>
                <Link className={`nav-link transition ${isActive("/gallery") ? "active text-white" : ""}`} to="/gallery">Gallery</Link>
                <Link className={`nav-link transition ${isActive("/contact") ? "active text-white" : ""}`} to="/contact">Contact</Link>
            </div>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden ml-auto text-gray-400 focus:outline-none"
                onClick={toggleMenu}
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>

            {/* Mobile Navigation */}
            <div className={`fixed top-0 right-0 w-2/3 md:w-1/3 h-full bg-[#000000] text-white transition-transform transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
                <button
                    className="absolute top-4 right-4 text-gray-400"
                    onClick={toggleMenu}
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <div className="flex flex-col items-center mt-12">
                    <Link className={`nav-link py-4 text-lg ${isActive("/") ? "active text-white" : ""}`} to="/" onClick={toggleMenu}>Home</Link>
                    <Link className={`nav-link py-4 text-lg ${isActive("/projects") ? "active text-white" : ""}`} to="/projects" onClick={toggleMenu}>Projects</Link>
                    <Link className={`nav-link py-4 text-lg ${isActive("/gallery") ? "active text-white" : ""}`} to="/gallery" onClick={toggleMenu}>Gallery</Link>
                    <Link className={`nav-link py-4 text-lg ${isActive("/contact") ? "active text-white" : ""}`} to="/contact" onClick={toggleMenu}>Contact</Link>
                </div>
            </div>
        </motion.div>
    );
}
