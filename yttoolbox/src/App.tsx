import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from 'react';
import ScrollToTop from './components/ScrollToTop';
import Layout from "./components/Layout";

// Lazy load all pages and tools
const LandingPage = lazy(() => import("./pages/LandingPage"));
const About = lazy(() => import("./pages/About"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Contact = lazy(() => import("./pages/Contact"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const Blog = lazy(() => import("./pages/Blog"));

// Lazy load tools
const ThumbnailDownloader = lazy(() => import("./pages/tools/ThumbnailDownloader"));
const PFPDownloader = lazy(() => import("./pages/tools/PFPDownloader"));
const BannerDownloader = lazy(() => import("./pages/tools/BannerDownloader"));
const CommentsExtractor = lazy(() => import("./pages/tools/CommentsExtractor"));
const TitleExtractor = lazy(() => import("./pages/tools/TitleExtractor"));

const App = () => {
  return (
    <Layout>
      <ScrollToTop />
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }>
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
      </Suspense>
    </Layout>
  );
};

export default App;
