import { useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Add, Delete, Edit, Launch } from "@mui/icons-material";
import { Chip } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import PageContainer from "../../components/container/PageContainer";
import CustomTable from "../../components/widgets/CustomTable";
import { numberFormat } from "../../utils/misc";
import { GET_PAYMENTS } from "../graphql/admin";

export default function Payments() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const { data, loading, refetch } = useQuery(GET_PAYMENTS);

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
      field: "fullname",
      headerName: "Payer Name",
      flex: 1,
      renderCell: ({ row }) => {
        return row.first_name + " " + row.last_name;
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
      renderCell: ({ value, row }) =>
        numberFormat(value) +
        " " +
        (row.payment_method === "Paypal" ? "USD" : "ETB"),
    },
    {
      field: "status",
      headerName: "Amount",
      flex: 1,
      renderCell: ({ value, row }) => (
        <Chip
          size="small"
          color={value === "COMPLETED" ? "success" : "warning"}
          label={value}
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

  const toolbars = [
    {
      label: "Add New",
      icon: <Add />,
      onClick: () => setOpen(true),
    },
  ];

  return (
    <PageContainer title="Blogs" description="this is Blogs">
      <CustomTable
        onAddNew={() => setOpen(true)}
        columns={columns}
        rows={data?.payments || []}
        loading={loading}
      />
    </PageContainer>
  );
}

const validator = yupResolver(
  Yup.object().shape({
    title: Yup.string().required("Title is required!"),
    excerpt: Yup.string().required("excerpt is required!"),
    body: Yup.string().required("Body is required!"),
  })
);
