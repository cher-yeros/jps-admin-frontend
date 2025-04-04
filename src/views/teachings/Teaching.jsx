import {
  Box,
  Card,
  CardContent,
  Chip,
  Fab,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
// import { IconBasket } from "@tabler/icons-react";
import { useQuery } from "@apollo/client";
import { useState } from "react";
// import PageContainer from "src/components/container/PageContainer";
import PageContainer from "../../components/container/PageContainer";
import CustomTable from "../../components/widgets/CustomTable";
import NewTeaching from "./NewTeaching";
import { GET_ALL_TEACHINGS } from "../../graphql/teaching";

const Teaching = () => {
  const [openCreateTeaching, setOpenCreateTeaching] = useState(false);

  const { data, loading, refetch } = useQuery(GET_ALL_TEACHINGS);

  const columns = [
    {
      field: "picture",
      headerName: "Thumbnail",
      renderCell: (value, row) => (
        <Box
          component="img"
          src={value}
          alt={row.name}
          width={"auto"}
          height={80}
        />
      ),
    },
    {
      field: "title",
      headerName: "Title",
    },
    {
      field: "trailer",
      headerName: "Trailer",
      renderCell: (value) => (
        <Box
          component={"video"}
          width="100%"
          controls
          sx={{ boxShadow: "2px 3px 4px solid #ccc" }}
        >
          <source src={value} type="video/mp4" />
          Your browser does not support the video tag.
        </Box>
      ),
    },
    {
      field: "file_url",
      headerName: "Teaching",
      renderCell: (value) => (
        <Box
          component={"video"}
          width="100%"
          controls
          sx={{ boxShadow: "2px 3px 4px solid #ccc" }}
        >
          <source src={value} type="video/mp4" />
          Your browser does not support the video tag.
        </Box>
      ),
    },
    // {
    //   field: "description",
    //   headerName: "Description",
    // },
    // {
    //   field: "features",
    //   headerName: "Features",
    //   renderCell: (value) =>
    //     value
    //       ?.split('"')
    //       ?.filter((item) => item !== "")
    //       ?.map((item) => <Chip size="small" key={item} label={item} />),
    // },
    {
      field: "price_etb",
      headerName: "Price (ETB)",
    },
    {
      field: "price_usd",
      headerName: "Price (USD)",
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: () => {
        return (
          <Stack direction="row" spacing={1}>
            {/* <IconButton
              size="small"
              color="primary"
              onClick={() => setOpenCreateTeaching(true)}
            >
              <IconView360 />
            </IconButton> */}
            <IconButton
              size="small"
              color="primary"
              onClick={() => setOpenCreateTeaching(true)}
            >
              <Typography variant="subtitle2">Edit</Typography>
            </IconButton>
            <IconButton size="small" color="error">
              <Typography variant="subtitle2">Delete</Typography>
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  return (
    <PageContainer title="Teachings" description="this is Teachings">
      <CustomTable
        columns={columns}
        rows={data?.getAllTeachings}
        onAddNew={() => setOpenCreateTeaching(true)}
        loading={loading}
      />

      <NewTeaching
        open={openCreateTeaching}
        onClose={() => setOpenCreateTeaching(false)}
        refetch={refetch}
      />
    </PageContainer>
  );
};

export default Teaching;
