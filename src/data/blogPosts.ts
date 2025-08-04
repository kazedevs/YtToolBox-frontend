export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content?: string;
  date: string;
  readTime: string;
  readTimeMinutes: number;
  thumbnail: string;
  altText: string;
  tags: string[];
  author: string;
  mdxPath: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "youtube-thumbnail-downloader-4k-guide",
    title:
      "How to Download YouTube Thumbnails in 4K Quality - Complete Guide 2024",
    description:
      "Learn the easiest way to download high-quality YouTube thumbnails in 4K, HD, and SD resolutions using free online tools.",
    content: "",
    date: "2024-08-02",
    readTime: "8 min read",
    readTimeMinutes: 8,
    thumbnail: "/src/data/thumbnails/image.png",
    altText: "4K YouTube thumbnail download tutorial guide showing high quality video preview",
    tags: ["youtube", "thumbnail", "4k", "download", "tutorial"],
    author: "YtToolBox Team",
    mdxPath: "/src/content/youtube-thumbnail-downloader-4k-guide.mdx",
  },
  {
    slug: "youtube-channel-banner-downloader-guide",
    title: "YouTube Channel Banner Downloader: Extract HD Channel Art",
    description:
      "Complete tutorial on downloading YouTube channel banners and cover photos in the highest available quality.",
    content: "",
    date: "2024-08-01",
    readTime: "10 min read",
    readTimeMinutes: 10,
    thumbnail:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80",
    altText: "YouTube channel banner art download tutorial showing HD channel cover examples",
    tags: ["youtube", "banner", "channel art", "download", "tutorial"],
    author: "YtToolBox Team",
    mdxPath: "/src/content/youtube-banner-downloader-complete-guide.mdx",
  },
  {
    slug: "youtube-profile-picture-downloader-guide",
    title: "YouTube Profile Picture Downloader: Extract HD Channel PFPs",
    description:
      "Learn how to download high-quality YouTube profile pictures and channel avatars in HD resolution using free online tools.",
    content: "",
    date: "2024-07-31",
    readTime: "9 min read",
    readTimeMinutes: 9,
    thumbnail:
      "https://images.unsplash.com/photo-1494790108755-2616b332-3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80",
    altText: "YouTube profile picture download tutorial showing HD channel avatar extraction",
    tags: ["youtube", "profile picture", "pfp", "download", "tutorial"],
    author: "YtToolBox Team",
    mdxPath: "/src/content/youtube-profile-picture-downloader-guide.mdx",
  },
  {
    slug: "youtube-seo-optimization-complete-guide",
    title: "YouTube SEO Optimization: Complete Guide for 2024",
    description:
      "Master YouTube SEO with proven strategies to rank higher, get more views, and grow your channel organically.",
    content: '',
    date: '2024-07-30',
    readTime: '15 min',
    readTimeMinutes: 15,
    thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80',
    altText: "YouTube SEO optimization guide showing search ranking strategies and growth techniques",
    tags: ["youtube", "seo", "optimization", "strategy", "growth"],
    author: "YtToolBox Team",
    mdxPath: "/src/content/youtube-seo-optimization-complete-guide.mdx",
  },
  {
    slug: "youtube-content-creation-workflow-2024",
    title: "YouTube Content Creation Workflow: From Idea to Published Video",
    description:
      "Streamline your YouTube content creation process with this comprehensive workflow guide for 2024.",
    content: '',
    date: '2024-07-28',
    readTime: '12 min',
    readTimeMinutes: 12,
    thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80',
    altText: "YouTube content creation workflow showing video production process from idea to published content",
    tags: ["youtube", "workflow", "content creation", "productivity", "strategy"],
    author: "YtToolBox Team",
    mdxPath: "/src/content/youtube-content-creation-workflow-2024.mdx",
  },
];
