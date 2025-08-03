import { Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import TermsOfService from "./pages/TermsOfService";
import ErrorPage from "./pages/ErrorPage";
import { ThumbnailDownloader, PFPDownloader, BannerDownloader, CommentsExtractor } from "./pages/tools";
import TitleExtractor from "./pages/tools/TitleExtractor";
import Blog from "./pages/Blog";

const App = () => {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        {/* Tools Routes */}
        <Route path="/tools/thumbnail-downloader" element={<ThumbnailDownloader />} />
        
        <Route path="/tools/pfp-downloader" element={<PFPDownloader />} />
        <Route path="/tools/banner-downloader" element={<BannerDownloader />} />
        <Route path="/tools/comments-extractor" element={<CommentsExtractor />} />
        <Route path="/tools/title-extractor" element={<TitleExtractor />} />
        <Route path="/404" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Layout>
  );
};

export default App;
