import { useState } from "react";
import { useSEO } from "../../hooks/useSEO";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  Avatar,
  Divider,
  Container,
  CircularProgress,
} from "@mui/material";

import RelatedToolsSection from "../../components/RelatedToolsSection";
import { API_BASE_URL } from "../../constants/api";

const PFPDownloader = () => {
  const [input, setInput] = useState("");
  const [pfpUrl, setPfpUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // SEO Hook
  useSEO({
    title: "Free YouTube Profile Picture Downloader - PFP Extractor",
    description: "Download YouTube channel profile pictures in HD quality. Extract PFPs from any YouTube channel URL instantly. Supports all channel formats. 100% free, no registration.",
    keywords: "youtube pfp downloader, download youtube profile pictures, youtube pfp extractor, free pfp downloader, youtube channel pfp, HD pfp download, youtube pfp tool, youtube pfp download, profile picture downloader",
    canonicalUrl: "https://yttoolbox.com/tools/pfp-downloader"
  });

  const handleProcess = async () => {
    if (!input.trim()) {
      setError("Please enter a YouTube URL, username, or channel ID");
      return;
    }

    // Validate YouTube URL format
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)/;
    
    // Check if it's a valid YouTube URL format
    if (input.includes('youtube.com') || input.includes('youtu.be')) {
      if (!youtubeRegex.test(input)) {
        setError("Please enter a valid YouTube URL");
        return;
      }
      
      if (input.includes('youtube.com') && (!input.includes('/@') && !input.includes('/channel/') && !input.includes('/c/'))) {
        setError("Please enter a valid YouTube channel URL");
        return;
      }
    }

    setError("");
    setLoading(true);

    try {
      // Call our server API to extract profile picture
      const response = await fetch(`${API_BASE_URL}/api/pfp?url=${encodeURIComponent(input)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to extract profile picture");
      }
      
      const data = await response.json();
      setPfpUrl(data.url || "");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "An error occurred while extracting profile picture");
      } else {
        setError("An error occurred while extracting profile picture");
      }
      setPfpUrl("");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!pfpUrl) return;

    const link = document.createElement("a");
    link.href = pfpUrl;
    link.download = "youtube-profile-picture.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // FAQ data
  const faqs = [
    {
      question: "How do I download a YouTube profile picture?",
      answer:
        "Enter the YouTube username or channel ID above and click Process. The profile picture will be shown below and you can download it.",
    },
    {
      question: "Is the downloaded image high quality?",
      answer:
        "This tool fetches the highest quality available for the YouTube profile picture.",
    },
    {
      question: "Can I use this for any channel?",
      answer:
        "Yes, you can download the profile picture for any public YouTube channel.",
    },
    {
      question: "Is this tool free?",
      answer: "Yes, this tool is completely free to use.",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "#FAFBFC",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: { xs: '100%', sm: 700 }, mx: 'auto', px: { xs: 1, sm: 0 }, py: 3 }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
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
            YouTube Profile Picture Downloader
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
            Download high-quality YouTube channel profile pictures instantly
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
            Extract and download profile pictures from any YouTube channel URL including @username, /c/, /channel/, and video URLs. 
            Get HD quality profile pictures completely free with no registration required.
          </Typography>
        </Box>
        {/* Input Card */}
        <Card elevation={0} sx={{ p: 3, mb: 4, borderRadius: 2, bgcolor: '#FFFFFF', boxShadow: 'none' }}>
          <Typography fontWeight={600} sx={{ mb: 2, textAlign: 'center', fontSize: 18 }}>
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
                placeholder="Enter YouTube username or channel ID"
                value={input}
                onChange={(e) => setInput(e.target.value)}
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
                onClick={() => handleProcess()}
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
        </Card>
        {/* Preview Card */}
        <Card elevation={0} sx={{ p: 3, borderRadius: 2, boxShadow: 'none', mt: 2, mb: 4, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            Profile Picture Preview
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Card elevation={0} sx={{ p: 2, borderRadius: 2, mt: 2, mb: 2, textAlign: 'center', bgcolor: '#FFFFFF', boxShadow: 'none' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              {!pfpUrl ? (
                <Box
                  sx={{
                    width: 180,
                    height: 180,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f3f4f6 60%, #e2e8f0 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px dashed #d1d5db',
                  }}
                >
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="40" cy="40" r="40" fill="#e5e7eb" />
                    <path d="M40 44c7.732 0 14-6.268 14-14S47.732 16 40 16 26 22.268 26 30s6.268 14 14 14zm0 4c-9.941 0-30 5.03-30 15v5h60v-5c0-9.97-20.059-15-30-15z" fill="#cbd5e1" />
                  </svg>
                </Box>
              ) : (
                <Avatar
                  src={pfpUrl}
                  alt="YouTube Profile Picture"
                  sx={{
                    width: 180,
                    height: 180,
                    mx: "auto",
                    mb: 2,
                    border: "2px solid #eee",
                    bgcolor: "action.hover",
                  }}
                />
              )}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                onClick={handleDownload}
                disabled={!pfpUrl}
                sx={{
                  bgcolor: '#4CAF50',
                  '&:hover': { bgcolor: '#388E3C' },
                  textTransform: 'none',
                  fontSize: '14px',
                  opacity: !pfpUrl ? 0.5 : 1,
                  pointerEvents: !pfpUrl ? 'none' : 'auto',
                  transition: 'opacity 0.2s',
                }}
              >
                Download
              </Button>
            </Box>
          </Card>
        </Card>
        {/* Related Tools */}
        <RelatedToolsSection />

        {/* FAQ Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Frequently Asked Questions
          </Typography>
          <Box sx={{ "& > div:not(:last-child)": { mb: 3 } }}>
            {faqs.map((faq, index) => (
              <Box key={index}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {faq.question}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {faq.answer}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  </Box>
  );
};

export default PFPDownloader;
