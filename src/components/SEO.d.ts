import React from 'react';
interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    canonicalUrl?: string;
    ogImage?: string;
    noIndex?: boolean;
}
declare const SEO: React.FC<SEOProps>;
export default SEO;
