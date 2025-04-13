import { Box } from "@mui/material";
import CustomModal from "./CustomModal";

export default function ImageViewer({ title, address, ...props }) {
  return (
    <CustomModal {...props} title={title || "Image Viewer"}>
      <Box
        height="65vh"
        width={"100%"}
        display={"flex"}
        justifyContent="center"
        sx={{ boxShadow: "2px 3px 4px solid #ccc" }}
      >
        <img height="100%" width={"auto"} src={address} alt={title} />
      </Box>
    </CustomModal>
  );
}
