import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./index";
import BlogIndex from "./blog";
import BlogPage from "./blog/page";
import Navigation from "../components/navigation";
import Contact from "./contact.jsx";
import Portfolio from "./portfolio.jsx";


function Router() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/blog" Component={BlogIndex} />
        <Route path="/blog/:id" Component={BlogPage} />
        <Route path="/contact" Component={Contact} />
        <Route path="/portfolio" Component={Portfolio} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;
