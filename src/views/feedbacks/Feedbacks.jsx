import { useQuery } from "@apollo/client";
import { Add, Delete, Edit, Launch } from "@mui/icons-material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomTable from "../../components/widgets/CustomTable";
import { GET_FEEDBACKS } from "../../graphql/admin";
import PageContainer from "../../components/container/PageContainer";

export default function Feedbacks() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const { data, loading, refetch } = useQuery(GET_FEEDBACKS);

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
      field: "name",
      headerName: "Name",
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
      field: "subject",
      headerName: "Subject",
      flex: 1,
    },
    {
      field: "message",
      headerName: "Message",
      flex: 1,
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

  const toolbars = [
    {
      label: "Add New",
      icon: <Add />,
      onClick: () => setOpen(true),
    },
  ];

  return (
    <PageContainer title={t("feedbacks")} description="Feedbacks">
      <CustomTable
        columns={columns}
        rows={data?.feedbacks || []}
        loading={loading}
      />{" "}
    </PageContainer>
  );
}
