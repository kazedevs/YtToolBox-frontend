import React from "react";
import { Box, Typography, Button } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 3,
      }}
    >
      <Box sx={{ textAlign: 'center', maxWidth: '500px', width: '100%' }}>
        <Typography 
          variant="h1" 
          sx={{ 
            fontSize: { xs: '6rem', sm: '8rem' },
            fontWeight: 700,
            lineHeight: 1,
            mb: 2,
            background: 'linear-gradient(45deg, #f44336 30%, #ff9800 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          404
        </Typography>
        
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            fontWeight: 600, 
            mb: 2,
            color: 'text.primary'
          }}
        >
          Page Not Found
        </Typography>
        
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ 
            mb: 4,
            maxWidth: '400px',
            mx: 'auto',
            lineHeight: 1.6
          }}
        >
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Typography>
        
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<HomeIcon />}
          onClick={() => navigate('/')}
          sx={{
            borderRadius: '50px',
            px: 4,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }
          }}
        >
          Back to Home
        </Button>
      </Box>
    </Box>
  );
};

export default ErrorPage;
