import { Chip } from "@mui/material";
// import { IconBasket } from "@tabler/icons-react";
import { useQuery } from "@apollo/client";
import { useState } from "react";
// import PageContainer from "src/components/container/PageContainer";
import { capitalize } from "lodash";
import PageContainer from "../../components/container/PageContainer";
import CustomTable from "../../components/widgets/CustomTable";
import { GET_PAYMENTS } from "../../graphql/admin";
import { numberFormat } from "../utilities/helpers";

const Payments = () => {
  const [openCreateTeaching, setOpenCreateTeaching] = useState(false);
  const [openVideoPlayer, setOpenVideoPlayer] = useState(false);
  const [openImageViewer, setOpenImageViewer] = useState(false);

  const [videoPlayerMetaData, setVidePlayerMetaData] = useState({
    title: "Video Player",
    address: "",
  });

  const { data, loading, refetch } = useQuery(GET_PAYMENTS);

  const columns = [
    {
      field: "fullname",
      headerName: "Payer Name",
      flex: 1,
      renderCell: ({ value, row }) => {
        return row?.first_name + " " + row?.last_name;
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1.2,
    },
    {
      field: "payment_method",
      headerName: "Payment Method",
      flex: 1,
    },
    {
      field: "reason",
      headerName: "reason",
      flex: 2,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      renderCell: ({ value, row }) => numberFormat(value) + " " + row.currency,
    },
    {
      field: "status",
      headerName: "Amount",
      flex: 1,
      renderCell: ({ value, row }) => (
        <Chip
          size="small"
          color={value === "COMPLETED" ? "success" : "warning"}
          label={capitalize(value)}
        />
      ),
    },
    // {
    //   field: "Actions",
    //   headerName: "Actions",
    //   flex: 1,
    //   renderCell: (param) => (
    //     <Stack direction={"row"}>
    //       {actions.map((action) => (
    //         <IconButton
    //           color={action?.color || "primary"}
    //           sx={{ fontSize: "2.75rem" }}
    //           onClick={() => action.onClick(param)}
    //         >
    //           {action.icon}
    //         </IconButton>
    //       ))}
    //     </Stack>
    //   ),
    // },
  ];

  return (
    <PageContainer title="Teachings" description="this is Teachings">
      <CustomTable
        columns={columns}
        rows={data?.payments}
        // onAddNew={() => setOpenCreateTeaching(true)}
        loading={loading}
      />

      {/* <VideoPlayer
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
      /> */}
    </PageContainer>
  );
};

export default Payments;
