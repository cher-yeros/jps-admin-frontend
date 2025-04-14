import { Box, Chip, IconButton, Stack, Typography } from "@mui/material";
// import { IconBasket } from "@tabler/icons-react";
import { useQuery } from "@apollo/client";
import { useState } from "react";
// import PageContainer from "src/components/container/PageContainer";
import PageContainer from "../../components/container/PageContainer";
import CustomTable from "../../components/widgets/CustomTable";
import NewTeachingCategory from "./NewTeachingCategory";
import { GET_ALL_TEACHING_CATEOGORYS } from "../../graphql/teaching";

const TeachingCategorys = () => {
  const [openCreateTeachingCategory, setOpenCreateTeachingCategory] =
    useState(false);

  const { data, loading, refetch } = useQuery(GET_ALL_TEACHING_CATEOGORYS);

  const columns = [
    {
      field: "picture",
      headerName: "Picture",
      renderCell: ({ value, row }) => (
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
      headerName: "Name",
    },
    {
      field: "description",
      headerName: "Description",
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
              onClick={() => setOpenCreateTeachingCategory(true)}
            >
              <IconView360 />
            </IconButton> */}
            <IconButton
              size="small"
              color="primary"
              onClick={() => setOpenCreateTeachingCategory(true)}
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
    <PageContainer
      title="Teaching Category"
      decription="this is Teaching Category"
    >
      <CustomTable
        columns={columns}
        rows={data?.getTeachingCategories}
        onAddNew={() => setOpenCreateTeachingCategory(true)}
        loading={loading}
      />

      <NewTeachingCategory
        open={openCreateTeachingCategory}
        onClose={() => setOpenCreateTeachingCategory(false)}
        refetch={refetch}
      />
    </PageContainer>
  );
};

export default TeachingCategorys;
