import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { Innertube } from "youtubei.js";
import dotenv from "dotenv";

// Type definitions for Express Response extensions
declare global {
  namespace Express {
    interface Response {
      json: (body?: any) => Response;
      status: (code: number) => Response;
      setHeader: (name: string, value: string | string[]) => void;
      removeHeader: (name: string) => void;
    }
    interface Request {
      query: {
        url?: string;
        videoUrl?: string;
        channelUrl?: string;
        [key: string]: string | undefined;
      };
    }
  }
}

// Load environment variables
dotenv.config();

// Initialize Innertube
let innertube: any;

const initializeInnertube = async () => {
  innertube = await Innertube.create();
};

initializeInnertube();

const getVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Function to validate YouTube URL
export const validateURL = (url: string): boolean => {
  return getVideoId(url) !== null;
};

// Function to get video info
export const getVideoInfo = async (url: string) => {
  const videoId = getVideoId(url);
  if (!videoId) {
    throw new Error("Invalid YouTube URL");
  }
  return await innertube.getBasicInfo(videoId);
};

// Type definitions
interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface Thumbnails {
  [key: string]: Thumbnail;
}

interface VideoInfo {
  title: string;
  description: string;
  thumbnails: Thumbnails;
  owner_channel_name: string;
  view_count: string;
  like_count: string;
  comment_count: string;
  upload_date: string;
  duration: string;
  keywords: string[];
  channel_id: string;
  is_live: boolean;
  is_upcoming: boolean;
  is_crawlable: boolean;
  is_private: boolean;
  is_unplugged_corpus: boolean;
  is_live_content: boolean;
  is_post_live_dvr: boolean;
  is_reel: boolean;
  is_short: boolean;
  is_live_now: boolean;
  is_owner_viewing: boolean;
  allow_ratings: boolean;
  is_unlisted: boolean;
  is_family_safe: boolean;
}

const app: Express = express();
const PORT = process.env["PORT"] || 5000;

// Vercel compatibility - use provided port or default
const isVercel = process.env.VERCEL === "1";

// Security Middleware
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100"), // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply security middleware
app.use(limiter);
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:", "http:"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        connectSrc: ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173', // Vite default dev server
  'http://localhost:3000', // Common React dev server
  'https://www.yttoolbox.com', // Production domain
  'https://yttoolbox.com' // Production domain with www
];

const corsOptions: cors.CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health check endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    message: "YouTube Toolbox API Server",
    version: "1.0.0",
    endpoints: {
      "/api/title": "Extract video title, description, and metadata",
      "/api/banner": "Download channel banner images",
      "/api/thumbnail": "Download video thumbnails",
      "/api/pfp": "Download channel profile pictures",
      "/api/comments": "Extract video comments",
    },
    usage: "Add ?url=<youtube_url> parameter to any endpoint",
  });
});

// 2. Title Extractor
app.get("/api/title", async (req: Request, res: Response): Promise<void> => {
  try {
    const { url } = req.query;
    if (!url) {
      res.status(400).json({ error: "YouTube URL is required" });
      return;
    }

    const videoId = getVideoId(url as string);
    if (!videoId) {
      res.status(400).json({ error: "Invalid YouTube URL" });
      return;
    }

    const info = await innertube.getBasicInfo(videoId);

    const title = info.basic_info.title || "Untitled Video";
    const description =
      info.basic_info.short_description || "No description available";
    const views = info.basic_info.view_count?.toString() || "0";
    const thumbnail = info.basic_info.thumbnail?.[0]?.url || null;

    res.json({
      title,
      description,
      duration: info.basic_info.duration_seconds?.toString() || "0",
      viewCount: views,
      likeCount: info.basic_info.like_count?.toString() || "0",
      thumbnail,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to extract video info" });
  }
});

// 3. Banner Downloader
app.get("/api/channel-info", async (req: Request, res: Response) => {
  const { channelUrl } = req.query;
  if (!channelUrl || typeof channelUrl !== 'string') {
    res.status(400).json({ error: "Valid channel URL is required" });
    return;
  }
  
  try {
    const channelData = await innertube.getChannel(channelUrl);
    if (!channelData) {
      res.status(400).json({ error: "Invalid YouTube channel URL" });
      return;
    }

    res.json(channelData);
  } catch (error) {
    console.error("Error fetching channel info:", error);
    res.status(500).json({ error: "Failed to fetch channel information" });
  }
});

// 3. Banner Downloader
app.get("/api/banner", async (req: Request, res: Response): Promise<void> => {
  try {
    const { url } = req.query;

    // Input validation and sanitization
    if (!url || typeof url !== "string") {
      res.status(400).json({ error: "Valid YouTube URL is required" });
      return;
    }

    const urlString = url.toString().trim();
    if (urlString.length > 500) {
      res.status(400).json({ error: "URL too long" });
      return;
    }

    // Validate URL format
    if (!urlString.startsWith("http") || !urlString.includes("youtube.com")) {
      res.status(400).json({ error: "Invalid YouTube URL format" });
      return;
    }

    let channelIdOrName: string | null = null;

    // Handle @username format
    if (url.toString().includes("/@")) {
      const username = url
        .toString()
        .split("/@")[1]
        .split("/")[0]
        .split("?")[0];
      console.log("Extracted username:", username);

      // Search for the channel by username
      try {
        const searchResults = await innertube.search(username, {
          type: "channel",
        });
        console.log(
          "Search results found for username:",
          searchResults.results?.length || 0
        );

        if (searchResults.results && searchResults.results.length > 0) {
          let foundExactMatch = false;

          // Try to find exact match first
          for (const result of searchResults.results) {
            if (
              result.endpoint &&
              result.endpoint.payload &&
              result.endpoint.payload.browseId
            ) {
              channelIdOrName = result.endpoint.payload.browseId;
              console.log("Found channel ID for username:", channelIdOrName);
              foundExactMatch = true;
              break;
            }
          }

          // If no exact match, use the first result that has a browseId
          if (!foundExactMatch && searchResults.results[0]) {
            const firstResult = searchResults.results[0];
            if (
              firstResult.endpoint &&
              firstResult.endpoint.payload &&
              firstResult.endpoint.payload.browseId
            ) {
              channelIdOrName = firstResult.endpoint.payload.browseId;
              console.log(
                "Using first result channel ID for username:",
                channelIdOrName
              );
            }
          }
        }
      } catch (searchError) {
        console.error("Search error for username:", searchError);
        channelIdOrName = username; // Fallback
      }
    } else if (url.toString().includes("/channel/")) {
      // Direct channel ID format
      const channelIdMatch = url.toString().match(/\/channel\/([^\/\?]+)/);
      if (channelIdMatch) {
        channelIdOrName = channelIdMatch[1];
        console.log("Extracted channel ID:", channelIdOrName);
      }
    } else if (url.toString().includes("/c/")) {
      // Custom channel URL format - need to search for channel ID
      const customName = url
        .toString()
        .split("/c/")[1]
        .split("/")[0]
        .split("?")[0];
      console.log("Extracted custom name:", customName);

      // Search for the channel by custom name
      try {
        const searchResults = await innertube.search(customName, {
          type: "channel",
        });
        console.log(
          "Search results found for custom name:",
          searchResults.results?.length || 0
        );

        if (searchResults.results && searchResults.results.length > 0) {
          let foundExactMatch = false;

          // Try to find exact match first
          for (const result of searchResults.results) {
            // Check if the canonical URL matches
            if (
              result.endpoint &&
              result.endpoint.payload &&
              result.endpoint.payload.canonicalBaseUrl
            ) {
              const canonicalUrl = result.endpoint.payload.canonicalBaseUrl;
              if (canonicalUrl === `/c/${customName}`) {
                channelIdOrName = result.endpoint.payload.browseId;
                console.log(
                  "Found exact channel match for custom name:",
                  channelIdOrName
                );
                foundExactMatch = true;
                break;
              }
            }
          }

          // If no exact match, use the first result that has a browseId
          if (!foundExactMatch && searchResults.results[0]) {
            const firstResult = searchResults.results[0];
            if (
              firstResult.endpoint &&
              firstResult.endpoint.payload &&
              firstResult.endpoint.payload.browseId
            ) {
              channelIdOrName = firstResult.endpoint.payload.browseId;
              console.log(
                "Using first result channel ID for custom name:",
                channelIdOrName
              );
            }
          }

          // If still no match, use any result that has a browseId
          if (!channelIdOrName) {
            for (const result of searchResults.results) {
              if (
                result.endpoint &&
                result.endpoint.payload &&
                result.endpoint.payload.browseId
              ) {
                channelIdOrName = result.endpoint.payload.browseId;
                console.log("Using any available channel ID:", channelIdOrName);
                break;
              }
            }
          }
        }
      } catch (searchError) {
        console.error("Search error for custom name:", searchError);
        channelIdOrName = customName; // Fallback
      }
    } else if (getVideoId(url as string)) {
      // For video URLs, extract the channel ID from the video
      const videoId = getVideoId(url as string);
      if (videoId) {
        const info = await innertube.getBasicInfo(videoId);
        channelIdOrName = info.basic_info.channel_id;
        console.log("Extracted channel ID from video:", channelIdOrName);
      }
    }

    if (!channelIdOrName) {
      console.log("No channel ID or username extracted");
      res.status(400).json({ error: "Invalid YouTube channel URL" });
      return;
    }

    // Try to get channel info
    let channelInfo;
    try {
      console.log("Attempting to get channel with:", channelIdOrName);
      channelInfo = await innertube.getChannel(channelIdOrName);
      console.log("Channel info retrieved successfully");
      
      if (!channelInfo) {
        res.status(400).json({ error: "Invalid YouTube channel URL" });
        return;
      }
    } catch (error) {
      console.error("Channel lookup error:", error);
      res.status(400).json({ error: "Invalid YouTube channel URL" });
      return;
    }

    // Proper banner extraction using channel home page
    let banner: string | null = null;

    try {
      // Get the channel object and access its home page for banner data
      const channel = await innertube.getChannel(channelIdOrName);
      if (channel) {
        const home = await channel.getHome();
        
        // Access banner from home page header
        if (
          home?.header?.content?.banner?.image &&
          Array.isArray(home.header.content.banner.image) &&
          home.header.content.banner.image.length > 0
        ) {
          banner = home.header.content.banner.image[0].url;
        }
      }
    } catch (error) {
      console.error("Banner extraction error:", error instanceof Error ? error.message : String(error));
    }

    console.log("Banner extraction result:", banner);

    if (!banner) {
      res.json({
        url: null,
        message: "No banner image found for this channel",
      });
      return;
    }

    res.json({ url: banner });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch channel banner" });
  }
});

// 4. Thumbnail Downloader
app.get(
  "/api/thumbnail",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { url } = req.query;
      if (!url) {
        res.status(400).json({ error: "YouTube URL is required" });
        return;
      }

      const videoId = getVideoId(url as string);
      if (!videoId) {
        res.status(400).json({ error: "Invalid YouTube URL" });
        return;
      }

      const info = await innertube.getBasicInfo(videoId);
      const thumbnails = info.basic_info.thumbnail || [];

      // Convert thumbnails to our format
      const formattedThumbnails: Thumbnail[] = thumbnails.map((thumb: any) => ({
        url: thumb.url,
        width: thumb.width || 0,
        height: thumb.height || 0,
      }));

      const sortedThumbnails: Thumbnail[] = [...formattedThumbnails].sort(
        (a: Thumbnail, b: Thumbnail) => b.width * b.height - a.width * a.height
      );

      res.json({
        thumbnails: sortedThumbnails,
        title: info.basic_info.title || "Untitled Video",
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Failed to fetch thumbnails" });
    }
  }
);

// 5. Comments Extractor
app.get("/api/comments", async (req: Request, res: Response): Promise<void> => {
  try {
    const { url } = req.query;
    if (!url) {
      res.status(400).json({ error: "YouTube URL is required" });
      return;
    }

    const videoId = getVideoId(url as string);
    if (!videoId) {
      res.status(400).json({ error: "Invalid YouTube URL" });
      return;
    }

    // Get comments using Innertube
    const commentsData = await innertube.getComments(videoId);

    if (
      !commentsData ||
      !commentsData.comments ||
      !Array.isArray(commentsData.comments)
    ) {
      res.json({ comments: [] });
      return;
    }

    // Format comments to match our interface
    const formattedComments: Comment[] = commentsData.comments.map(
      (comment: any) => ({
        author: comment?.author?.name || "Unknown author",
        text: comment?.content?.text || "No text",
        likes: comment?.vote_count || 0,
        replies: comment?.reply_count || 0,
        publishedTime: comment?.published_time || "Unknown time",
      })
    );

    res.json({ comments: formattedComments });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

// 6. Profile Picture Downloader
app.get("/api/pfp", async (req: Request, res: Response): Promise<void> => {
  try {
    const { url } = req.query;
    if (!url) {
      res.status(400).json({ error: "YouTube URL is required" });
      return;
    }

    let channelInfo: any;
    let channelIdOrName: string | null = null;

    console.log("PFP URL received:", url);

    // Extract channel ID or username from URL
    if (url.toString().includes("/@")) {
      // For @username URLs like https://www.youtube.com/@MissRealBolly
      const username = url
        .toString()
        .split("/@")[1]
        .split("/")[0]
        .split("?")[0];
      console.log("Extracted @ username:", username);

      // Search for the channel to get its ID
      try {
        // Search with exact username including @ symbol
        const searchResults = await innertube.search(`@${username}`, {
          type: "channel",
        });
        console.log(
          "Search results found:",
          searchResults.results?.length || 0
        );

        if (searchResults.results && searchResults.results.length > 0) {
          let foundExactMatch = false;

          // Try to find exact match first
          for (const result of searchResults.results) {
            console.log("Checking result:", result.author?.name);

            // Check if the canonical URL matches
            if (
              result.endpoint &&
              result.endpoint.payload &&
              result.endpoint.payload.canonicalBaseUrl
            ) {
              const canonicalUrl = result.endpoint.payload.canonicalBaseUrl;
              if (canonicalUrl === `/@${username}`) {
                channelIdOrName = result.endpoint.payload.browseId;
                console.log("Found exact channel match:", channelIdOrName);
                foundExactMatch = true;
                break;
              }
            }

            // Check if the author name matches
            if (!foundExactMatch && result.author && result.author.name) {
              const authorName = result.author.name;
              if (
                authorName.toLowerCase() === username.toLowerCase() ||
                authorName === `@${username}`
              ) {
                channelIdOrName = result.endpoint.payload.browseId;
                console.log("Found author match:", channelIdOrName);
                foundExactMatch = true;
                break;
              }
            }
          }

          // If no exact match, use the first result that has a browseId
          if (!foundExactMatch && searchResults.results[0]) {
            const firstResult = searchResults.results[0];
            if (
              firstResult.endpoint &&
              firstResult.endpoint.payload &&
              firstResult.endpoint.payload.browseId
            ) {
              channelIdOrName = firstResult.endpoint.payload.browseId;
              console.log("Using first result channel ID:", channelIdOrName);
            }
          }
        }
      } catch (searchError) {
        console.error("Search error:", searchError);
        // If search fails, try using the username directly
        channelIdOrName = username;
      }
    } else if (url.toString().includes("/channel/")) {
      // For channel URLs like https://www.youtube.com/channel/UC...
      channelIdOrName = url
        .toString()
        .split("/channel/")[1]
        .split("/")[0]
        .split("?")[0];
      console.log("Extracted channel ID:", channelIdOrName);
    } else if (url.toString().includes("/c/")) {
      // Custom channel URL format - need to search for channel ID
      const customName = url
        .toString()
        .split("/c/")[1]
        .split("/")[0]
        .split("?")[0];
      console.log("Extracted custom name:", customName);

      // Search for the channel by custom name
      try {
        const searchResults = await innertube.search(customName, {
          type: "channel",
        });
        console.log(
          "Search results found for custom name:",
          searchResults.results?.length || 0
        );

        if (searchResults.results && searchResults.results.length > 0) {
          let foundExactMatch = false;

          // Try to find exact match first
          for (const result of searchResults.results) {
            // Check if the canonical URL matches
            if (
              result.endpoint &&
              result.endpoint.payload &&
              result.endpoint.payload.canonicalBaseUrl
            ) {
              const canonicalUrl = result.endpoint.payload.canonicalBaseUrl;
              if (canonicalUrl === `/c/${customName}`) {
                channelIdOrName = result.endpoint.payload.browseId;
                console.log(
                  "Found exact channel match for custom name:",
                  channelIdOrName
                );
                foundExactMatch = true;
                break;
              }
            }
          }

          // If no exact match, use the first result that has a browseId
          if (!foundExactMatch && searchResults.results[0]) {
            const firstResult = searchResults.results[0];
            if (
              firstResult.endpoint &&
              firstResult.endpoint.payload &&
              firstResult.endpoint.payload.browseId
            ) {
              channelIdOrName = firstResult.endpoint.payload.browseId;
              console.log(
                "Using first result channel ID for custom name:",
                channelIdOrName
              );
            }
          }

          // If still no match, use any result that has a browseId
          if (!channelIdOrName) {
            for (const result of searchResults.results) {
              if (
                result.endpoint &&
                result.endpoint.payload &&
                result.endpoint.payload.browseId
              ) {
                channelIdOrName = result.endpoint.payload.browseId;
                console.log("Using any available channel ID:", channelIdOrName);
                break;
              }
            }
          }
        }
      } catch (searchError) {
        console.error("Search error for custom name:", searchError);
        channelIdOrName = customName; // Fallback
      }
    } else if (getVideoId(url as string)) {
      // For video URLs, extract the channel ID from the video
      const videoId = getVideoId(url as string);
      if (videoId) {
        const info = await innertube.getBasicInfo(videoId);
        channelIdOrName = info.basic_info.channel_id;
        console.log("Extracted channel ID from video:", channelIdOrName);
      }
    }

    if (!channelIdOrName) {
      console.log("No channel ID or username extracted");
      res.status(400).json({ error: "Invalid YouTube channel URL" });
      return;
    }

    // Try to get channel info
    try {
      console.log("Attempting to get channel with:", channelIdOrName);
      channelInfo = await innertube.getChannel(channelIdOrName);
      console.log("Channel info retrieved successfully");
    } catch (error) {
      console.error("Channel lookup error:", error);
      res.status(400).json({ error: "Invalid YouTube channel URL" });
      return;
    }

    if (!channelInfo) {
      res.status(400).json({ error: "Invalid YouTube channel URL" });
      return;
    }

    const pfp = channelInfo.metadata?.avatar?.[0]?.url || null;

    if (!pfp) {
      res.status(404).json({ error: "Profile picture not found" });
      return;
    }

    res.json({ url: pfp });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch profile picture" });
  }
});

// Security Headers
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.removeHeader("X-Powered-By");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );
  next();
});

// Error handling middleware
app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Error:", error);
  res.status(500).json({ error: "Internal server error" });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Start server for local development
if (!isVercel) {
  // Start the server
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  // Handle unhandled promise rejections
  process.on("unhandledRejection", (err: Error) => {
    console.error("Unhandled Rejection:", err);
    server.close(() => process.exit(1));
  });

  // Handle uncaught exceptions
  process.on("uncaughtException", (err: Error) => {
    console.error("Uncaught Exception:", err);
    server.close(() => process.exit(1));
  });

  // Handle graceful shutdown
  process.on("SIGTERM", () => {
    console.log("SIGTERM received, shutting down gracefully");
    server.close(() => {
      console.log("Process terminated");
      process.exit(0);
    });
  });
}

// Export types for reuse
export type { VideoInfo, Thumbnail, Thumbnails };

// Export the app for Vercel
export default app;
