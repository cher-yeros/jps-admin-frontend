import { IconButton, Stack, Typography } from "@mui/material";
// import { IconBasket } from "@tabler/icons-react";
import { useQuery } from "@apollo/client";
import { useState } from "react";
// import PageContainer from "src/components/container/PageContainer";
import { IconEye } from "@tabler/icons-react";
import PageContainer from "../../components/container/PageContainer";
import CustomTable from "../../components/widgets/CustomTable";
import ImageViewer from "../../components/widgets/ImageViewer";
import VideoPlayer from "../../components/widgets/VideoPlayer";
import { GET_ALL_TEACHINGS } from "../../graphql/teaching";
import NewTeaching from "./NewTeaching";

const Teaching = () => {
  const [openCreateTeaching, setOpenCreateTeaching] = useState(false);
  const [openVideoPlayer, setOpenVideoPlayer] = useState(false);
  const [openImageViewer, setOpenImageViewer] = useState(false);

  const [videoPlayerMetaData, setVidePlayerMetaData] = useState({
    title: "Video Player",
    address: "",
  });

  const { data, loading, refetch } = useQuery(GET_ALL_TEACHINGS);

  const columns = [
    {
      field: "picture",
      headerName: "Thumbnail",
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
      field: "title",
      headerName: "Title",
    },
    {
      field: "trailer",
      headerName: "Trailer",
      renderCell: (value) => (
        <IconButton
          color="primary"
          onClick={() => {
            setVidePlayerMetaData({
              title: "Trailer",
              address: value,
            });

            setOpenVideoPlayer(true);
          }}
        >
          <IconEye />
        </IconButton>
      ),
    },
    {
      field: "file_url",
      headerName: "Teaching",
      renderCell: (value) => (
        <IconButton
          color="primary"
          onClick={() => {
            setVidePlayerMetaData({
              title: "Teaching",
              address: value,
            });

            setOpenVideoPlayer(true);
          }}
        >
          <IconEye />
        </IconButton>
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
              color="primary"
              size="small"
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
      <VideoPlayer
        {...videoPlayerMetaData}
        open={openVideoPlayer}
        onClose={() => setOpenVideoPlayer(false)}
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

export default Teaching;
