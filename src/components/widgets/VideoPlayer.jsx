import { Box } from "@mui/material";
import CustomModal from "./CustomModal";

export default function VideoPlayer({ title, address, youtube, ...props }) {
  return (
    <CustomModal {...props} title={title || "Video Player"}>
      <Box
        height="65vh"
        width={"100%"}
        display={"flex"}
        justifyContent="center"
        overflow={"hidden"}
      >
        {youtube ? (
          <iframe
            width="853"
            height="480"
            src={convertToYouTubeEmbed(address)}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        ) : (
          <Box
            component={"video"}
            width={"100%"}
            controls
            sx={{ boxShadow: "2px 3px 4px solid #ccc" }}
          >
            <source src={address} type="video/mp4" />
            Your browser does not support the video tag.
          </Box>
        )}
      </Box>
    </CustomModal>
  );
}

function convertToYouTubeEmbed(url) {
  try {
    const parsedUrl = new URL(url);
    let videoId = null;

    // Handle youtu.be short links
    if (parsedUrl.hostname === "youtu.be") {
      videoId = parsedUrl.pathname.slice(1); // Remove leading "/"
    }

    // Handle youtube.com/watch links
    if (
      parsedUrl.hostname.includes("youtube.com") &&
      parsedUrl.pathname === "/watch"
    ) {
      videoId = parsedUrl.searchParams.get("v");
    }

    if (videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return url; // Return original if not a valid YouTube format
  } catch (e) {
    return url; // Return original if URL parsing fails
  }
}
