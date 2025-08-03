import { useState } from "react";
import { useSEO } from "../../hooks/useSEO";
import RelatedToolsSection from "../../components/RelatedToolsSection";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  Divider,
  Stack,
  CircularProgress,
} from "@mui/material";

import ImageIcon from "@mui/icons-material/Image";
import { API_BASE_URL } from "../../constants/api";

const ThumbnailDownloader = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnails, setThumbnails] = useState<
    Array<{ url: string; width: number; height: number }>
  >([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");

  const getVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleDownload = async () => {
    if (!videoUrl) {
      setError("Please enter a YouTube URL");
      return;
    }

    const id = getVideoId(videoUrl);
    if (!id) {
      setError("Invalid YouTube URL");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Call our server API to download thumbnails
      const apiUrl = new URL('/api/thumbnail', API_BASE_URL);
      apiUrl.searchParams.set('url', videoUrl);
      const response = await fetch(apiUrl.toString());

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned invalid response format');
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to download thumbnails");
      }

      const data = await response.json();
      
      // Validate response structure
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid response format from server');
      }
      
      setThumbnails(data.thumbnails || []);
      setVideoTitle(data.title || "");
    } catch (err: unknown) {
      console.error('Thumbnail download error:', err);
      
      if (err instanceof Error) {
        // Handle network errors
        if (err.message.includes('Failed to fetch')) {
          setError('Network error: Please check your internet connection');
        } else if (err.message.includes('JSON')) {
          setError('Server error: Invalid response format received');
        } else {
          setError(err.message || "An error occurred while extracting thumbnails");
        }
      } else {
        setError("An unexpected error occurred while extracting thumbnails");
      }
      
      setThumbnails([]);
      setVideoTitle("");
    } finally {
      setLoading(false);
    }
  };

  useSEO({
    title: "Free YouTube Thumbnail Downloader - HD Thumbnail Extr actor",
    description:
      "Download YouTube video thumbnails in HD quality. Download thumbnails from any YouTube video URL instantly. Supports 4K, 1080p, 720p, and all resolutions. 100% free, no registration.",
    keywords:
      "youtube thumbnail downloader, download youtube thumbnails, youtube thumbnail extractor, free thumbnail downloader, youtube thumbnail grabber, HD thumbnail download, 4K thumbnail downloader, youtube thumbnail tool, youtube thumbnail download",
    canonicalUrl: "https://yttoolbox.com/tools/thumbnail-downloader",
  });

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fafbfc", py: 4 }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            textAlign: "center",
            color: "black",
            mb: 4,
            maxWidth: 800,
            mx: "auto",
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
            lineHeight: 1.2,
            fontWeight: 700,
          }}
        >
          YouTube Thumbnail Downloader
        </Typography>

        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            color: "text.secondary",
            mb: 4,
            maxWidth: 800,
            mx: "auto",
            fontSize: "1.1rem",
            lineHeight: 1.7,
          }}
        >
          Download high-quality YouTube video thumbnails in multiple resolutions
          including 4K, 1080p, and 720p. Download thumbnails from any YouTube
          video URL instantly - 100% free, no registration required.
        </Typography>

        {/* Input Card */}
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
                width: "100%",
                maxWidth: "700px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: { xs: 1, sm: 0 },
                  width: "100%",
                  alignItems: { xs: "stretch", sm: "flex-start" },
                }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Paste YouTube video URL here"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  error={!!error}
                  helperText={error}
                  sx={{
                    flex: 1,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: { xs: "8px", sm: "8px 0 0 8px" },
                      height: "48px",
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "20px",
                      padding: "14px 16px",
                    },
                  }}
                  onKeyPress={(e) => e.key === "Enter" && handleDownload()}
                />
                <Button
                  variant="contained"
                  onClick={handleDownload}
                  disabled={loading}
                  sx={{
                    bgcolor: "#0c63e7",
                    "&:hover": {
                      bgcolor: "#0a58c3",
                      boxShadow: "none",
                    },
                    height: "48px",
                    minWidth: "120px",
                    textTransform: "none",
                    fontSize: "16px",
                    fontWeight: 600,
                    borderRadius: { xs: "8px", sm: "0 8px 8px 0" },
                    boxShadow: "none",
                    width: { xs: "100%", sm: "auto" },
                    px: 3,
                    whiteSpace: "nowrap",
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Download Thumbnails"
                  )}
                </Button>
              </Box>
            </Box>
          </Box>
        </Card>

        {/* Divider */}
        <Divider sx={{ mb: 3 }} />

        {/* Preview Card */}
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
          {!thumbnails.length ? (
            <Box
              sx={{
                width: "100%",
                textAlign: "center",
                color: "text.secondary",
                py: 6,
              }}
            >
              <Box sx={{ fontSize: 40, mb: 1, color: "#e0e0e0" }}>
                <ImageIcon fontSize="inherit" />
              </Box>
              <Typography>Enter a YouTube URL to get started</Typography>
            </Box>
          ) : (
            <Stack
              direction="row"
              spacing={2}
              flexWrap="wrap"
              sx={{ mt: 2, justifyContent: "center" }}
            >
              {thumbnails.map((thumb, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      minWidth: 220,
                    }}
                  >
                    <img
                      src={thumb.url}
                      alt={`${videoTitle} thumbnail ${thumb.width}x${thumb.height}`}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: 8,
                        cursor: "pointer",
                      }}
                      loading="lazy"
                    />
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {thumb.width}x{thumb.height}
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      href={thumb.url}
                      download
                      sx={{ mt: 1 }}
                      aria-label={`Download ${thumb.width}x${thumb.height} thumbnail`}
                    >
                      Download {thumb.width}x{thumb.height} (
                      {Math.round((thumb.width * thumb.height) / 100000) / 10}
                      MP)
                    </Button>
                  </Box>
                );
              })}
            </Stack>
          )}
        </Card>
      </Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          mt: 4,
        }}
      >
        <RelatedToolsSection currentTool="Thumbnail Downloader" />
      </Box>

      {/* FAQ Section */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          mt: 6,
          mb: 4,
        }}
      >
        <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, boxShadow: 3 }}>
          <Typography
            variant="h2"
            sx={{
              mb: 4,
              fontWeight: 700,
              fontSize: { xs: "1.5rem", sm: "1.75rem" },
              color: "black",
            }}
          >
            Frequently Asked Questions
          </Typography>
          <Box
            component="dl"
            sx={{
              m: 0,
              display: "flex",
              flexDirection: "column",
              gap: { xs: 2, sm: 3 },
            }}
          >
            <Box sx={{ mb: { xs: 1.5, sm: 3 } }}>
              <Typography
                component="dt"
                fontWeight={600}
                sx={{ fontSize: { xs: 15, sm: 17 }, mb: 0.5 }}
              >
                How do I use the YouTube Thumbnail Downloader?
              </Typography>
              <Typography
                component="dd"
                color="text.secondary"
                sx={{ ml: 0, fontSize: { xs: 13, sm: 15 } }}
              >
                Paste the YouTube video URL in the input box above and click
                "Process". All available thumbnail resolutions will appear for
                download.
              </Typography>
            </Box>
            <Box sx={{ mb: { xs: 1.5, sm: 3 } }}>
              <Typography
                component="dt"
                fontWeight={600}
                sx={{ fontSize: { xs: 15, sm: 17 }, mb: 0.5 }}
              >
                Is this tool free?
              </Typography>
              <Typography
                component="dd"
                color="text.secondary"
                sx={{ ml: 0, fontSize: { xs: 13, sm: 15 } }}
              >
                Yes, this tool is completely free to use for everyone.
              </Typography>
            </Box>
            <Box sx={{ mb: { xs: 1.5, sm: 3 } }}>
              <Typography
                component="dt"
                fontWeight={600}
                sx={{ fontSize: { xs: 15, sm: 17 }, mb: 0.5 }}
              >
                Why do some thumbnails not appear in high resolution?
              </Typography>
              <Typography
                component="dd"
                color="text.secondary"
                sx={{ ml: 0, fontSize: { xs: 13, sm: 15 } }}
              >
                Not all YouTube videos have a high-resolution thumbnail. If
                unavailable, you will see the next best quality.
              </Typography>
            </Box>
            <Box sx={{ mb: { xs: 1.5, sm: 3 } }}>
              <Typography
                component="dt"
                fontWeight={600}
                sx={{ fontSize: { xs: 15, sm: 17 }, mb: 0.5 }}
              >
                Can I use these thumbnails for my own projects?
              </Typography>
              <Typography
                component="dd"
                color="text.secondary"
                sx={{ ml: 0, fontSize: { xs: 13, sm: 15 } }}
              >
                YouTube thumbnails are subject to copyright. Always check the
                video’s usage rights before using thumbnails elsewhere.
              </Typography>
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default ThumbnailDownloader;
