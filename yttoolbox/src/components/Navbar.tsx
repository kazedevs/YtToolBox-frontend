import { AppBar, Toolbar, Typography, Box, Button, Container, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import MobileDrawer from './MobileDrawer';

const Navbar = () => {
  const location = useLocation();

  const handleToolsClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const toolsSection = document.getElementById('tools-section');
      if (toolsSection) {
        toolsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <AppBar position="sticky" color="default" elevation={0} sx={{ top: 0, zIndex: 1100, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            YtToolBox
          </Typography>
          {/* Desktop Nav */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button 
              component={Link} 
              to="/" 
              onClick={handleToolsClick}
              color="inherit"
            >
              Tools
            </Button>
            <Button component={Link} to="/about" color="inherit">
              About
            </Button>
            <Button component={Link} to="/contact" color="inherit">
              Contact
            </Button>
            <Button component={Link} to="/privacy" color="inherit">
              Privacy
            </Button>
            <Button component={Link} to="/terms" color="inherit">
              Terms
            </Button>
            <Button component={Link} to="/blog" color="inherit">
              Blog
            </Button>
          </Box>
          {/* Mobile Hamburger */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton edge="end" color="inherit" aria-label="menu" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
          <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
