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
  CircularProgress,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import DownloadIcon from "@mui/icons-material/Download";
import { API_BASE_URL } from "../../constants/api";


export default function BannerDownloader() {
  const [channelUrl, setChannelUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // SEO Hook
  useSEO({
    title: "Free YouTube Banner Downloader - Channel Banner Extractor",
    description: "Download YouTube channel banners in HD quality. Extract banner images from any YouTube channel URL instantly. Supports all banner sizes. 100% free, no registration.",
    keywords: "youtube banner downloader, download youtube banners, youtube banner extractor, free banner downloader, youtube channel banner, HD banner download, youtube banner tool, youtube banner download",
    canonicalUrl: "https://yttoolbox.com/tools/banner-downloader"
  });

  const handleProcess = async () => {
    if (!channelUrl) {
      setError("Please enter a YouTube channel URL");
      setBannerUrl("");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Call our server API to extract banner
      const response = await fetch(`${API_BASE_URL}/api/banner?url=${encodeURIComponent(channelUrl)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to extract banner");
      }
      
      const data = await response.json();
      setBannerUrl(data.url || "");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "An error occurred while extracting banner");
      } else {
        setError("An error occurred while extracting banner");
      }
      setBannerUrl("");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = (url: string, name: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
          YouTube Banner Downloader
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
          Download high-quality YouTube channel banners instantly
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
          Extract and download banner images from any YouTube channel URL including @username, /c/, and /channel/ formats. 
          Get HD quality banners completely free with no registration required.
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
              Enter YouTube Channel URL
            </Typography>
            <Box
              sx={{
                width: '100%',
                maxWidth: '700px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 1, sm: 0 },
                  width: '100%',
                  alignItems: { xs: 'stretch', sm: 'flex-start' },
                }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Paste YouTube channel URL here"
                  value={channelUrl}
                  onChange={(e) => setChannelUrl(e.target.value)}
                  error={!!error}
                  sx={{
                    flex: 1,
                    '& .MuiOutlinedInput-root': {
                      height: '40px',
                      borderTopRightRadius: { xs: '8px', sm: 0 },
                      borderBottomRightRadius: { xs: '8px', sm: 0 },
                      borderTopLeftRadius: '8px',
                      borderBottomLeftRadius: '8px',
                      '& input': {
                        padding: '8px 16px',
                        fontSize: '14px',
                      },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleProcess}
                  disabled={loading}
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
                  {loading ? <CircularProgress size={20} color="inherit" /> : "Process"}
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
        <Divider sx={{ mb: 3 }} />
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
          {!bannerUrl ? (
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
              <Typography>
                Enter a YouTube channel URL to get started
              </Typography>
              {bannerUrl && (
                <Box sx={{ mt: 3, textAlign: "center" }}>
                  <img
                    src={bannerUrl}
                    alt="Channel Banner"
                    style={{
                      width: "100%",
                      maxWidth: 600,
                      height: "auto",
                      borderRadius: 8,
                      marginBottom: 16,
                      boxShadow: "2",
                    }}
                    loading="lazy"
                  />
                  <Button
                    variant="contained"
                    href={bannerUrl}
                    download={`channel-banner.jpg`}
                    startIcon={<DownloadIcon />}
                    sx={{
                      py: 1.5,
                      px: 4,
                      borderRadius: 2,
                      background: "linear-gradient(45deg, #ff0000, #ff6b6b)",
                      '&:hover': {
                        background: "linear-gradient(45deg, #e60000, #ff5252)",
                      },
                    }}
                  >
                    Download Banner
                  </Button>
                </Box>
              )}
            </Box>
          ) : (
            <Box sx={{ width: "100%", textAlign: "center" }}>
              <img
                src={bannerUrl}
                alt="YouTube Channel Banner"
                style={{
                  width: "100%",
                  maxWidth: 640,
                  borderRadius: 6,
                  marginBottom: 16,
                  border: "1px solid #eee",
                }}
              />
              <Button
                size="small"
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={() => downloadImage(bannerUrl, "youtube-banner.jpg")}
              >
                Download Banner
              </Button>
            </Box>
          )}
        </Card>
      </Box>
      <RelatedToolsSection />
      {/* FAQ Section */}
      <Box sx={{ maxWidth: 700, mx: "auto", mt: 6, mb: 4, px: { xs: 1, sm: 0 } }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, fontSize: { xs: 18, sm: 22 } }}>
          Frequently Asked Questions
        </Typography>
        <Box component="dl" sx={{ m: 0, display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 3 } }}>
          <Box sx={{ mb: { xs: 1.5, sm: 3 } }}>
            <Typography component="dt" fontWeight={600} sx={{ fontSize: { xs: 15, sm: 17 }, mb: 0.5 }}>
              How do I use the YouTube Banner Downloader?
            </Typography>
            <Typography component="dd" color="text.secondary" sx={{ ml: 0, fontSize: { xs: 13, sm: 15 } }}>
              Paste the YouTube channel URL above and click "Process". The
              channel banner will appear for download.
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
              Why can't I see a banner for some channels?
            </Typography>
            <Typography component="dd" color="text.secondary" sx={{ ml: 0, fontSize: { xs: 13, sm: 15 } }}>
              Some channels may not have a custom banner, or the banner may not
              be publicly accessible.
            </Typography>
          </Box>
          <Box sx={{ mb: { xs: 1.5, sm: 3 } }}>
            <Typography component="dt" fontWeight={600} sx={{ fontSize: { xs: 15, sm: 17 }, mb: 0.5 }}>
              Can I use these banners for my own projects?
            </Typography>
            <Typography component="dd" color="text.secondary" sx={{ ml: 0, fontSize: { xs: 13, sm: 15 } }}>
              YouTube banners are subject to copyright. Always check the
              channel’s usage rights before using banners elsewhere.
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
              name: "How do I use the YouTube Banner Downloader?",
              acceptedAnswer: {
                "@type": "Answer",
                text: 'Paste the YouTube channel URL above and click "Process". The channel banner will appear for download.',
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
              name: "Why can't I see a banner for some channels?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Some channels may not have a custom banner, or the banner may not be publicly accessible.",
              },
            },
            {
              "@type": "Question",
              name: "Can I use these banners for my own projects?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "YouTube banners are subject to copyright. Always check the channel’s usage rights before using banners elsewhere.",
              },
            },
          ],
        })}
      </script>
    </Box>
  );
}
