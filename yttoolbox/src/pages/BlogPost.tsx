import { lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { blogPosts } from "../data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <>
        <Helmet>
          <title>Blog Post Not Found - YtToolBox</title>
          <meta
            name="description"
            content="The requested blog post could not be found."
          />
        </Helmet>
        <Box sx={{ minHeight: "100vh", bgcolor: "#fafbfc", py: 6 }}>
          <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>
              Blog Post Not Found
            </Typography>
            <Typography align="center" color="text.secondary">
              The blog post you're looking for doesn't exist.
            </Typography>
          </Container>
        </Box>
      </>
    );
  }

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://yttoolbox.com/blog/${post.slug}`,
    },
    headline: post.title,
    description: post.description,
    image: post.thumbnail,
    author: {
      "@type": "Person",
      name: post.author,
      url: "https://yttoolbox.com",
    },
    publisher: {
      "@type": "Organization",
      name: "YtToolBox",
      logo: {
        "@type": "ImageObject",
        url: "https://yttoolbox.com/logo.png",
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    keywords: [...post.tags, "youtube tools", "free youtube tools"],
    wordCount: post.readTimeMinutes * 200, // Estimated word count
    timeRequired: `PT${post.readTimeMinutes}M`,
    articleBody: post.description,
  };

  // Dynamically import the MDX component
  const MDXContent = post.mdxPath
    ? lazy(() => import(/* @vite-ignore */ post.mdxPath!))
    : null;

  return (
    <>
      <Helmet>
        <title>{`${post.title} - YtToolBox Blog`}</title>
        <meta name="description" content={post.description} />
        <meta
          name="keywords"
          content={`${post.tags.join(", ")}, youtube tools, ${post.title.toLowerCase()}`}
        />
        <meta name="author" content={post.author} />
        <meta name="article:author" content={post.author} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://yttoolbox.com/blog/${post.slug}`}
        />
        <meta property="og:image" content={post.thumbnail} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="YtToolBox" />
        <meta property="article:tag" content={post.tags.join(", ")} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={post.thumbnail} />
        <link
          rel="canonical"
          href={`https://yttoolbox.com/blog/${post.slug}`}
        />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <Box sx={{ minHeight: "100vh", bgcolor: "#fafbfc", py: 4 }}>
        <Container maxWidth="md">
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/blog")}
            sx={{ mb: 3, textTransform: "none" }}
          >
            Back to Blog
          </Button>

          <Box sx={{ mb: 4 }}>
            {post.thumbnail && (
              <img
                src={post.thumbnail}
                alt={post.altText}
                style={{
                  width: "100%",
                  height: 240,
                  objectFit: "cover",
                  borderRadius: 8,
                  marginBottom: 24,
                }}
              />
            )}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
                mb: 3,
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontFamily: '"Inter", sans-serif' }}
              >
                {post.date}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontFamily: '"Inter", sans-serif' }}
              >
                •
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontFamily: '"Inter", sans-serif' }}
              >
                {post.readTime} read
              </Typography>
            </Box>

            <Box
              sx={{
                fontSize: "1.125rem",
                lineHeight: 1.8,
                color: "text.primary",
                fontFamily:
                  '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                "& h2": {
                  fontSize: "2rem",
                  fontWeight: 600,
                  mt: 4,
                  mb: 2,
                  fontFamily: '"Inter", sans-serif',
                  color: "text.primary",
                },
                "& h3": {
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  mt: 3,
                  mb: 2,
                  fontFamily: '"Inter", sans-serif',
                  color: "text.primary",
                },
                "& p": {
                  mb: 2,
                  fontSize: "1.125rem",
                  lineHeight: 1.8,
                  fontFamily: '"Inter", sans-serif',
                  color: "text.primary",
                },
                "& ul, & ol": {
                  mb: 2,
                  pl: 4,
                },
                "& li": {
                  mb: 1,
                  fontSize: "1.125rem",
                  lineHeight: 1.8,
                  fontFamily: '"Inter", sans-serif',
                },
                "& code": {
                  backgroundColor: "grey.100",
                  padding: "0.125rem 0.25rem",
                  borderRadius: 1,
                  fontSize: "0.875em",
                  fontFamily: '"Inter", sans-serif',
                },
                "& pre": {
                  backgroundColor: "grey.100",
                  padding: 2,
                  borderRadius: 2,
                  overflow: "auto",
                  mb: 2,
                  fontSize: "0.875rem",
                  fontFamily: '"Inter", sans-serif',
                },
              }}
            >
              {MDXContent ? (
                <Suspense
                  fallback={
                    <Box
                      sx={{ display: "flex", justifyContent: "center", py: 4 }}
                    >
                      <CircularProgress />
                    </Box>
                  }
                >
                  <MDXContent />
                </Suspense>
              ) : (
                <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                  {post.content}
                </Typography>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default BlogPost;
