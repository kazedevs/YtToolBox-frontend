import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  noIndex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = '/og-image.jpg',
  noIndex = false,
}) => {
  const siteName = 'YtToolBox';
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  
  useEffect(() => {
    // Update document title
    document.title = fullTitle;
    
    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
    
    // Set keywords if provided
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }
    
    // Set canonical URL if provided
    if (canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonicalUrl;
    }
    
    // Set robots meta tag if noIndex is true
    if (noIndex) {
      let metaRobots = document.querySelector('meta[name="robots"]');
      if (!metaRobots) {
        metaRobots = document.createElement('meta');
        metaRobots.setAttribute('name', 'robots');
        document.head.appendChild(metaRobots);
      }
      metaRobots.setAttribute('content', 'noindex, nofollow');
    }
    
    // Set Open Graph meta tags
    let metaOgType = document.querySelector('meta[property="og:type"]');
    if (!metaOgType) {
      metaOgType = document.createElement('meta');
      metaOgType.setAttribute('property', 'og:type');
      document.head.appendChild(metaOgType);
    }
    metaOgType.setAttribute('content', 'website');
    
    let metaOgTitle = document.querySelector('meta[property="og:title"]');
    if (!metaOgTitle) {
      metaOgTitle = document.createElement('meta');
      metaOgTitle.setAttribute('property', 'og:title');
      document.head.appendChild(metaOgTitle);
    }
    metaOgTitle.setAttribute('content', fullTitle);
    
    let metaOgDescription = document.querySelector('meta[property="og:description"]');
    if (!metaOgDescription) {
      metaOgDescription = document.createElement('meta');
      metaOgDescription.setAttribute('property', 'og:description');
      document.head.appendChild(metaOgDescription);
    }
    metaOgDescription.setAttribute('content', description);
    
    let metaOgImage = document.querySelector('meta[property="og:image"]');
    if (!metaOgImage) {
      metaOgImage = document.createElement('meta');
      metaOgImage.setAttribute('property', 'og:image');
      document.head.appendChild(metaOgImage);
    }
    metaOgImage.setAttribute('content', ogImage);
    
    let metaOgSiteName = document.querySelector('meta[property="og:site_name"]');
    if (!metaOgSiteName) {
      metaOgSiteName = document.createElement('meta');
      metaOgSiteName.setAttribute('property', 'og:site_name');
      document.head.appendChild(metaOgSiteName);
    }
    metaOgSiteName.setAttribute('content', siteName);
    
    // Set Twitter meta tags
    let metaTwitterCard = document.querySelector('meta[name="twitter:card"]');
    if (!metaTwitterCard) {
      metaTwitterCard = document.createElement('meta');
      metaTwitterCard.setAttribute('name', 'twitter:card');
      document.head.appendChild(metaTwitterCard);
    }
    metaTwitterCard.setAttribute('content', 'summary_large_image');
    
    let metaTwitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (!metaTwitterTitle) {
      metaTwitterTitle = document.createElement('meta');
      metaTwitterTitle.setAttribute('name', 'twitter:title');
      document.head.appendChild(metaTwitterTitle);
    }
    metaTwitterTitle.setAttribute('content', fullTitle);
    
    let metaTwitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (!metaTwitterDescription) {
      metaTwitterDescription = document.createElement('meta');
      metaTwitterDescription.setAttribute('name', 'twitter:description');
      document.head.appendChild(metaTwitterDescription);
    }
    metaTwitterDescription.setAttribute('content', description);
    
    let metaTwitterImage = document.querySelector('meta[name="twitter:image"]');
    if (!metaTwitterImage) {
      metaTwitterImage = document.createElement('meta');
      metaTwitterImage.setAttribute('name', 'twitter:image');
      document.head.appendChild(metaTwitterImage);
    }
    metaTwitterImage.setAttribute('content', ogImage);
    
    // Set viewport and charset meta tags
    let metaViewport = document.querySelector('meta[name="viewport"]');
    if (!metaViewport) {
      metaViewport = document.createElement('meta');
      metaViewport.setAttribute('name', 'viewport');
      document.head.appendChild(metaViewport);
    }
    metaViewport.setAttribute('content', 'width=device-width, initial-scale=1');
    
    let metaCharset = document.querySelector('meta[charSet]');
    if (!metaCharset) {
      metaCharset = document.createElement('meta');
      metaCharset.setAttribute('charSet', 'utf-8');
      document.head.appendChild(metaCharset);
    }
    
    // Cleanup function to remove added elements when component unmounts
    return () => {
      // We don't remove the title and description as they might be needed by other components
      // The app will handle updating them as needed
    };
  }, [title, description, keywords, canonicalUrl, noIndex, ogImage]);
  
  return null; // This component doesn't render anything
};

export default SEO;
