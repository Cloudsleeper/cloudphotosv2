import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './index';
import BlogIndex from './blog';
import BlogPage from './blog/page';
import Navigation from '../components/navigation';
import Contact from './contact.jsx';
import Portfolio from './portfolio.jsx';

function Router() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<BlogIndex />} />
                <Route path="/blog/:id" element={<BlogPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/portfolio" element={<Portfolio />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
