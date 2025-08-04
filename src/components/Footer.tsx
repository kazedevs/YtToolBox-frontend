import { Box, Container, Typography, Link as MuiLink, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => (
  <Box 
    component="footer" 
    sx={{ 
      bgcolor: 'background.paper', 
      borderTop: '1px solid',
      borderColor: 'divider',
      py: { xs: 4, md: 6 },
      mt: 'auto'
    }}
  >
    <Container maxWidth="lg">
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 4 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              component="img"
              src="/fav.svg"
              alt="YtToolBox"
              sx={{ 
                width: 24, 
                height: 24
              }}
            />
            <Typography variant="h6" color="text.primary" fontWeight={700} gutterBottom>
              YtToolBox
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Free, fast, and easy-to-use tools for YouTube content creators and viewers.
          </Typography>
        </Box>
        
        <Box>
          <Typography variant="subtitle1" color="text.primary" fontWeight={600} gutterBottom>
            Tools
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <MuiLink component={Link} to="/tools/thumbnail-downloader" color="text.secondary" variant="body2" sx={{ textDecoration: 'none' }}>
              Thumbnail Downloader
            </MuiLink>
            <MuiLink component={Link} to="/tools/banner-downloader" color="text.secondary" variant="body2" sx={{ textDecoration: 'none' }}>
              Banner Downloader
            </MuiLink>
            <MuiLink component={Link} to="/tools/title-extractor" color="text.secondary" variant="body2" sx={{ textDecoration: 'none' }}>
              Title Extractor
            </MuiLink>
            <MuiLink component={Link} to="/tools/comments-extractor" color="text.secondary" variant="body2" sx={{ textDecoration: 'none' }}>
              Comments Extractor
            </MuiLink>
            <MuiLink component={Link} to="/tools/pfp-downloader" color="text.secondary" variant="body2" sx={{ textDecoration: 'none' }}>
              PFP Downloader
            </MuiLink>
          </Box>
        </Box>
        
        <Box>
          <Typography variant="subtitle1" color="text.primary" fontWeight={600} gutterBottom>
            Company
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <MuiLink component={Link} sx={{ textDecoration: 'none' }} to="/about" color="text.secondary" variant="body2">
              About Us
            </MuiLink>
            <MuiLink component={Link} sx={{ textDecoration: 'none' }} to="/blog" color="text.secondary" variant="body2">
              Blog
            </MuiLink>
            <MuiLink component={Link} sx={{ textDecoration: 'none' }} to="/contact" color="text.secondary" variant="body2">
              Contact
            </MuiLink>
          </Box>
        </Box>
        
        <Box>
          <Typography variant="subtitle1" color="text.primary" fontWeight={600} gutterBottom>
            Legal
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <MuiLink component={Link} sx={{ textDecoration: 'none' }} to="/privacy" color="text.secondary" variant="body2">
              Privacy Policy
            </MuiLink>
            <MuiLink component={Link} sx={{ textDecoration: 'none' }} to="/terms" color="text.secondary" variant="body2">
              Terms of Service
            </MuiLink>
          </Box>
        </Box>
      </Box>
      
      <Divider sx={{ my: 4 }} />
      
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} YtToolBox. All rights reserved.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, sm: 0 } }}>
          <MuiLink component={Link} sx={{ textDecoration: 'none' }} to="/privacy" color="text.secondary" variant="body2">
            Privacy Policy
          </MuiLink>
          <MuiLink component={Link} sx={{ textDecoration: 'none' }} to="/terms" color="text.secondary" variant="body2">
            Terms of Service
          </MuiLink>
          <MuiLink component={Link} sx={{ textDecoration: 'none' }} to="/contact" color="text.secondary" variant="body2">
            Contact Us
          </MuiLink>
        </Box>
      </Box>
    </Container>
  </Box>
);

export default Footer;
