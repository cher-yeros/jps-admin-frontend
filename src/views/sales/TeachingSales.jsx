import { useQuery } from "@apollo/client";
import { Chip, IconButton } from "@mui/material";
import { IconEye } from "@tabler/icons-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PageContainer from "../../components/container/PageContainer";
import CustomTable from "../../components/widgets/CustomTable";
import TextViewer from "../../components/widgets/TextViewer";
import { GET_TEACHING_SALES } from "../../graphql/sales";
import { numberFormat } from "../utilities/helpers";

export default function TeachingSales() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const [openCreateTeaching, setOpenCreateTeaching] = useState(false);
  const [openVideoPlayer, setOpenVideoPlayer] = useState(false);
  const [openTextViewer, setOpenTextViewer] = useState(false);

  const [viewerMetaData, setViewerMetaData] = useState({
    title: "",
    address: "",
  });

  const { data, loading, refetch } = useQuery(GET_TEACHING_SALES);

  const columns = [
    {
      field: "full_name",
      headerName: "Full Name",
      flex: 1,
    },
    // {
    //   field: "last_name",
    //   headerName: "Last Name",
    //   flex: 1,
    // },
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
      field: "createdAt",
      headerName: "Date",
      flex: 1,
      renderCell: ({ value }) => new Date(value).toLocaleDateString(),
    },
    {
      field: "sub_total",
      headerName: "Sub Total",
      flex: 0.5,
      renderCell: ({ value, row }) => numberFormat(value) + row?.currency,
    },
    {
      field: "teachings",
      headerName: "Teachings",
      flex: 0.5,
      renderCell: ({ value, row }) => (
        <IconButton
          color="primary"
          onClick={() => {
            setViewerMetaData({
              title: row?.prayer_issue,
              content: value,
            });

            setOpenTextViewer(true);
          }}
        >
          <IconEye />
        </IconButton>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: ({ value }) => (
        <Chip size="small" label={value} color="warning" />
      ),
    },

    // {
    //   field: "Actions",
    //   headerName: "Actions",
    //   width: 100,
    //   renderCell: (param) => (
    //     <Stack direction={"row"}>
    //       {actions.map((action, i) => (
    //         <IconButton
    //           key={i}
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
    <PageContainer title={t("Teaching Sales")} description="Teaching Sales">
      <CustomTable
        title={"Teaching Sales"}
        columns={columns}
        rows={data?.getTeachingOrders || []}
        loading={loading}
      />

      <TextViewer
        {...viewerMetaData}
        open={openTextViewer}
        onClose={() => setOpenTextViewer(false)}
        refetch={refetch}
      />
    </PageContainer>
  );
}
