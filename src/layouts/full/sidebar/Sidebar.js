import { useMediaQuery, Box, Drawer } from "@mui/material";
import SidebarItems from "./SidebarItems";
import { Upgrade } from "./Updrade";
import { Sidebar, Logo } from "react-mui-sidebar";
import logo from "../../../assets/images/logos/dark1-logo.svg";

const MSidebar = ({
  isSidebarOpen,
  isMobileSidebarOpen,
  onSidebarClose,
  ...props
}) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const sidebarWidth = "270px";

  // Custom CSS for short scrollbar
  const scrollbarStyles = {
    "&::-webkit-scrollbar": {
      width: "7px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#eff2f7",
      borderRadius: "15px",
    },
  };

  if (lgUp) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              boxSizing: "border-box",
              ...scrollbarStyles,
            },
          }}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar Box */}
          {/* ------------------------------------------- */}
          <Box
            sx={{
              height: "100%",
              "& img": {
                height: "2rem",
                width: "auto",
              },
            }}
          >
            <Sidebar
              width={"270px"}
              collapsewidth="80px"
              open={isSidebarOpen}
              themeColor="#5d87ff"
              themeSecondaryColor="#49beff"
              showProfile={false}
            >
              {/* ------------------------------------------- */}
              {/* Logo */}
              {/* ------------------------------------------- */}
              <Logo img={logo} />
              <Box>{/* <img alt="logo" src={logo} /> */}</Box>
              <Box>
                {/* ------------------------------------------- */}
                {/* Sidebar Items */}
                {/* ------------------------------------------- */}
                <SidebarItems />
              </Box>
            </Sidebar>
          </Box>
        </Drawer>
      </Box>
    );
  }
  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          boxShadow: (theme) => theme.shadows[8],
          ...scrollbarStyles,
        },
      }}
    >
      <Sidebar
        width={"270px"}
        collapsewidth="80px"
        isCollapse={false}
        mode="light"
        direction="ltr"
        themeColor="#5d87ff"
        themeSecondaryColor="#49beff"
        showProfile={false}
      >
        {/* ------------------------------------------- */}
        {/* Logo */}
        {/* ------------------------------------------- */}

        <Logo img={logo} />

        {/* ------------------------------------------- */}
        {/* Sidebar For Mobile */}
        {/* ------------------------------------------- */}
        <SidebarItems />
        <Upgrade />
      </Sidebar>
    </Drawer>
  );
};
export default MSidebar;
