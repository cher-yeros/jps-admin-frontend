import {
  Button,
  CardContent,
  Fab,
  Grid,
  Rating,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
// import { IconBasket } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import PageContainer from "src/components/container/PageContainer";
import BlankCard from "../../components/shared/BlankCard";
import { ecoCard } from "../dashboard/components/Blog";
import { useState } from "react";
import NewPackage from "./NewPackage";

const Packages = () => {
  const [openCreatePackage, setOpenCreatePackage] = useState(false);

  return (
    <PageContainer title="Packages" description="this is Packages">
      <Button variant="contained" onClick={() => setOpenCreatePackage(true)}>
        Add New Package
      </Button>

      <Grid container spacing={3}>
        {ecoCard.map((product, index) => (
          <Grid item sm={12} md={4} lg={3} key={index}>
            <BlankCard>
              <Typography component={Link} to="/">
                <img src={product.photo} alt="img" width="100%" />
              </Typography>
              <Tooltip title="Add To Cart">
                <Fab
                  size="small"
                  color="primary"
                  sx={{ bottom: "75px", right: "15px", position: "absolute" }}
                >
                  {/* <IconBasket size="16" /> */}
                </Fab>
              </Tooltip>
              <CardContent sx={{ p: 3, pt: 2 }}>
                <Typography variant="h6">{product.title}</Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  mt={1}
                >
                  <Stack direction="row" alignItems="center">
                    <Typography variant="h6">${product.price}</Typography>
                    <Typography
                      color="textSecondary"
                      ml={1}
                      sx={{ textDecoration: "line-through" }}
                    >
                      ${product.salesPrice}
                    </Typography>
                  </Stack>
                  <Rating
                    name="read-only"
                    size="small"
                    value={product.rating}
                    readOnly
                  />
                </Stack>
              </CardContent>
            </BlankCard>
          </Grid>
        ))}
      </Grid>

      <NewPackage
        open={openCreatePackage}
        onClose={() => setOpenCreatePackage(false)}
      />
    </PageContainer>
  );
};

export default Packages;
