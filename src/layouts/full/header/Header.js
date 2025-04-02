import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import PropTypes from "prop-types";

// components
import { IconBellRinging, IconMenu } from "@tabler/icons-react";
import { useLocation } from "react-router";
import Profile from "./Profile";

const Header = (props) => {
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const location = useLocation();

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up("lg")]: {
      minHeight: "70px",
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>

        <Stack>
          <Typography variant="h4">
            {capitalize(location.pathname?.split("/").pop())}
          </Typography>
          <Typography>
            {/* <Breadcrumbs aria-label="breadcrumb">
              {location.pathname
                .split("/")
                .slice(1)
                .map((path, i) => (
                  // <li
                  //   key={i}
                  //   className={`breadcrumb-item  ${
                  //     i + 1 === location.pathname.split("/").slice(1).length &&
                  //     "active"
                  //   }`}
                  //   style={{ textTransform: "capitalize", cursor: "pointer" }}
                  // >
                  <Link key={path} to={i === 2 ? `${path}` : `${path}`}>
                    {capitalize(path.replaceAll("-", " "))}
                  </Link
                  // {/* </li> 
                ))}
            </Breadcrumbs> */}
          </Typography>
        </Stack>

        <Box flexGrow={1} />
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
        >
          <Badge variant="dot" color="primary">
            <IconBellRinging size="21" stroke="1.5" />
          </Badge>
        </IconButton>
        <Stack spacing={1} direction="row" alignItems="center">
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;

export function capitalize(str) {
  const arr = str.split(" ");

  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }

  const str2 = arr.join(" ");

  return str2;
}
