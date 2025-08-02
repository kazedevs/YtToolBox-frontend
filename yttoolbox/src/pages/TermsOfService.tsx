import { Typography, Box, Paper, useTheme, Container } from '@mui/material';
import { Gavel, Security, Policy, Warning } from '@mui/icons-material';

const TermsOfService = () => {
  const theme = useTheme();

  const sectionStyle = {
    mb: 4,
    p: { xs: 2, sm: 3, md: 4 },
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '12px',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows[2],
    },
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
  };

  const sectionTitleStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    mb: 3,
    color: theme.palette.text.primary,
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary.main,
    },
  };

  const listItemStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 2,
    mb: 2,
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary.main,
      fontSize: '1.2rem',
      mt: '0.2rem',
    },
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, sm: 3 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 700, 
            mb: 2,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            lineHeight: 1.2
          }}
        >
          Terms of Service
        </Typography>
        <Typography 
          variant="subtitle1" 
          color="text.secondary"
          sx={{
            fontSize: { xs: '0.875rem', sm: '1rem' },
            maxWidth: '800px',
            mx: 'auto'
          }}
        >
          Last Updated: August 1, 2025
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ ...sectionStyle, borderColor: theme.palette.primary.light }}>
        <Box sx={sectionTitleStyle}>
          <Gavel fontSize="large" />
          <Typography variant="h5" component="h2">1. Acceptance of Terms</Typography>
        </Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
          By accessing or using YtToolBox ("the Service"), you agree to be bound by these Terms of Service ("Terms"). 
          If you do not agree to these Terms, please do not use our Service.
        </Typography>
      </Paper>

      <Paper elevation={0} sx={sectionStyle}>
        <Box sx={sectionTitleStyle}>
          <Policy fontSize="large" />
          <Typography variant="h5" component="h2">2. Description of Service</Typography>
        </Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
          YtToolBox provides online tools to help users download YouTube thumbnails, extract video titles, 
          and access other YouTube-related information. All tools are provided "as is" without any warranties.
        </Typography>
      </Paper>

      <Paper elevation={0} sx={sectionStyle}>
        <Box sx={sectionTitleStyle}>
          <Security fontSize="large" />
          <Typography variant="h5" component="h2">3. User Responsibilities</Typography>
        </Box>
        <Box component="ul" sx={{ pl: 0, mt: 1, listStyle: 'none' }}>
          {[
            "You agree to use the Service only for lawful purposes and in accordance with these Terms.",
            "You must not use our Service to violate any laws, including copyright laws.",
            "You are responsible for any content you access or download using our Service.",
            "You must not use our Service to distribute malicious software or engage in any harmful activities.",
          ].map((item, index) => (
            <Box key={index} component="li" sx={listItemStyle}>
              <Warning fontSize="small" />
              <Typography variant="body1">{item}</Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      <Paper elevation={0} sx={sectionStyle}>
        <Box sx={sectionTitleStyle}>
          <Warning fontSize="large" />
          <Typography variant="h5" component="h2">4. Copyright and Fair Use</Typography>
        </Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
          YtToolBox respects intellectual property rights and expects users to do the same. 
          The Service is intended for personal, non-commercial use only. You are responsible 
          for ensuring that your use of any content complies with YouTube's Terms of Service 
          and all applicable copyright laws.
        </Typography>
      </Paper>

      <Paper elevation={0} sx={sectionStyle}>
        <Box sx={sectionTitleStyle}>
          <Policy fontSize="large" />
          <Typography variant="h5" component="h2">5. Limitation of Liability</Typography>
        </Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
          YtToolBox shall not be liable for any indirect, incidental, special, consequential, 
          or punitive damages resulting from your use of or inability to use the Service. 
          We do not guarantee the accuracy, completeness, or usefulness of any information 
          provided by the Service.
        </Typography>
      </Paper>

      <Paper elevation={0} sx={sectionStyle}>
        <Box sx={sectionTitleStyle}>
          <Policy fontSize="large" />
          <Typography variant="h5" component="h2">6. Changes to Terms</Typography>
        </Box>
        <Typography variant="body1">
          We reserve the right to modify these Terms at any time. We will provide notice of 
          any changes by updating the "Last Updated" date at the top of this page. Your 
          continued use of the Service after any changes constitutes your acceptance of the new Terms.
        </Typography>
      </Paper>

      <Paper elevation={0} sx={{ ...sectionStyle, borderColor: theme.palette.primary.light }}>
        <Box sx={sectionTitleStyle}>
          <Warning fontSize="large" />
          <Typography variant="h5" component="h2">7. Contact Us</Typography>
        </Box>
        <Typography variant="body1">
          If you have any questions about these Terms, please contact us through our 
          <a href="/contact" style={{ color: theme.palette.primary.main, marginLeft: '4px' }}>
            Contact Page
          </a>.
        </Typography>
      </Paper>
      </Container>
    </Box>
  );
};

export default TermsOfService;
