import { Box } from "@mui/material";
import CustomModal from "./CustomModal";

export default function VideoPlayer({ title, address, ...props }) {
  return (
    <CustomModal {...props} title={title || "Video Player"}>
      <Box
        height="65vh"
        width={"100%"}
        display={"flex"}
        justifyContent="center"
        overflow={"hidden"}
      >
        <Box
          component={"video"}
          //   height="100%"
          width={"100%"}
          controls
          sx={{ boxShadow: "2px 3px 4px solid #ccc" }}
        >
          {/* <source src={address} type="video/mp4" /> */}
          Your browser does not support the video tag.
        </Box>
      </Box>
    </CustomModal>
  );
}
