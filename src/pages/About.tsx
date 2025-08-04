import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";
import {
  Image as ImageIcon,
  Audiotrack as AudiotrackIcon,
  AccountCircle as AccountCircleIcon,
  Title as TitleIcon,
  Comment as CommentIcon,
  Wallpaper as WallpaperIcon,
} from "@mui/icons-material";

const About = () => {
  const theme = useTheme();
  const features = [
    {
      icon: (
        <ImageIcon
          sx={{
            fontSize: 40,
            color: "primary.main",
            position: "relative",
            zIndex: 1,
          }}
        />
      ),
      title: "Download Thumbnails",
      description:
        "Get high-quality thumbnails from any YouTube video in various resolutions with just one click.",
    },
    {
      icon: (
        <AudiotrackIcon
          sx={{
            fontSize: 40,
            color: "primary.main",
            position: "relative",
            zIndex: 1,
          }}
        />
      ),
      title: "Extract Audio",
      description:
        "Convert YouTube videos to MP3 or other audio formats quickly and easily.",
    },
    {
      icon: (
        <AccountCircleIcon
          sx={{
            fontSize: 40,
            color: "primary.main",
            position: "relative",
            zIndex: 1,
          }}
        />
      ),
      title: "Get Channel Info",
      description:
        "View and download channel profile pictures and access channel information instantly.",
    },
    {
      icon: (
        <TitleIcon
          sx={{
            fontSize: 40,
            color: "primary.main",
            position: "relative",
            zIndex: 1,
          }}
        />
      ),
      title: "Extract Video Titles",
      description:
        "Quickly get the title of any YouTube video without watching the full content.",
    },
    {
      icon: (
        <CommentIcon
          sx={{
            fontSize: 40,
            color: "primary.main",
            position: "relative",
            zIndex: 1,
          }}
        />
      ),
      title: "Comments Extractor",
      description:
        "Get full video comments from any YouTube video.",
    },
    {
      icon: (
        <WallpaperIcon
          sx={{
            fontSize: 40,
            color: "primary.main",
            position: "relative",
            zIndex: 1,
          }}
        />
      ),
      title: "Download Banners",
      description:
        "Get high-quality channel banner images from any YouTube channel.",
    },

  ];

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        {/* Recoil Counter Demo */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            Recoil Counter Demo
          </Typography>

        </Box>

        {/* Hero Section */}
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 6, md: 8 },
            px: { xs: 2, sm: 0 },
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 800,
              mb: 3,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              lineHeight: 1.2,
            }}
          >
            About YT ToolBox
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: "800px",
              mx: "auto",
              fontSize: { xs: "1rem", sm: "1.1rem" },
              lineHeight: 1.6,
            }}
          >
            YT ToolBox is your one-stop solution for downloading YouTube
            content. Get thumbnails, audio, video info, and channel details
            quickly and easily - all for free and without any watermarks.
          </Typography>
        </Box>

        {/* Mission Section */}
        <Box sx={{ mb: { xs: 8, md: 10 } }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 3,
              textAlign: "center",
              position: "relative",
              "&:after": {
                content: '""',
                display: "block",
                width: "80px",
                height: "4px",
                background: theme.palette.primary.main,
                margin: "16px auto 0",
                borderRadius: "2px",
              },
            }}
          >
            Our Features
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: "800px",
              mx: "auto",
              textAlign: "center",
              fontSize: "1.1rem",
              lineHeight: 1.8,
              color: "text.secondary",
              px: { xs: 2, sm: 0 },
            }}
          >
            We believe that every creator should have access to
            professional-grade tools regardless of their channel size. Our
            mission is to democratize content creation by providing affordable,
            easy-to-use tools that help you understand your audience, optimize
            your content, and grow your channel.
          </Typography>
        </Box>

        {/* Features Grid */}
        <Box sx={{ mb: { xs: 8, md: 10 } }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 3,
              maxWidth: "1200px",
              mx: "auto",
            }}
          >
            {features.map((feature, index) => (
              <Box key={index} sx={{ display: "flex" }}>
                <Card
                  sx={{
                    width: "100%",
                    borderRadius: 2,
                    boxShadow: 1,
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 4,
                    },
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent
                    sx={{
                      p: 4,
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        bgcolor: "primary.50",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 3,
                        "& .MuiSvgIcon-root": {
                          color: "primary.main",
                          fontSize: "2.5rem",
                        },
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{ mb: 2, fontWeight: 600 }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Story Section */}
        <Box>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 6,
              textAlign: "center",
              position: "relative",
              "&:after": {
                content: '""',
                display: "block",
                width: "80px",
                height: "4px",
                background: theme.palette.primary.main,
                margin: "16px auto 0",
                borderRadius: "2px",
              },
            }}
          >
            Why Choose Us
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 4,
              alignItems: "center",
              mt: 6,
            }}
          >
            <Box>
              <Typography
                variant="body1"
                sx={{ mb: 3, lineHeight: 1.8, color: "text.secondary" }}
              >
                YT ToolBox was created to provide a simple, fast, and free way
                to access YouTube content. Whether you need to download
                thumbnails, extract audio, or get channel information, our tools
                are designed to be intuitive and efficient. We believe in making
                content accessible to everyone without any unnecessary
                complications.
              </Typography>
              <Typography
                variant="body1"
                sx={{ lineHeight: 1.8, color: "text.secondary" }}
              >
                Our platform is completely free to use with no hidden fees or
                watermarks. We're constantly improving our tools and adding new
                features based on user feedback. Your experience is our top
                priority, and we're committed to providing the best YouTube
                downloading service available.
              </Typography>
            </Box>
            <Box>
              <Box
                sx={{
                  height: "300px",
                  borderRadius: 2,
                  background: `linear-gradient(45deg, ${theme.palette.primary.light}30, ${theme.palette.primary.main}30)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 4,
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" color="primary">
                  Empowering Creators Worldwide
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
