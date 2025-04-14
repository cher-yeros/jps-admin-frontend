import { useQuery } from "@apollo/client";
import { Add, Delete, Edit, Launch } from "@mui/icons-material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PageContainer from "../../components/container/PageContainer";
import CustomTable from "../../components/widgets/CustomTable";
import { GET_VISITOR_PRAYERS } from "../../graphql/visitor";

export default function VisitorPrayerApplications() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const { data, loading, refetch } = useQuery(GET_VISITOR_PRAYERS);

  const actions = [
    {
      icon: <Launch />,
      onClick: () => {},
      color: "primary",
    },
    {
      icon: <Edit />,
      onClick: () => {},
      color: "success",
    },
    {
      icon: <Delete />,
      onClick: () => {},
      color: "error",
    },
  ];

  const columns = [
    {
      field: "first_name",
      headerName: "First Name",
      flex: 1,
    },
    {
      field: "last_name",
      headerName: "Last Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: ({ value }) => new Date(value).toLocaleDateString(),
    },
    {
      field: "address",
      headerName: "Address",
      flex: 2,
    },
    {
      field: "request_detail",
      headerName: "Request Detail",
      flex: 2,
    },
    // {
    //   field: "Actions",
    //   headerName: "Actions",
    //   width: 150,
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

  const toolbars = [
    {
      label: "Add New",
      icon: <Add />,
      onClick: () => setOpen(true),
    },
  ];

  return (
    <PageContainer
      title={t("Visitor Prayer Applications")}
      description="this is Visitor Prayer Applications"
    >
      <CustomTable
        toolbars={toolbars}
        columns={columns}
        rows={data?.Visitors || []}
        loading={loading}
      />{" "}
    </PageContainer>
  );
}
