// Dynamic import utilities for reducing bundle size

// Lazy load MUI components
export const lazyMUI = {
  Box: () => import('@mui/material/Box'),
  Button: () => import('@mui/material/Button'),
  TextField: () => import('@mui/material/TextField'),
  Typography: () => import('@mui/material/Typography'),
  Card: () => import('@mui/material/Card'),
  Divider: () => import('@mui/material/Divider'),
  Stack: () => import('@mui/material/Stack'),
  CircularProgress: () => import('@mui/material/CircularProgress'),
  Grid: () => import('@mui/material/Grid'),
  Container: () => import('@mui/material/Container'),
  Paper: () => import('@mui/material/Paper'),
  Alert: () => import('@mui/material/Alert'),
  Snackbar: () => import('@mui/material/Snackbar'),
};

// Lazy load AntD components
export const lazyAntd = {
  Button: () => import('antd/es/button'),
  Input: () => import('antd/es/input'),
  Card: () => import('antd/es/card'),
  Space: () => import('antd/es/space'),
  Typography: () => import('antd/es/typography'),
  Alert: () => import('antd/es/alert'),
  Spin: () => import('antd/es/spin'),
  Row: () => import('antd/es/row'),
  Col: () => import('antd/es/col'),
};

// Preload critical components
export const preloadComponents = () => {
  // Preload critical UI components
  import('@mui/material/Box');
  import('@mui/material/Button');
  import('@mui/material/TextField');
};


