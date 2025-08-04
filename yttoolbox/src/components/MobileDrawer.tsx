import { Drawer, Box, List, ListItem, ListItemButton, ListItemText, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

const tools = [
  { label: 'Thumbnail Downloader', path: '/tools/thumbnail-downloader' },
  { label: 'Banner Downloader', path: '/tools/banner-downloader' },
  { label: 'Title Extractor', path: '/tools/title-extractor' },
  { label: 'Comments Extractor', path: '/tools/comments-extractor' },
  { label: 'PFP Downloader', path: '/tools/pfp-downloader' },

];

const nav = [
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Privacy', path: '/privacy' },
  { label: 'Terms', path: '/terms' },
  { label: 'Blog', path: '/blog', external: true },
];

export default function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose} sx={{ zIndex: 1300 }}>
      <Box sx={{ width: 270, pt: 2, px: 1 }} role="presentation">
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <IconButton onClick={onClose} size="large" aria-label="close menu">
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          <ListItem>
            <ListItemText primary="Tools" primaryTypographyProps={{ fontWeight: 700, fontSize: 16 }} />
          </ListItem>
          {tools.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton component={Link} to={item.path} onClick={onClose}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 1.5 }} />
        <List>
          {nav.map((item) => (
            <ListItem key={item.label} disablePadding>
              {item.external ? (
                <ListItemButton component="a" href={item.path} target="_blank" rel="noopener noreferrer" onClick={onClose}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              ) : (
                <ListItemButton component={Link} to={item.path} onClick={onClose}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              )}
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
