import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
}

export const useSEO = ({ title, description, keywords, canonicalUrl }: SEOProps) => {
  useEffect(() => {
    // Update document title
    const originalTitle = document.title;
    document.title = title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const newMetaDesc = document.createElement('meta');
      newMetaDesc.setAttribute('name', 'description');
      newMetaDesc.setAttribute('content', description);
      document.head.appendChild(newMetaDesc);
    }

    // Update keywords if provided
    if (keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords);
      } else {
        const newMetaKeywords = document.createElement('meta');
        newMetaKeywords.setAttribute('name', 'keywords');
        newMetaKeywords.setAttribute('content', keywords);
        document.head.appendChild(newMetaKeywords);
      }
    }

    // Update canonical URL if provided
    if (canonicalUrl) {
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', canonicalUrl);
      } else {
        const newCanonical = document.createElement('link');
        newCanonical.setAttribute('rel', 'canonical');
        newCanonical.setAttribute('href', canonicalUrl);
        document.head.appendChild(newCanonical);
      }
    }

    // Add structured data for SEO
    const existingStructuredData = document.querySelector('script[type="application/ld+json"]');
    if (existingStructuredData) {
      existingStructuredData.remove();
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": title,
      "description": description,
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.title = originalTitle;
    };
  }, [title, description, keywords, canonicalUrl]);
};
