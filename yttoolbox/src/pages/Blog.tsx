import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { blogPosts } from "../data/blogPosts";

const Blog = () => {
  const navigate = useNavigate();

  // SEO structured data for blog
  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "YtToolBox Blog",
    description:
      "Expert guides, tutorials, and tips for using free YouTube tools effectively",
    url: "https://yttoolbox.com/blog",
    publisher: {
      "@type": "Organization",
      name: "YtToolBox",
      logo: {
        "@type": "ImageObject",
        url: "https://yttoolbox.com/logo.png",
      },
    },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: `https://yttoolbox.com/blog/${post.slug}`,
      datePublished: post.date,
      dateModified: post.date,
      author: {
        "@type": "Person",
        name: post.author,
      },
      image: post.thumbnail,
      keywords: post.tags,
      wordCount: post.readTimeMinutes * 200,
      timeRequired: `PT${post.readTimeMinutes}M`,
    })),
  };

  return (
    <>
      <Helmet>
        <title>YtToolBox Blog - Expert YouTube Tools & Tutorials</title>
        <meta
          name="description"
          content="Expert guides, tutorials, and tips for using free YouTube tools effectively. Learn how to download thumbnails, optimize SEO, and grow your channel."
        />
        <meta
          name="keywords"
          content="youtube tools, youtube tutorials, thumbnail downloader, youtube seo, channel optimization, youtube growth"
        />
        <meta
          property="og:title"
          content="YtToolBox Blog - Expert YouTube Tools & Tutorials"
        />
        <meta
          property="og:description"
          content="Expert guides, tutorials, and tips for using free YouTube tools effectively"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yttoolbox.com/blog" />
        <meta property="og:image" content="https://yttoolbox.com/og-blog.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="YtToolBox Blog - Expert YouTube Tools & Tutorials"
        />
        <meta
          name="twitter:description"
          content="Expert guides, tutorials, and tips for using free YouTube tools effectively"
        />
        <meta
          name="twitter:image"
          content="https://yttoolbox.com/og-blog.jpg"
        />
        <link rel="canonical" href="https://yttoolbox.com/blog" />
        <script type="application/ld+json">
          {JSON.stringify(blogStructuredData)}
        </script>
      </Helmet>
      <Box sx={{ minHeight: "100vh", bgcolor: "#fafbfc", py: 6 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            align="center"
            fontWeight={800}
            gutterBottom
            sx={{
              mb: 2,
              fontSize: "2.5rem",
              fontFamily:
                '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            YtToolBox Blog
          </Typography>
          <Typography
            variant="h2"
            align="center"
            color="text.secondary"
            sx={{
              mb: 6,
              maxWidth: 800,
              mx: "auto",
              fontSize: "1.5rem",
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Expert guides, tutorials, and tips for using free YouTube tools
            effectively
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 3,
            }}
          >
            {blogPosts.map((post) => (
              <Card
                key={post.slug}
                sx={{
                  cursor: "pointer",
                  border: "none",
                  boxShadow: "none",
                  backgroundColor: "transparent",
                  "&:hover": {
                    boxShadow: "none",
                  },
                }}
                onClick={() => navigate(`/blog/${post.slug}`)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={post.thumbnail}
                  alt={post.altText}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ p: 1, pl: 0 }}>
                  <Typography
                    variant="body1"
                    component="h2"
                    sx={{
                      fontWeight: 400,
                      color: "#1a1a1a",
                      lineHeight: 1.4,
                    }}
                  >
                    {post.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {post.readTime}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Blog;
