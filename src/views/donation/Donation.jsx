import { Chip } from "@mui/material";
// import { IconBasket } from "@tabler/icons-react";
import { useQuery } from "@apollo/client";
// import PageContainer from "src/components/container/PageContainer";
import { capitalize } from "lodash";
import PageContainer from "../../components/container/PageContainer";
import CustomTable from "../../components/widgets/CustomTable";
import { GET_PAYMENTS } from "../../graphql/admin";
import { numberFormat } from "../utilities/helpers";
import { GET_DONATIONS } from "../../graphql/donation";

const Payments = () => {
  //   const [openCreateTeaching, setOpenCreateTeaching] = useState(false);
  //   const [openVideoPlayer, setOpenVideoPlayer] = useState(false);
  //   const [openImageViewer, setOpenImageViewer] = useState(false);

  //   const [videoPlayerMetaData, setVidePlayerMetaData] = useState({
  //     title: "Video Player",
  //     address: "",
  //   });

  const { data, loading, refetch } = useQuery(GET_DONATIONS);

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
      field: "createdAt",
      headerName: "Date",
      flex: 2,
      renderCell: ({ value }) => new Date(value).toLocaleDateString(),
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      renderCell: ({ value, row }) => numberFormat(value) + " " + row.currency,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ value, row }) => (
        <Chip
          size="small"
          color={value === "COMPLETED" ? "success" : "warning"}
          label={capitalize(row?.paymnet?.status)}
        />
      ),
    },
  ];

  return (
    <PageContainer title="Teachings" description="this is Teachings">
      <CustomTable
        columns={columns}
        rows={data?.allDonations}
        loading={loading}
      />
    </PageContainer>
  );
};

export default Payments;
