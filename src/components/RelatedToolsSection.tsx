import { Box, Typography, Divider, Button } from "@mui/material";
import { Link } from "react-router-dom";

interface RelatedToolsSectionProps {
  currentTool?: string;
}

const tools = [
  {
    title: "Thumbnail Downloader",
    path: "/tools/thumbnail-downloader"
  },
  {
    title: "Title Extractor",
    path: "/tools/title-extractor"
  },
  {
    title: "Banner Downloader",
    path: "/tools/banner-downloader"
  },
  {
    title: "PFP Downloader",
    path: "/tools/pfp-downloader"
  },
  {
    title: "Comments Extractor",
    path: "/tools/comments-extractor"
  }
];

const RelatedToolsSection: React.FC<RelatedToolsSectionProps> = ({ currentTool }) => (
  <Box sx={{ mb: 4, maxWidth: { xs: '100%', sm: 700 }, mx: 'auto', px: { xs: 1, sm: 0 }, py: { xs: 2, sm: 0 } }}>
    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
      Related Tools
    </Typography>
    <Divider sx={{ mb: 2 }} />
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 1,
      }}
    >
      {tools
        .filter(tool => tool.title !== currentTool)
        .map((tool) => (
          <Button
            key={tool.path}
            component={Link}
            to={tool.path}
            variant="outlined"
            size="small"
            sx={{
              borderColor: "primary.main",
              color: "primary.main",
              py: 0.5,
              px: 1.5,
              fontSize: '0.875rem',
              textTransform: "none",
              minWidth: 'auto',
              height: '36px',
              lineHeight: 1.2,
              '&:hover': {
                backgroundColor: "primary.main",
                color: "primary.contrastText",
              },
            }}
          >
            {tool.title}
          </Button>
        ))}
    </Box>
  </Box>
);

export default RelatedToolsSection;
