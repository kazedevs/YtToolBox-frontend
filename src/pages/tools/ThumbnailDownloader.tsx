import { useState } from "react";
import { useSEO } from "../../hooks/useSEO";
import RelatedToolsSection from "../../components/RelatedToolsSection";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  TextField,
  Typography,
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
  const [downloading, setDownloading] = useState(false);
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
      // Check network connectivity first
      if (!navigator.onLine) {
        throw new Error("No internet connection detected");
      }

      // Call our server API to download thumbnails
      const apiUrl = new URL("/api/thumbnail", API_BASE_URL);
      apiUrl.searchParams.set("url", videoUrl);

      // Add timeout for fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(apiUrl.toString(), {
        signal: controller.signal,
        headers: {
          Accept: "application/json",
        },
      });

      clearTimeout(timeoutId);

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned invalid response format");
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to download thumbnails");
      }

      const data = await response.json();

      // Validate response structure
      if (!data || typeof data !== "object") {
        throw new Error("Invalid response format from server");
      }

      setThumbnails(data.thumbnails || []);
      setVideoTitle(data.title || "");
    } catch (err: unknown) {
      console.error("Thumbnail download error:", err);

      if (err instanceof Error) {
        const errorMessage = err.message.toLowerCase();

        // Handle network errors with more specific messages
        if (
          errorMessage.includes("failed to fetch") ||
          errorMessage.includes("networkerror") ||
          errorMessage.includes("network error")
        ) {
          setError(
            "Network error: Please check your internet connection and try again"
          );
        } else if (
          errorMessage.includes("timeout") ||
          errorMessage.includes("timed out")
        ) {
          setError(
            "Request timeout: The server took too long to respond. Please try again"
          );
        } else if (
          errorMessage.includes("json") ||
          errorMessage.includes("parse")
        ) {
          setError(
            "Server error: Invalid response format received. Please try again later"
          );
        } else if (
          errorMessage.includes("cors") ||
          errorMessage.includes("blocked")
        ) {
          setError(
            "Connection blocked: Please disable any ad blockers or try a different browser"
          );
        } else if (
          errorMessage.includes("server") ||
          errorMessage.includes("service")
        ) {
          setError(
            "Server error: Our service is temporarily unavailable. Please try again later"
          );
        } else {
          setError(
            err.message || "An error occurred while extracting thumbnails"
          );
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

  const handleDownloadThumbnail = async (url: string, filename: string) => {
    try {
      setDownloading(true);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch image: ${response.status} ${response.statusText}`
        );
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error("Download error:", err);
      setError("Failed to download thumbnail. Please try again.");
    } finally {
      setDownloading(false);
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
          maxWidth: { xs: "100%", sm: 750 },
          mx: "auto",
          px: { xs: 2, sm: 3 },
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
          sx={{ mb: 3, borderRadius: 2, bgcolor: "#fff", p: 2, maxWidth: "650px", mx: "auto" }}
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
                    "Process"
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
            minHeight: 150,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            maxWidth: "650px",
            mx: "auto",
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
            <Box sx={{ textAlign: "center", py: 2 }}>
              {(() => {
                const highest = thumbnails.reduce((prev, current) => 
                  (prev.width * prev.height) > (current.width * current.height) ? prev : current
                );
                return (
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img
                      src={highest.url}
                      alt={`${videoTitle} thumbnail ${highest.width}x${highest.height}`}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: 8,
                        marginBottom: "16px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      }}
                      loading="lazy"
                    />
                    <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
                      {highest.width}x{highest.height} ({Math.round((highest.width * highest.height) / 1000000 * 10) / 10}MP)
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() =>
                        handleDownloadThumbnail(
                          highest.url,
                          `${videoTitle || "thumbnail"}-${highest.width}x${highest.height}.jpg`
                        )
                      }
                      aria-label={`Download ${highest.width}x${highest.height} thumbnail`}
                      disabled={loading || downloading}
                      sx={{
                        bgcolor: "#0c63e7",
                        "&:hover": { bgcolor: "#0a58c3" },
                        textTransform: "none",
                        fontSize: "14px",
                        borderRadius: 1,
                        boxShadow: "none",
                        px: 3,
                      }}
                    >
                      {downloading ? (
                        <CircularProgress size={20} />
                      ) : (
                        "Download Highest Quality"
                      )}
                    </Button>
                  </Box>
                );
              })()}
            </Box>
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
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            p: { xs: 1.5, sm: 2 },
            textAlign: "left",
            display: "inline-block",
            maxWidth: "800px",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              mb: 3,
              fontWeight: 700,
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
              color: "black",
              textAlign: "left",
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
              gap: { xs: 1.5, sm: 2 },
            }}
          >
            <Box sx={{ mb: { xs: 1, sm: 1.5 } }}>
              <Typography
                component="dt"
                fontWeight={600}
                sx={{ fontSize: { xs: 13, sm: 15 }, mb: 0.25 }}
              >
                How do I use the YouTube Thumbnail Downloader?
              </Typography>
              <Typography
                component="dd"
                color="text.secondary"
                sx={{ ml: 0, fontSize: { xs: 11, sm: 13 } }}
              >
                Paste the YouTube video URL in the input box above and click
                "Process". All available thumbnail resolutions will appear for
                download.
              </Typography>
            </Box>
            <Box sx={{ mb: { xs: 1, sm: 1.5 } }}>
              <Typography
                component="dt"
                fontWeight={600}
                sx={{ fontSize: { xs: 13, sm: 15 }, mb: 0.25 }}
              >
                Is this tool free?
              </Typography>
              <Typography
                component="dd"
                color="text.secondary"
                sx={{ ml: 0, fontSize: { xs: 11, sm: 13 } }}
              >
                Yes, this tool is completely free to use for everyone.
              </Typography>
            </Box>
            <Box sx={{ mb: { xs: 1, sm: 1.5 } }}>
              <Typography
                component="dt"
                fontWeight={600}
                sx={{ fontSize: { xs: 13, sm: 15 }, mb: 0.25 }}
              >
                Why do some thumbnails not appear in high resolution?
              </Typography>
              <Typography
                component="dd"
                color="text.secondary"
                sx={{ ml: 0, fontSize: { xs: 11, sm: 13 } }}
              >
                Not all YouTube videos have a high-resolution thumbnail. If
                unavailable, you will see the next best quality.
              </Typography>
            </Box>
            <Box sx={{ mb: { xs: 1, sm: 1.5 } }}>
              <Typography
                component="dt"
                fontWeight={600}
                sx={{ fontSize: { xs: 13, sm: 15 }, mb: 0.25 }}
              >
                Can I use these thumbnails for my own projects?
              </Typography>
              <Typography
                component="dd"
                color="text.secondary"
                sx={{ ml: 0, fontSize: { xs: 11, sm: 13 } }}
              >
                YouTube thumbnails are subject to copyright. Always check the
                creator’s usage rights before using thumbnails elsewhere.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ThumbnailDownloader;
