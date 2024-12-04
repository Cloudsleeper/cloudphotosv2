import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './index';
import Navigation from '../components/navigation';
import Contact from './contact.jsx';
import Projects from './projects.jsx';
import Gallery from './gallery.jsx';
import FilmProject from './filmprojectpage.jsx';

function Router() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/filmprojectpage" element={<FilmProject />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
