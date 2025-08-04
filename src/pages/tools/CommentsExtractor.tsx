import { useState } from "react";
import { useSEO } from "../../hooks/useSEO";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  Alert,
  Stack,
  CircularProgress,
} from "@mui/material";
import RelatedToolsSection from "../../components/RelatedToolsSection";
import DownloadIcon from "@mui/icons-material/Download";
import { API_BASE_URL } from "../../constants/api";

type Comment = {
  author: string;
  text: string;
  likes?: number;
  replies?: number;
  publishedTime?: string;
};

const CommentsExtractor = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [comments, setComments] = useState<Array<Comment>>([]);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  // SEO Hook
  useSEO({
    title: "Free YouTube Comments Extractor - Download Video Comments",
    description: "Extract and download YouTube video comments. Get all comments from any YouTube video URL instantly. Supports comment text, authors, likes, and replies. 100% free, no registration.",
    keywords: "youtube comments extractor, download youtube comments, youtube comment downloader, free comments extractor, youtube video comments, extract youtube comments, youtube comments tool, video comments extractor",
    canonicalUrl: "https://yttoolbox.com/tools/comments-extractor"
  });

  const handleExtract = async () => {
    setLoading(true);
    setCopied(false);
    setError("");
    
    try {
      if (!videoUrl.trim()) {
        setError("Please enter a YouTube URL");
        setComments([]);
        setLoading(false);
        return;
      }

      const ytRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?.*v=|youtu\.be\/)[\w-]{11}/;
      if (!ytRegex.test(videoUrl.trim())) {
        setError("Please enter a valid YouTube video URL");
        setComments([]);
        setLoading(false);
        return;
      }
      
      // Call our server API to extract comments
      const response = await fetch(`${API_BASE_URL}/api/comments?url=${encodeURIComponent(videoUrl)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to extract comments");
      }
      
      const data = await response.json();
      setComments(data.comments || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "An error occurred while extracting comments");
      } else {
        setError("An error occurred while extracting comments");
      }
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  // Copy comments to clipboard
  const handleCopyToClipboard = () => {
    if (comments.length === 0) return;
    const text = comments.map((c) => `${c.author}: ${c.text}`).join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Download comments as CSV
  const handleDownloadCSV = () => {
    if (comments.length === 0) return;
    
    // Create CSV headers
    const headers = ['Author', 'Comment', 'Likes', 'Replies', 'Published Time'];
    const csvContent = [
      headers.join(','),
      ...comments.map(comment => [
        `"${comment.author?.replace(/"/g, '""') || 'Unknown'}"`,
        `"${comment.text?.replace(/"/g, '""') || ''}"`,
        comment.likes || 0,
        comment.replies || 0,
        `"${comment.publishedTime || ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `youtube-comments-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Download comments as TXT (original format)
  const handleDownloadTXT = () => {
    if (comments.length === 0) return;
    const text = comments.map((c) => `${c.author}: ${c.text}`).join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `youtube-comments-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // --- UI rendering ---
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fafbfc", py: 4 }}>
      <Box sx={{ maxWidth: { xs: '100%', sm: 700 }, mx: 'auto', px: { xs: 1, sm: 0 } }}>
        <Typography 
          variant="h1" 
          align="center" 
          fontWeight={700} 
          gutterBottom
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            color: 'black',
          }}
        >
          YouTube Comments Extractor
        </Typography>
        <Typography 
          variant="h2"
          align="center" 
          color="text.secondary" 
          sx={{ 
            mb: 2, 
            fontSize: { xs: '1.1rem', md: '1.3rem' },
            lineHeight: 1.6,
            maxWidth: 800,
            mx: "auto",
          }}
        >
          Extract and download YouTube video comments instantly
        </Typography>
        <Typography 
          variant="body1"
          align="center" 
          color="text.secondary" 
          sx={{ 
            mb: 4, 
            maxWidth: 700,
            mx: "auto",
            fontSize: '1rem',
            lineHeight: 1.7,
          }}
        >
          Get all comments from any YouTube video URL including comment text, authors, likes, and replies. 
          Completely free with no registration required.
        </Typography>
        <Card
          elevation={0}
          sx={{ mb: 3, borderRadius: 2, bgcolor: "#fff", p: 2 }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              fontWeight={600}
              sx={{ mb: 2, textAlign: "center", fontSize: 18 }}
            >
              Enter YouTube Video URL
            </Typography>
            <Box
              sx={{
                width: '100%',
                maxWidth: 600,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 1, sm: 0 },
                  width: '100%',
                  alignItems: { xs: 'stretch', sm: 'flex-start' },
                  mt: 2,
                }}
              >
                <TextField
                  fullWidth
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  error={!!error}
                  size="small"
                  sx={{
                    flex: 1,
                    '& .MuiOutlinedInput-root': {
                      height: '40px',
                      borderTopLeftRadius: '8px',
                      borderBottomLeftRadius: '8px',
                      borderTopRightRadius: { xs: '8px', sm: 0 },
                      borderBottomRightRadius: { xs: '8px', sm: 0 },
                      '& input': {
                        padding: '8px 16px',
                        fontSize: '14px',
                      },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleExtract}
                  disabled={loading || !videoUrl.trim()}
                  sx={{
                    bgcolor: '#0c63e7',
                    '&:hover': { bgcolor: '#0a58c3' },
                    height: '40px',
                    minWidth: '100px',
                    textTransform: 'none',
                    fontSize: '14px',
                    borderRadius: { xs: '8px', sm: '0 8px 8px 0' },
                    boxShadow: 'none',
                    width: { xs: '100%', sm: 'auto' },
                    alignSelf: 'flex-start',
                  }}
                >
                  {loading ? <CircularProgress size={20} color="inherit" /> : "Extract"}
                </Button>
              </Box>
              {error && (
                <Typography
                  color="error"
                  variant="caption"
                  sx={{
                    display: 'block',
                    mt: 1,
                    textAlign: 'left',
                    fontSize: '12px',
                  }}
                >
                  {error}
                </Typography>
              )}
            </Box>
          </Box>
        </Card>
        <Card
          elevation={0}
          sx={{
            borderRadius: 2,
            bgcolor: "#fff",
            minHeight: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 3,
          }}
        >
          {loading ? (
            <Typography align="center" color="text.secondary">
              Extracting comments...
            </Typography>
          ) : comments.length === 0 ? (
            <Box
              sx={{
                width: "100%",
                textAlign: "center",
                color: "text.secondary",
                py: 6,
              }}
            >
              <Typography>
                Enter a YouTube video URL and click Extract
              </Typography>
            </Box>
          ) : (
            <Box sx={{ width: "100%" }}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2 }}
                sx={{ mb: 2 }}
                justifyContent="center"
              >
                <Button
                  variant="outlined"
                  onClick={handleCopyToClipboard}
                  fullWidth={true}
                  sx={{ width: { xs: '100%', sm: 'auto' }, fontSize: { xs: 14, sm: 15 }, py: { xs: 1, sm: 1 }, px: { xs: 1.5, sm: 2 } }}
                >
                  Copy All
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={handleDownloadCSV}
                  fullWidth={true}
                  sx={{ width: { xs: '100%', sm: 'auto' }, fontSize: { xs: 14, sm: 15 }, py: { xs: 1, sm: 1 }, px: { xs: 1.5, sm: 2 } }}
                >
                  Download CSV
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={handleDownloadTXT}
                  fullWidth={true}
                  sx={{ width: { xs: '100%', sm: 'auto' }, fontSize: { xs: 14, sm: 15 }, py: { xs: 1, sm: 1 }, px: { xs: 1.5, sm: 2 } }}
                >
                  Download TXT
                </Button>
              </Stack>
              {copied && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  Copied to clipboard!
                </Alert>
              )}
              <Box sx={{ maxHeight: 320, overflowY: "auto", px: 1 }}>
                <Stack spacing={2}>
                  {comments.map((c, idx) => (
                    <Box
                      key={idx}
                      sx={{ bgcolor: "#f4f8fb", borderRadius: 1, p: { xs: 1.5, sm: 2 }, mb: { xs: 1, sm: 2 } }}
                    >
                      <Typography fontWeight={600}>{c.author}</Typography>
                      <Typography color="text.secondary">{c.text}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Box>
          )}
        </Card>
      </Box>
      <RelatedToolsSection />
      {/* FAQ Section */}
      <Box sx={{ maxWidth: { xs: '100%', sm: 700 }, mx: 'auto', mt: 6, mb: 4, px: { xs: 1, sm: 0 } }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, fontSize: { xs: 18, sm: 22 } }}>
          Frequently Asked Questions
        </Typography>
        <Box component="dl" sx={{ m: 0, display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 3 } }}>
          <Box sx={{ mb: { xs: 1.5, sm: 3 } }}>
            <Typography component="dt" fontWeight={600} sx={{ fontSize: { xs: 15, sm: 17 }, mb: 0.5 }}>
              How do I extract YouTube comments?
            </Typography>
            <Typography component="dd" color="text.secondary" sx={{ ml: 0, fontSize: { xs: 13, sm: 15 } }}>
              Paste the YouTube video URL above and click "Extract". The
              comments will appear below for copying or downloading.
            </Typography>
          </Box>
          <Box sx={{ mb: { xs: 1.5, sm: 3 } }}>
            <Typography component="dt" fontWeight={600} sx={{ fontSize: { xs: 15, sm: 17 }, mb: 0.5 }}>
              Is this tool free?
            </Typography>
            <Typography component="dd" color="text.secondary" sx={{ ml: 0, fontSize: { xs: 13, sm: 15 } }}>
              Yes, this tool is completely free to use for everyone.
            </Typography>
          </Box>
          <Box sx={{ mb: { xs: 1.5, sm: 3 } }}>
            <Typography component="dt" fontWeight={600} sx={{ fontSize: { xs: 15, sm: 17 }, mb: 0.5 }}>
              Why can't I extract comments from some videos?
            </Typography>
            <Typography component="dd" color="text.secondary" sx={{ ml: 0, fontSize: { xs: 13, sm: 15 } }}>
              Some videos may have comments disabled or restricted, or may not
              be available for extraction due to privacy or technical
              limitations.
            </Typography>
          </Box>
          <Box sx={{ mb: { xs: 1.5, sm: 3 } }}>
            <Typography component="dt" fontWeight={600} sx={{ fontSize: { xs: 15, sm: 17 }, mb: 0.5 }}>
              Can I use these comments for my own projects?
            </Typography>
            <Typography component="dd" color="text.secondary" sx={{ ml: 0, fontSize: { xs: 13, sm: 15 } }}>
              YouTube comments are subject to copyright and privacy rules.
              Always check before using them elsewhere.
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* FAQ Schema for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How do I extract YouTube comments?",
              acceptedAnswer: {
                "@type": "Answer",
                text: 'Paste the YouTube video URL above and click "Extract". The comments will appear below for copying or downloading.',
              },
            },
            {
              "@type": "Question",
              name: "Is this tool free?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, this tool is completely free to use for everyone.",
              },
            },
            {
              "@type": "Question",
              name: "Why can't I extract comments from some videos?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Some videos may have comments disabled or restricted, or may not be available for extraction due to privacy or technical limitations.",
              },
            },
            {
              "@type": "Question",
              name: "Can I use these comments for my own projects?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "YouTube comments are subject to copyright and privacy rules. Always check before using them elsewhere.",
              },
            },
          ],
        })}
      </script>
    </Box>
  );
};

export default CommentsExtractor;
