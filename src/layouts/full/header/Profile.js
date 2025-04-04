import {
  Avatar,
  Box,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { IconListCheck, IconMail, IconUser } from "@tabler/icons-react";

import { useDispatch, useSelector } from "react-redux";
import ProfileImg from "src/assets/images/profile/user-1.jpg";
import { logoutFinished } from "../../../redux/slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state?.auth);

  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <Box>
      <Typography display={"inline"} fontWeight={"bold"}>
        {currentUser?.first_name} {currentUser?.last_name}
      </Typography>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={ProfileImg}
          alt={ProfileImg}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>

      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconMail width={20} />
          </ListItemIcon>
          <ListItemText>My Account</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconListCheck width={20} />
          </ListItemIcon>
          <ListItemText>My Tasks</ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button
            // to="/auth/login"
            variant="outlined"
            color="primary"
            // component={Link}
            fullWidth
            onClick={() => {
              dispatch(logoutFinished());

              navigate("/auth/login");
            }}
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
