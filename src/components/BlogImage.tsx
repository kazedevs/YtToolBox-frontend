import React from 'react';
import { Box } from '@mui/material';

interface BlogImageProps {
  src: string;
  alt: string;
  caption?: string;
}

const BlogImage: React.FC<BlogImageProps> = ({ src, alt, caption }) => {
  return (
    <Box sx={{ my: 4 }}>
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          width: '100%',
          height: 'auto',
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      />
      {caption && (
        <Box
          component="figcaption"
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            fontSize: '0.875rem',
            mt: 2,
            fontStyle: 'italic',
          }}
        >
          {caption}
        </Box>
      )}
    </Box>
  );
};

export default BlogImage;
