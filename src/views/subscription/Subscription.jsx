import { Chip, IconButton, Stack, Typography } from "@mui/material";
// import { IconBasket } from "@tabler/icons-react";
import { useQuery } from "@apollo/client";
import { useState } from "react";
// import PageContainer from "src/components/container/PageContainer";
import { IconEye } from "@tabler/icons-react";
import PageContainer from "../../components/container/PageContainer";
import CustomTable from "../../components/widgets/CustomTable";
import ImageViewer from "../../components/widgets/ImageViewer";
import VideoPlayer from "../../components/widgets/VideoPlayer";
import { GET_ALL_TEACHING_SUBSCRIPTIONS } from "../../graphql/teaching";

const Subscription = () => {
  const [openCreateTeaching, setOpenCreateTeaching] = useState(false);
  const [openVideoPlayer, setOpenVideoPlayer] = useState(false);
  const [openImageViewer, setOpenImageViewer] = useState(false);

  const [videoPlayerMetaData, setVidePlayerMetaData] = useState({
    title: "Video Player",
    address: "",
  });

  const { data, loading, refetch } = useQuery(GET_ALL_TEACHING_SUBSCRIPTIONS);

  const columns = [
    // {
    //   field: "picture",
    //   headerName: "Thumbnail",
    //   renderCell: (value, row) => (
    //     <IconButton
    //       color="primary"
    //       onClick={() => {
    //         setVidePlayerMetaData({
    //           title: row?.name,
    //           address: value,
    //         });

    //         setOpenImageViewer(true);
    //       }}
    //     >
    //       <IconEye />
    //     </IconButton>
    //   ),
    // },

    {
      field: "name",
      headerName: "Name",
      renderCell: (value, row) =>
        `${row.user?.first_name} ${row.user?.last_name}`,
    },
    {
      field: "phone",
      headerName: "Phone",
      renderCell: (value, row) => row?.user?.phone,
    },
    {
      field: "email",
      headerName: "Email",
      renderCell: (value, row) => row?.user?.email,
      // renderCell: (value) =>
      //   value
      //     ?.split('"')
      //     ?.filter((item) => item !== "")
      //     ?.map((item) => <Chip size="small" key={item} label={item} />),
    },
    {
      field: "package_name",
      headerName: "Package",
      renderCell: (value, row) => row?.package?.name,
    },
    {
      field: "paid_amoung",
      headerName: "Amount",
      renderCell: (value, row) =>
        row?.payment?.amount + " " + row?.payment?.currency,
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: (value) => (
        <Chip size="small" label={value} color="warning" />
      ),
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
            {/* <IconButton
              color="primary"
              size="small"
              onClick={() => setOpenCreateTeaching(true)}
            >
              <Typography variant="subtitle2">Edit</Typography>
            </IconButton> */}
            <IconButton size="small" color="error">
              <Typography variant="subtitle2">Cancel</Typography>
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
        rows={data?.getTeachingSubscriptions}
        // onAddNew={() => setOpenCreateTeaching(true)}
        loading={loading}
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

export default Subscription;
