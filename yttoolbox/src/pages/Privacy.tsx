import { Typography, Box, Paper, useTheme } from '@mui/material';
import { Lock, Security, VisibilityOff, Update, Help } from '@mui/icons-material';

const Privacy = () => {
  const theme = useTheme();

  const sectionStyle = {
    mb: 4,
    p: { xs: 3, sm: 4 },
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '12px',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows[2],
    },
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
    mb: 1.5,
    display: 'flex',
    alignItems: 'flex-start',
    '&:before': {
      content: '""',
      display: 'inline-block',
      minWidth: '6px',
      height: '6px',
      backgroundColor: theme.palette.primary.main,
      borderRadius: '50%',
      margin: '0.5em 0.75em 0 0',
    },
  };

  return (
    <Box sx={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <Box sx={{ 
        py: { xs: 4, md: 6 }, 
        px: { xs: 2, sm: 3 },
        maxWidth: 900,
        mx: 'auto',
      }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              fontWeight: 800, 
              mb: 2,
              fontSize: { xs: '2rem', sm: '2.5rem' },
              color: 'primary.main',
            }}
          >
            Privacy Policy
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: '1.1rem' }}>
            Last updated: August 1, 2025
          </Typography>
        </Box>

        <Paper elevation={0} sx={sectionStyle}>
          <Typography variant="h6" sx={{ lineHeight: 1.7, fontSize: '1.1rem', color: 'text.secondary' }}>
            At YTToolbox, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
            disclose, and safeguard your information when you visit our website and use our services.
          </Typography>
        </Paper>

        <Paper elevation={0} sx={sectionStyle}>
          <Box sx={sectionTitleStyle}>
            <Lock fontSize="large" />
            <Typography variant="h5" component="h2">Information We Collect</Typography>
          </Box>
          
          <Typography variant="body1" paragraph sx={{ color: 'text.secondary' }}>
            We collect information that you provide directly to us, such as when you create an account, 
            subscribe to our newsletter, or contact us for support.
          </Typography>
          
          <Box component="ul" sx={{ pl: 0, mt: 3, listStyle: 'none' }}>
            {[
              'Your name and email address',
              'Profile information and preferences',
              'Payment information for premium services',
              'Content you submit through our platform'
            ].map((item, index) => (
              <Typography key={index} component="li" sx={listItemStyle}>
                {item}
              </Typography>
            ))}
          </Box>
        </Paper>

        <Paper elevation={0} sx={sectionStyle}>
          <Box sx={sectionTitleStyle}>
            <Security fontSize="large" />
            <Typography variant="h5" component="h2">How We Use Your Information</Typography>
          </Box>
          
          <Box component="ul" sx={{ pl: 0, mt: 1, listStyle: 'none' }}>
            {[
              'Provide, maintain, and improve our services',
              'Process transactions and send related information',
              'Send you technical notices, updates, and support messages',
              'Respond to your comments, questions, and requests',
              'Monitor and analyze trends, usage, and activities',
              'Personalize your experience with our services'
            ].map((item, index) => (
              <Typography key={index} component="li" sx={listItemStyle}>
                {item}
              </Typography>
            ))}
          </Box>
        </Paper>

        <Paper elevation={0} sx={sectionStyle}>
          <Box sx={sectionTitleStyle}>
            <VisibilityOff fontSize="large" />
            <Typography variant="h5" component="h2">Data Security</Typography>
          </Box>
          
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            We implement appropriate technical and organizational measures to protect the security of your 
            personal information. However, please be aware that no security measures are perfect or impenetrable.
          </Typography>
        </Paper>

        <Paper elevation={0} sx={{ ...sectionStyle, borderColor: theme.palette.primary.light }}>
          <Box sx={sectionTitleStyle}>
            <Help fontSize="large" />
            <Typography variant="h5" component="h2">Your Choices</Typography>
          </Box>
          
          <Box component="ul" sx={{ pl: 0, mt: 1, listStyle: 'none' }}>
            {[
              'Update, correct, or delete your account information',
              'Opt-out of receiving promotional communications',
              'Set your browser to refuse all or some browser cookies',
              'Request access to your personal data'
            ].map((item, index) => (
              <Typography key={index} component="li" sx={listItemStyle}>
                {item}
              </Typography>
            ))}
          </Box>
        </Paper>

        <Paper elevation={0} sx={sectionStyle}>
          <Box sx={sectionTitleStyle}>
            <Update fontSize="large" />
            <Typography variant="h5" component="h2">Changes to This Policy</Typography>
          </Box>
          
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
            the new Privacy Policy on this page and updating the "Last updated" date.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Privacy;