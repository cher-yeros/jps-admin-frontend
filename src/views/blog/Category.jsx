import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Add, Delete } from "@mui/icons-material";
import { Grid, IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import * as Yup from "yup";
import PageContainer from "../../components/container/PageContainer";
import CustomTable from "../../components/widgets/CustomTable";
import { CustomTextField } from "../../components/forms/theme-elements/CustomTextField";
import CustomModal from "../../components/widgets/CustomModal";
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORYS,
  UPDATE_CATEGORY,
} from "../../graphql/blog";

export default function BlogCategorys() {
  const { t } = useTranslation();

  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);

  const { data, loading, refetch } = useQuery(GET_CATEGORYS);

  const [editCategory, { editCategoryMut }] = useMutation(UPDATE_CATEGORY);
  const [deleteCategory, { deleteCategoryMut }] = useMutation(DELETE_CATEGORY);

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
        const confirm = window.confirm(
          "Are you sure you want to delete this category?"
        );
        if (confirm)
          try {
            await deleteCategory({ variables: { id: row?.id } });
            toast.success("Category deleted successfully!");
            refetch();
          } catch (error) {
            toast.error("Error deleting category");
          }
      },
      color: "error",
    },
  ];

  const columns = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },

    {
      field: "Actions",
      headerName: "Actions",
      width: 150,
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
    <PageContainer
      title="Blog Categories"
      description="this is Blog Categories"
    >
      <CustomTable
        onAddNew={() => setOpen(true)}
        toolbars={toolbars}
        columns={columns}
        rows={data?.categories || []}
        loading={loading}
      />

      <AddCategory
        refetch={refetch}
        title={"Add Category"}
        open={open}
        onClose={() => setOpen(false)}
      />
    </PageContainer>
  );
}

function AddCategory({ open, onClose, title, refetch }) {
  const [createCategory, { loading }] = useMutation(CREATE_CATEGORY);

  const lookups = useQuery(GET_CATEGORYS);

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
      const { data } = await createCategory({ variables: { input: values } });

      refetch();
      reset();
      onClose();
      toast.success("Category Successfully Added!", { autoClose: 500 });
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
        <Grid item lg={6}>
          <CustomTextField control={control} name={"title"} label={"Title"} />
        </Grid>
      </Grid>
    </CustomModal>
  );
}

const validator = yupResolver(
  Yup.object().shape({
    title: Yup.string().required("Title is required!"),
  })
);
