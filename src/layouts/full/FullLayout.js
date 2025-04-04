import { Box, Container, styled } from "@mui/material";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  height: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
  border: 2,
  borderColor: "blue",
}));

const FullLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const { token } = useSelector((state) => state.auth);

  return token ? (
    <MainWrapper className="mainwrapper">
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper className="page-wrapper" sx={{ height: "100%" }}>
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        <Header
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          toggleMobileSidebar={() => setMobileSidebarOpen(true)}
        />
        {/* ------------------------------------------- */}
        {/* PageContent */}
        {/* ------------------------------------------- */}
        <Container
          sx={{
            // paddingTop: "20px",
            maxWidth: "1200px",
            height: "calc(100% - 0px)",
          }}
        >
          {/* ------------------------------------------- */}
          {/* Page Route */}
          {/* ------------------------------------------- */}
          <Box sx={{ minHeight: "calc(100% - 0px)" }}>
            <Outlet />
          </Box>

          {/* ------------------------------------------- */}
          {/* End Page */}
          {/* ------------------------------------------- */}
        </Container>
        {/* <Box sx={{ pt: 6, pb: 3, display: "flex", justifyContent: "center" }}>
          <Typography>
            © 2025 All rights reserved by
            <Link target="_blank" href="https://www.adminmart.com">
              <span>AdminMart.com</span>
            </Link>
          </Typography>

          <Typography>
            .Distributed by
            <Link target="_blank" href="https://themewagon.com">
              <span>ThemeWagon</span>
            </Link>
          </Typography>
        </Box> */}
      </PageWrapper>
    </MainWrapper>
  ) : (
    <Navigate to="/auth/login" />
  );
};

export default FullLayout;
