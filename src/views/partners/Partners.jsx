import { Box, Chip, IconButton, Stack, Typography } from "@mui/material";
// import { IconBasket } from "@tabler/icons-react";
import { useQuery } from "@apollo/client";
import { useState } from "react";
// import PageContainer from "src/components/container/PageContainer";
import PageContainer from "../../components/container/PageContainer";
import CustomTable from "../../components/widgets/CustomTable";
import { GET_ALL_PARTNERS } from "../../graphql/partner";
import NewPartner from "./NewPartner";

const Partners = () => {
  const [openCreatePartner, setOpenCreatePartner] = useState(false);

  const { data, loading, refetch } = useQuery(GET_ALL_PARTNERS);

  const columns = [
    // {
    //   field: "picture",
    //   headerName: "Name",
    //   renderCell: ({value, row}) => (
    //     <Box
    //       component="img"
    //       src={value}
    //       alt={row.name}
    //       width={"auto"}
    //       height={80}
    //     />
    //   ),
    // },
    {
      field: "name",
      headerName: "Name",
      renderCell: ({ value, row }) => `${row.first_name} ${row.last_name}`,
    },
    {
      field: "phone",
      headerName: "Phone",
    },
    {
      field: "email",
      headerName: "Email",
      // renderCell: ({value}) =>
      //   value
      //     ?.split('"')
      //     ?.filter((item) => item !== "")
      //     ?.map((item) => <Chip size="small" key={item} label={item} />),
    },
    {
      field: "createdAt",
      headerName: "Registered On",
      renderCell: ({ value }) => new Date(value).toLocaleDateString(),
    },
    // {
    //   field: "package",
    //   headerName: "Package",
    // },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: () => {
        return (
          <Stack direction="row" spacing={1}>
            {/* <IconButton
              size="small"
              color="primary"
              onClick={() => setOpenCreatePartner(true)}
            >
              <IconView360 />
            </IconButton> */}
            <IconButton
              size="small"
              color="primary"
              onClick={() => setOpenCreatePartner(true)}
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
    <PageContainer title="Partners" description="this is Partners">
      <>
        <CustomTable
          columns={columns}
          rows={data?.getPartners}
          onAddNew={() => setOpenCreatePartner(true)}
          loading={loading}
        />
      </>

      <NewPartner
        open={openCreatePartner}
        onClose={() => setOpenCreatePartner(false)}
        refetch={refetch}
      />
    </PageContainer>
  );
};

export default Partners;
