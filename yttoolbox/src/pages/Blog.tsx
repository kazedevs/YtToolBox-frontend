import { Box, Container, Typography, Paper, Chip } from '@mui/material';

const Blog = () => {
  const blogPosts = [
    {
      title: "How to Download YouTube Thumbnails in 4K Quality - Complete Guide 2024",
      description: "Learn the easiest way to download high-quality YouTube thumbnails in 4K, HD, and SD resolutions using free online tools.",
      keywords: ["youtube thumbnail downloader", "4k thumbnail download", "hd thumbnail", "youtube tools"],
      date: "2024-08-02"
    },
    {
      title: "YouTube Channel Banner Downloader: Extract HD Channel Art",
      description: "Complete tutorial on downloading YouTube channel banners and cover photos in the highest available quality.",
      keywords: ["youtube banner downloader", "channel art download", "youtube cover photo", "banner extractor"],
      date: "2024-08-01"
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafbfc', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h1" align="center" fontWeight={800} gutterBottom sx={{ mb: 2 }}>
          YtToolBox Blog: YouTube Tools & Guides
        </Typography>
        <Typography variant="h2" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
          Expert guides, tutorials, and tips for using free YouTube tools effectively
        </Typography>

        {blogPosts.map((post, index) => (
          <Paper key={index} sx={{ p: 4, mb: 3 }}>
            <Typography variant="h4" gutterBottom fontWeight={600}>
              {post.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {post.description}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {post.keywords.map((keyword, keywordIndex) => (
                <Chip key={keywordIndex} label={keyword} size="small" variant="outlined" />
              ))}
            </Box>
          </Paper>
        ))}
      </Container>
    </Box>
  );
};

export default Blog;
