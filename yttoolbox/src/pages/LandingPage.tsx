import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import {
  ImageSearch,
  Wallpaper,
  Title,
  Comment,
  AccountCircle,

  FlashOn,
  PhoneIphone,
  Lock as LockIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";

const tools = [
  {
    title: "YouTube Thumbnail Downloader",
    description:
      "Download HD YouTube thumbnails in 4K, 1080p, 720p, and SD quality. Extract thumbnails from any YouTube video instantly with our free thumbnail downloader tool.",
    icon: <ImageSearch sx={{ fontSize: 48 }} />,
    color: "#6366F1",
    button: "Download Thumbnails Now",
    path: "/tools/thumbnail-downloader"
  },
  {
    title: "YouTube Banner Downloader",
    description:
      "Download YouTube channel banner images and cover photos in the highest available quality. Get HD channel art and banner images from any YouTube channel.",
    icon: <Wallpaper sx={{ fontSize: 48 }} />,
    color: "#EC4899",
    button: "Download Channel Banners",
    path: "/tools/banner-downloader"
  },
  {
    title: "YouTube Title Extractor",
    description: "Extract video titles from any YouTube video instantly. Get exact video titles, descriptions, and metadata from YouTube videos for your content creation needs.",
    icon: <Title sx={{ fontSize: 48 }} />,
    color: "#10B981",
    button: "Extract Video Titles",
    path: "/tools/title-extractor"
  },
  {
    title: "YouTube Comments Extractor",
    description: "Extract all comments from any YouTube video. Download YouTube video comments including replies, likes, and timestamps with our free comments extractor tool.",
    icon: <Comment sx={{ fontSize: 48 }} />,
    color: "#F59E0B",
    button: "Extract Comments",
    path: "/tools/comments-extractor"
  },
  {
    title: "YouTube Profile Picture Downloader",
    description:
      "Download YouTube channel profile pictures and avatars in HD quality. Get high-resolution PFP images from any YouTube channel instantly.",
    icon: <AccountCircle sx={{ fontSize: 48 }} />,
    color: "#8B5CF6",
    button: "Download Profile Pictures",
    path: "/tools/pfp-downloader"
  },

];

const faqs = [
  {
    q: "What is YtToolBox and how does it work?",
    a: `YtToolBox is a comprehensive suite of free YouTube tools that helps content creators, marketers, and researchers download YouTube thumbnails, banners, profile pictures, extract video titles, and analyze comments. Our tools use advanced APIs to extract data from YouTube videos and channels instantly. Simply paste any YouTube URL and get high-quality downloads within seconds.`,
  },
  {
    q: "How do I download YouTube thumbnails in 4K quality?",
    a: `To download YouTube thumbnails in 4K quality using our thumbnail downloader: 1) Copy the YouTube video URL from your browser, 2) Paste it into our thumbnail downloader tool, 3) Select your preferred resolution (4K, HD, SD), 4) Click the download button to save the thumbnail to your device. Our tool supports all YouTube video formats and provides thumbnails in multiple resolutions including 1280x720 (HD), 1920x1080 (Full HD), and 4K when available.`,
  },
  {
    q: "Is it legal to download YouTube thumbnails and banners?",
    a: `Yes, using YtToolBox to download YouTube thumbnails, banners, and profile pictures is completely legal. However, the downloaded content may be subject to copyright by the original creators. We recommend using downloaded content for personal use, research, or educational purposes. Always respect copyright laws and obtain permission from content creators if you plan to use their thumbnails or banners commercially.`,
  },
  {
    q: "Which devices and browsers support YtToolBox tools?",
    a: `YtToolBox works seamlessly on all modern devices and browsers. Our tools are optimized for Chrome, Firefox, Safari, and Edge browsers. You can use our YouTube downloader tools on Windows, Mac, Linux, Android phones, iPhones, and tablets. The responsive design ensures perfect functionality whether you're on desktop, mobile, or tablet devices.`,
  },
  {
    q: "How can I use downloaded YouTube thumbnails for SEO and content creation?",
    a: `Downloaded YouTube thumbnails can be valuable for SEO research and content planning. Use them to analyze competitor thumbnails, understand trending visual styles, and create better thumbnails for your own videos. For SEO purposes, we recommend creating unique thumbnails inspired by successful ones rather than using exact copies. Our tools help you understand what makes thumbnails successful without duplicating content.`,
  },
  {
    q: "What's the difference between HD, SD, and 4K YouTube thumbnails?",
    a: `YouTube thumbnails come in different resolutions: SD (Standard Definition) thumbnails are 640x480 pixels, HD (High Definition) thumbnails are 1280x720 pixels, Full HD thumbnails are 1920x1080 pixels, and 4K thumbnails are 3840x2160 pixels when available. Our thumbnail downloader automatically detects and provides all available resolutions for each video, allowing you to choose the best quality for your needs.`,
  },
];

const whyChoose = [
  {
    icon: <FlashOn color="primary" />,
    title: "Lightning Fast",
    desc: "Our tools are optimized for speed, with minimal loading times and instant results.",
  },
  {
    icon: <PhoneIphone color="primary" />,
    title: "Mobile Friendly",
    desc: "Use our tools on any device - desktop, tablet, or mobile phone with a responsive design.",
  },
  {
    icon: <LockIcon color="primary" />,
    title: "Privacy Focused",
    desc: `All processing happens in your browser. We don't store your URLs or any other data.`,
  },
  {
    icon: <CheckCircleIcon color="primary" />,
    title: "Completely Free",
    desc: "All tools are 100% free to use with no hidden fees, subscriptions, or limitations.",
  },
];

import { Helmet } from "react-helmet";

const LandingPage = () => {
  return (
    <>
      <Helmet>
        <script type="application/ld+json">{`
          {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Thumbnail Downloader", "operatingSystem": "Web", "applicationCategory": "MultimediaApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "1245" }, "description": "Download high-quality thumbnails from any YouTube video in multiple resolutions.", "url": "https://yttoolbox.com/tools/thumbnail-downloader" }
        `}</script>
        <script type="application/ld+json">{`
          {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Banner Downloader", "operatingSystem": "Web", "applicationCategory": "MultimediaApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "900" }, "description": "Get YouTube channel banner images in the highest available quality.", "url": "https://yttoolbox.com/tools/banner-downloader" }
        `}</script>
        <script type="application/ld+json">{`
          {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Title Extractor", "operatingSystem": "Web", "applicationCategory": "UtilityApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.6", "reviewCount": "700" }, "description": "Extract video titles from YouTube videos quickly and easily.", "url": "https://yttoolbox.com/tools/title-extractor" }
        `}</script>
        <script type="application/ld+json">{`
          {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Comments Extractor", "operatingSystem": "Web", "applicationCategory": "UtilityApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.5", "reviewCount": "600" }, "description": "Get full video comments from any YouTube video.", "url": "https://yttoolbox.com/tools/comments-extractor" }
        `}</script>
        <script type="application/ld+json">{`
          {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "PFP Downloader", "operatingSystem": "Web", "applicationCategory": "MultimediaApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "800" }, "description": "Download profile pictures from any YouTube channel in high quality.", "url": "https://yttoolbox.com/tools/pfp-downloader" }
        `}</script>
      </Helmet>
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
        py: { xs: 4, sm: 6, md: 8 },
        px: { xs: 2, sm: 3, md: 4 },
        overflowX: "hidden",
        transition: "all 0.3s ease",
      }}
    >
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, mb: { xs: 6, md: 8 } }}>

        <Box mb={{ xs: 6, md: 8 }}>
          <Typography
            variant="h1"
            fontWeight={800}
            align="center"
            gutterBottom
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem", lg: "3.5rem" },
              lineHeight: 1.2,
              mb: 2,
            }}
          >
            Free YouTube Thumbnail Downloader & Tools
          </Typography>
          <Typography
            variant="h2"
            fontWeight={600}
            align="center"
            gutterBottom
            sx={{
              fontSize: { xs: "1.2rem", sm: "1.3rem", md: "1.5rem" },
              color: "text.secondary",
              maxWidth: 800,
              mx: "auto",
              mb: 3,
              px: { xs: 1, sm: 0 },
            }}
          >
            Download YouTube thumbnails, banners, profile pictures, and extract video titles & comments. 100% free YouTube tools with no registration required.
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{
              maxWidth: 700,
              mx: "auto",
              mb: 4,
              fontSize: { xs: "1rem", sm: "1.1rem" },
              px: { xs: 1, sm: 0 },
            }}
          >
            The ultimate suite of free YouTube tools for content creators, marketers, and researchers. Download HD thumbnails in 4K quality, extract channel banners, profile pictures, video titles, and comments from any YouTube URL instantly.
          </Typography>
        </Box>
      </Container>
      {/* Tools Section */}
      <Box
        id="tools-section"
        component="section"
        sx={{ scrollMarginTop: "80px" }}
      >
        <Container
          maxWidth="xl"
          sx={{ px: { xs: 2, sm: 3 }, mb: { xs: 6, md: 8 } }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(auto-fill, minmax(300px, 1fr))",
                lg: "repeat(auto-fill, minmax(340px, 1fr))",
              },
              gap: { xs: 3, sm: 4 },
              justifyItems: "center",
              "& > *": { width: "100%", maxWidth: "400px" },
            }}
          >
            {tools.map((tool) => (
              <Card
                key={tool.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  boxShadow: 1,
                  overflow: "hidden",
                  bgcolor: "background.paper",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": { boxShadow: 4, transform: "translateY(-4px)" },
                  "@media (hover: none)": { "&:hover": { transform: "none" } },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: { xs: 140, sm: 160, md: 180 },
                    background: tool.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    transition: "all 0.3s ease",
                    "& svg": {
                      fontSize: { xs: 42, sm: 48, md: 56 },
                      transition: "transform 0.3s ease",
                    },
                    "&:hover svg": { transform: "scale(1.1)" },
                  }}
                >
                  {tool.icon}
                </Box>
                <Box
                  sx={{
                    p: { xs: 2, sm: 3 },
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{
                      mb: 1,
                      color: "text.primary",
                      fontSize: { xs: "1.1rem", sm: "1.125rem" },
                      lineHeight: 1.3,
                    }}
                  >
                    {tool.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 3,
                      fontSize: { xs: "0.9rem", sm: "0.95rem" },
                      lineHeight: 1.5,
                      flexGrow: 1,
                    }}
                  >
                    {tool.description}
                  </Typography>
                  <Box
                    component={Link}
                    to={tool.path}
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      color: "primary.main",
                      fontWeight: 500,
                      textDecoration: "none",
                      fontSize: { xs: "0.9rem", sm: "0.95rem" },
                      mt: "auto",
                      width: "fit-content",
                      "&:hover": {
                        color: "primary.dark",
                        textDecoration: "underline",
                        "& svg": { transform: "translateX(4px)" },
                      },
                      "& svg": {
                        transition: "transform 0.2s ease",
                        marginLeft: "6px",
                        width: "16px",
                        height: "16px",
                      },
                    }}
                  >
                    {tool.button}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>
      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          borderRadius: 3,
          p: { xs: 4, md: 8 },
          textAlign: "center",
          mb: 10,
          maxWidth: 1000,
          mx: "auto",
          px: { xs: 2, md: 4 },
        }}
      >
        <Typography variant="h4" fontWeight={700} mb={2}>
          Ready to enhance your YouTube experience?
        </Typography>
        <Typography
          variant="h6"
          color="primary.contrastText"
          mb={4}
          sx={{ opacity: 0.9 }}
        >
          All tools are free, run in your browser, and don't require any account
          or signup.
        </Typography>
      </Box>
      {/* FAQ Section */}
      <Box
        sx={{
          maxWidth: { xs: "100%", md: 900 },
          mx: "auto",
          mb: 10,
          px: { xs: 2, md: 4 },
        }}
      >
        <Typography variant="h4" fontWeight={700} align="center" mb={4}>
          Frequently Asked Questions
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {faqs.map((faq) => (
            <Box key={faq.q}>
              <Typography variant="subtitle1" fontWeight={600} mb={1}>
                {faq.q}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {faq.a}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      {/* Why Choose Section */}
      <Box
        sx={{
          maxWidth: { xs: "100%", md: 1200 },
          mx: "auto",
          mb: 6,
          px: { xs: 2, md: 4 },
        }}
      >
        <Typography variant="h4" fontWeight={700} align="center" mb={4}>
          Why Choose YtToolBox?
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 4,
          }}
        >
          {whyChoose.map((item) => (
            <Box
              key={item.title}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                bgcolor: "background.paper",
                p: 3,
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <Box sx={{ mr: 2, mt: 0.5 }}>{item.icon}</Box>
              <Box>
                <Typography variant="subtitle1" fontWeight={700} mb={0.5}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
    </>
  );
};

export default LandingPage;
