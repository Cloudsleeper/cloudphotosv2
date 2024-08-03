import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
    const location = useLocation();

    return (
        <motion.div
            initial={{ top: -96, opacity: 0 }}
            animate={{ top: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="text-lg tracking-wider fixed w-full px-12 py-6 flex justify-between items-center z-30"
        >
            <div>Cloud's Photography</div>
            <div className="flex justify-center items-center gap-6 text-gray-400">
                <Link className={`transition ${location.pathname == "/" && "text-white"}`} to="/">Home</Link>
                <Link className={`transition ${location.pathname == "/portfolio" && "text-white"}`} to="/portfolio">Portfolio</Link>
                <Link className={`transition ${location.pathname == "/blog" && "text-white"}`} to="/blog">Blog</Link>
                <Link className={`transition ${location.pathname == "/contact" && "text-white"}`} to="/contact">Contact</Link>
            </div>
        </motion.div>
    )
}