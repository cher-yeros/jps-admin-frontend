import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { Box } from "@mui/material";

const PageContainer = ({ title, description, children }) => (
  <Box height={"calc(100vh - 80px)"}>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
    {children}
  </Box>
);

PageContainer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
};

export default PageContainer;
