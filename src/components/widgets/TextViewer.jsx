import { Box, Typography } from "@mui/material";
import CustomModal from "./CustomModal";

export default function TextViewer({ title, content, ...props }) {
  return (
    <CustomModal {...props} title={title || content?.substring(0, 20) + "..."}>
      <Box
        height="65vh"
        width={"100%"}
        display={"flex"}
        justifyContent="center"
        sx={{ boxShadow: "2px 3px 4px solid #ccc" }}
      >
        <Typography>{content}</Typography>
      </Box>
    </CustomModal>
  );
}
