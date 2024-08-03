import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./index";
import BlogIndex from "./blog";
import BlogPage from "./blog/page";
import Navigation from "../components/navigation";

function Router() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/blog" Component={BlogIndex} />
        <Route path="/blog/:blogId" Component={BlogPage} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;
