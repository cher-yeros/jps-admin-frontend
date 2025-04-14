import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Add, Delete } from "@mui/icons-material";
import { Grid, IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import * as Yup from "yup";
import CustomModal from "../../components/widgets/CustomModal";
import { CustomTextField } from "../../components/forms/theme-elements/CustomTextField";
import PageContainer from "../../components/container/PageContainer";
import CustomTable from "../../components/widgets/CustomTable";
import { GET_CATEGORYS } from "../../graphql/blog";
import {
  CREATE_SERVICE_CATEGORY,
  DELETE_SERVICE_CATEGORY,
  GET_SERVICE_CATEGORY,
  UPDATE_SERVICE_CATEGORY,
} from "../../graphql/services";

export default function ServiceCategory() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const { data, loading, refetch } = useQuery(GET_SERVICE_CATEGORY);

  const [editCategory, { editCategoryMut }] = useMutation(
    UPDATE_SERVICE_CATEGORY
  );
  const [deleteCategory, { deleteCategoryMut }] = useMutation(
    DELETE_SERVICE_CATEGORY
  );

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
      field: "playlist_link",
      headerName: "Playlist Link",
      flex: 3,
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
    <PageContainer title="Blogs" description="this is Blogs">
      <CustomTable
        onAddNew={() => setOpen(true)}
        toolbars={toolbars}
        columns={columns}
        rows={data?.serviceCategories || []}
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
  const [createCategory, { loading }] = useMutation(CREATE_SERVICE_CATEGORY);

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
        <Grid item lg={6}>
          <CustomTextField
            control={control}
            name={"playlist_link"}
            label={"YouTube Playlist Link"}
          />
        </Grid>
      </Grid>
    </CustomModal>
  );
}

const validator = yupResolver(
  Yup.object().shape({
    title: Yup.string().required("Title is required"),
    playlist_link: Yup.string()
      .url("Playlist link must be a valid URL")
      .required("Playlist link is required"),
  })
);
