import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Add, Delete } from "@mui/icons-material";
import { Grid, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import * as Yup from "yup";
import CustomModal from "../../components/widgets/CustomModal";
import { CustomTextField } from "../../components/forms/theme-elements/CustomTextField";
import PageContainer from "../../components/container/PageContainer";
import CustomTable from "../../components/widgets/CustomTable";
import { CREATE_FAQ, DELETE_FAQ, GET_FAQS } from "../../graphql/faq";

export default function FAQs() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const { data, loading, refetch } = useQuery(GET_FAQS);
  const [deleteRecord, { loading: deleteLoading }] = useMutation(DELETE_FAQ);

  const actions = [
    // {
    //   icon: <Launch />,
    //   onClick: () => {},
    //   color: "primary",
    // },
    // {
    //   icon: <Edit />,
    //   onClick: () => {},
    //   color: "success",
    // },
    {
      icon: <Delete />,
      onClick: async ({ row }) => {
        if (window.confirm("Are you sure you want to delete this record ?"))
          try {
            const result = await deleteRecord({ variables: { id: row?.id } });
            toast.success("Prayer request deleted successfully");

            refetch();
          } catch (error) {
            toast.error("Error deleting record");
          }
      },
      color: "error",
    },
  ];

  const columns = [
    {
      field: "question",
      headerName: "Question",
      flex: 1,
    },

    {
      field: "answer",
      headerName: "Answer",
      flex: 2,
    },

    {
      field: "Actions",
      headerName: "Actions",
      width: 100,
      renderCell: (param) => (
        <Stack direction={"row"}>
          {actions.map((action, i) => (
            <IconButton
              key={i}
              color={action?.color || "primary"}
              sx={{ fontSize: "2.75rem" }}
              onClick={() => action.onClick(param)}
            >
              {action.icon}
            </IconButton>
          ))}
        </Stack>
      ),
    },
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
        toolbars={toolbars}
        columns={columns}
        rows={data?.allFAQs || []}
        loading={loading}
      />

      <AddFAQ
        refetch={refetch}
        title={"Add Frequently Asked Question"}
        open={open}
        onClose={() => setOpen(false)}
      />
    </PageContainer>
  );
}

function AddFAQ({ open, onClose, title, refetch }) {
  const [createRecord, { loading }] = useMutation(CREATE_FAQ);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: validator,
    defaultValues: {},
  });

  const onSubmit = async (values) => {
    try {
      const { data } = await createRecord({ variables: { input: values } });

      refetch();
      reset();
      onClose();
      toast.success("Guest House Prayer Schedule Successfully Added!", {
        autoClose: 500,
      });
    } catch (error) {
      toast.error(error.message, {
        autoClose: 500,
      });
    }
  };

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title={title}
      onSubmit={handleSubmit(onSubmit)}
      loading={loading}
    >
      <Grid container columnSpacing={4} rowSpacing={2}>
        <Grid item lg={12}>
          <CustomTextField
            control={control}
            name={"question"}
            label={"Question"}
            multiline
            rows={2}
          />
        </Grid>
        <Grid item lg={12}>
          <CustomTextField
            control={control}
            name={"answer"}
            label={"Answer"}
            multiline
            rows={4}
          />
        </Grid>
      </Grid>
    </CustomModal>
  );
}

const validator = yupResolver(
  Yup.object().shape({
    question: Yup.string().required("Question is required"),
    answer: Yup.string().required("Answer is required"),
  })
);
