# YouTube Toolbox 🛠️

A powerful collection of YouTube tools to enhance your content creation and analysis workflow. Extract thumbnails, banners, profile pictures, video titles, and comments with ease.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express.js-404D59?style=flat&logo=express&logoColor=white)](https://expressjs.com/)

## 🌟 Features

- **Thumbnail Downloader**: Extract high-quality thumbnails from any YouTube video
- **Banner Downloader**: Download channel banner images in various resolutions
- **Profile Picture Downloader**: Get channel profile pictures in different sizes
- **Title Extractor**: Extract video titles and metadata
- **Comments Extractor**: View and analyze video comments

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Material-UI** for beautiful UI components
- **Recoil** for state management
- **React Router** for navigation

### Backend
- **Node.js** with **Express**
- **TypeScript** for type safety
- **youtubei.js** for YouTube data extraction
- **CORS** enabled for cross-origin requests
- **Helmet** for security headers

## 🛠️ Installation

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/kazedevs/YtToolBox.git
   cd YtToolBox
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   pnpm install
   
   # Install frontend dependencies
   cd yttoolbox
   pnpm install
   
   # Install backend dependencies
   cd ../server
   pnpm install
   ```

## 🚦 Running Locally

1. **Start the development servers**
   ```bash
   # From the root directory
   pnpm dev
   ```
   This will start both the frontend and backend servers concurrently.

2. **Access the application**
   - Frontend: http://localhost:5174
   - Backend API: http://localhost:5000

## 🏗️ Project Structure

```
yttoolbox-new/
├── server/               # Backend server
│   ├── src/
│   │   └── server.ts    # Express server setup and API routes
│   └── package.json     # Backend dependencies
│
├── yttoolbox/           # Frontend React application
│   ├── public/         # Static files
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── App.tsx     # Main App component
│   │   └── main.tsx    # Entry point
│   └── package.json    # Frontend dependencies
│
└── package.json         # Root package.json for workspace
```

## 🌐 API Endpoints

- `GET /api/title?url=<youtube_url>` - Get video title and metadata
- `GET /api/thumbnail?url=<youtube_url>` - Get video thumbnails
- `GET /api/banner?url=<youtube_url>` - Get channel banner
- `GET /api/pfp?url=<youtube_url>` - Get channel profile picture
- `GET /api/comments?url=<youtube_url>` - Get video comments

## 🏗️ Building for Production

```bash
# Build both frontend and backend
pnpm build

# Start production server
cd server
pnpm start
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [youtubei.js](https://github.com/LuanRT/YouTube.js) - For YouTube data extraction
- [Vite](https://vitejs.dev/) - For the amazing development experience
- [Material-UI](https://mui.com/) - For the beautiful UI components
