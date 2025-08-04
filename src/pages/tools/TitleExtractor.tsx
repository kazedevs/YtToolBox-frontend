import { useState } from "react";
import { useSEO } from "../../hooks/useSEO";
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Card, 
  CardContent,
  CircularProgress, 
  Alert, 
  Container,
  IconButton,
  Tooltip
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import axios from "axios";
import { API_BASE_URL } from "../../constants/api";

interface VideoInfo {
  title: string;
  description: string;
  duration: string;
  viewCount: string;
  likeCount: string;
  thumbnail: string;
}

const TitleExtractor = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // SEO Hook
  useSEO({
    title: "Free YouTube Title Extractor - Video Title & Metadata",
    description: "Extract YouTube video titles, descriptions, duration, view count, and like count. Get video metadata from any YouTube URL instantly. 100% free, no registration.",
    keywords: "youtube title extractor, extract youtube titles, youtube metadata extractor, free title extractor, youtube video title, youtube video description, youtube video info, video metadata tool",
    canonicalUrl: "https://yttoolbox.com/tools/title-extractor"
  });

  // On Extract, open the video URL if valid
  const extractTitle = async () => {
    if (!videoUrl) {
      setError("Please enter a YouTube URL");
      return;
    }

    const ytRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?.*v=|youtu\.be\/)[\w-]{11}/;
    if (!ytRegex.test(videoUrl.trim())) {
      setError("Please enter a valid YouTube video URL");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const response = await axios.get<VideoInfo>(`${API_BASE_URL}/api/title`, {
        params: { url: videoUrl }
      });
      
      setVideoInfo(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to extract video information");
      setVideoInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatNumber = (num: string) => {
    return parseInt(num).toLocaleString();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
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
          YouTube Title Extractor
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
          Extract YouTube video titles, descriptions, and metadata instantly
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
          Get video metadata including titles, descriptions, duration, view count, and like count from any YouTube URL. 
          Completely free with no registration required.
        </Typography>
      </Box>

      <Card variant="outlined">
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 2 }}>
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                variant="outlined"
                label="YouTube Video URL"
                placeholder="https://www.youtube.com/watch?v=..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                disabled={loading}
                size="small"
              />
            </Box>
            <Box sx={{ minWidth: { xs: '100%', md: '200px' } }}>
              <Button
                fullWidth
                variant="contained"
                onClick={extractTitle}
                disabled={loading || !videoUrl.trim()}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <DownloadIcon />}
                size="large"
                sx={{ height: '40px' }}
              >
                {loading ? 'Extracting...' : 'Extract'}
              </Button>
            </Box>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {videoInfo && (
            <Box mt={4}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mt: 3 }}>
                <Box sx={{ width: { xs: '100%', md: '40%' }, flexShrink: 0 }}>
                  <Box sx={{ borderRadius: 1, overflow: 'hidden' }}>
                    <img 
                      src={videoInfo.thumbnail} 
                      alt="Video thumbnail" 
                      style={{ 
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        maxHeight: '300px',
                        objectFit: 'cover'
                      }} 
                    />
                  </Box>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" component="h2" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        {videoInfo.title}
                      </Typography>
                      <Tooltip title="Copy title">
                        <IconButton 
                          size="small" 
                          onClick={() => copyToClipboard(videoInfo.title)}
                          color="primary"
                        >
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      {formatNumber(videoInfo.viewCount)} views
                    </Typography>
                    
                    <Box sx={{ 
                      bgcolor: 'background.paper', 
                      p: 2, 
                      borderRadius: 1,
                      maxHeight: 200,
                      overflowY: 'auto',
                      border: '1px solid',
                      borderColor: 'divider',
                      mt: 2
                    }}>
                      <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                        {videoInfo.description}
                      </Typography>
                      <Box sx={{ mt: 1, textAlign: 'right' }}>
                        <Button 
                          size="small" 
                          startIcon={<ContentCopyIcon />}
                          onClick={() => copyToClipboard(videoInfo.description)}
                        >
                          Copy Description
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default TitleExtractor;
