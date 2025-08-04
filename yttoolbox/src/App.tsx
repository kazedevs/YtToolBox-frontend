import { Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
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
import BlogPost from "./pages/BlogPost";

const App = () => {
  return (
    <HelmetProvider>
      <Layout>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          {/* Tools Routes */}
          <Route path="/tools/thumbnail-downloader" element={<ThumbnailDownloader />} />
          
          <Route path="/tools/pfp-downloader" element={<PFPDownloader />} />
          <Route path="/tools/banner-downloader" element={<BannerDownloader />} />
          <Route path="/tools/comments-extractor" element={<CommentsExtractor />} />
          <Route path="/tools/title-extractor" element={<TitleExtractor />} />
          
          {/* Redirect old routes */}
          <Route path="/thumbnail-downloader" element={<Navigate to="/tools/thumbnail-downloader" replace />} />
          <Route path="/pfp-downloader" element={<Navigate to="/tools/pfp-downloader" replace />} />
          <Route path="/banner-downloader" element={<Navigate to="/tools/banner-downloader" replace />} />
          <Route path="/comments-extractor" element={<Navigate to="/tools/comments-extractor" replace />} />
          <Route path="/title-extractor" element={<Navigate to="/tools/title-extractor" replace />} />
          
          {/* Catch all route */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Layout>
    </HelmetProvider>
  );
};

export default App;
