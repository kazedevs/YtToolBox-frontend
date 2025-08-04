interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    canonicalUrl?: string;
}
export declare const useSEO: ({ title, description, keywords, canonicalUrl }: SEOProps) => void;
export {};
