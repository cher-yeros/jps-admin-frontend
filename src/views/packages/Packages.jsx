import { Chip, IconButton, Stack, Typography } from "@mui/material";
// import { IconBasket } from "@tabler/icons-react";
import { useQuery } from "@apollo/client";
import { useState } from "react";
// import PageContainer from "src/components/container/PageContainer";
import { IconEye } from "@tabler/icons-react";
import PageContainer from "../../components/container/PageContainer";
import CustomTable from "../../components/widgets/CustomTable";
import ImageViewer from "../../components/widgets/ImageViewer";
import { GET_ALL_PACKAGES } from "../../graphql/package";
import NewPackage from "./NewPackage";

const Packages = () => {
  const [openCreatePackage, setOpenCreatePackage] = useState(false);

  // const [openVideoPlayer, setOpenVideoPlayer] = useState(false);
  const [openImageViewer, setOpenImageViewer] = useState(false);

  const [videoPlayerMetaData, setVidePlayerMetaData] = useState({
    title: "Video Player",
    address: "",
  });

  const { data, loading, refetch } = useQuery(GET_ALL_PACKAGES);

  const columns = [
    {
      field: "picture",
      headerName: "Picture",
      renderCell: (value, row) => (
        <IconButton
          color="primary"
          onClick={() => {
            setVidePlayerMetaData({
              title: row?.name,
              address: value,
            });

            setOpenImageViewer(true);
          }}
        >
          <IconEye />
        </IconButton>
      ),
    },
    {
      field: "name",
      headerName: "Name",
    },
    {
      field: "description",
      headerName: "Description",
    },
    {
      field: "features",
      headerName: "Features",
      renderCell: (value) =>
        value
          ?.split('"')
          ?.filter((item) => item !== "")
          ?.map((item) => <Chip size="small" key={item} label={item} />),
    },
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
              onClick={() => setOpenCreatePackage(true)}
            >
              <IconView360 />
            </IconButton> */}
            <IconButton
              size="small"
              color="primary"
              onClick={() => setOpenCreatePackage(true)}
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
    <PageContainer title="Packages" description="this is Packages">
      <>
        <CustomTable
          columns={columns}
          rows={data?.getPackages}
          onAddNew={() => setOpenCreatePackage(true)}
          loading={loading}
        />
      </>

      <NewPackage
        open={openCreatePackage}
        onClose={() => setOpenCreatePackage(false)}
        refetch={refetch}
      />

      <ImageViewer
        {...videoPlayerMetaData}
        open={openImageViewer}
        onClose={() => setOpenImageViewer(false)}
        refetch={refetch}
      />
    </PageContainer>
  );
};

export default Packages;
