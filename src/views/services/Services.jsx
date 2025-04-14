import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Add, Delete, PlayArrowRounded } from "@mui/icons-material";
import { Grid, IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import * as Yup from "yup";
import PageContainer from "../../components/container/PageContainer";
import {
  CustomAutoComplete,
  CustomTextField,
} from "../../components/forms/theme-elements/CustomTextField";
import CustomModal from "../../components/widgets/CustomModal";
import CustomTable from "../../components/widgets/CustomTable";
import {
  CREATE_SERVICE,
  DELETE_SERVICE,
  GET_SERVICES,
  GET_SERVICE_CATEGORY,
  UPDATE_SERVICE,
} from "../../graphql/services";
import { IconEye } from "@tabler/icons-react";
import VideoPlayer from "../../components/widgets/VideoPlayer";

export default function Services() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const [openCreateTeaching, setOpenCreateTeaching] = useState(false);
  const [openVideoPlayer, setOpenVideoPlayer] = useState(false);
  const [openImageViewer, setOpenImageViewer] = useState(false);

  const [videoPlayerMetaData, setVidePlayerMetaData] = useState({
    title: "",
    address: "",
  });

  const { data, loading, refetch } = useQuery(GET_SERVICES);

  const [editService, { editServiceMut }] = useMutation(UPDATE_SERVICE);
  const [deleteService, { deleteServiceMut }] = useMutation(DELETE_SERVICE);

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
            await deleteService({ variables: { id: row?.id } });
            toast.success("Service deleted successfully!");
            refetch();
          } catch (error) {
            toast.error("Error deleting service");
          }
      },
      color: "error",
    },
  ];

  const columns = [
    // {
    //   field: "service_day",
    //   headerName: "Service Day",
    //   flex: 1,
    // },
    // {
    //   field: "service_date",
    //   headerName: "Service Date",
    //   flex: 1,
    //   renderCell: ( value ) => new Date(value).toLocaleDateString(),
    // },
    {
      field: "category",
      headerName: "Service Category",
      flex: 1,
      renderCell: ({ value }) => value?.title,
    },
    {
      field: "youtube_link",
      headerName: "Youtube Link",
      flex: 3,
      renderCell: ({ value, row }) => {
        return (
          <IconButton
            color="primary"
            onClick={() => {
              setVidePlayerMetaData({
                title: row?.name,
                address: value,
                youtube: true,
              });

              setOpenVideoPlayer(true);
            }}
          >
            <IconEye />
          </IconButton>
        );
        return (
          <a href={value} target="_blank" rel="noreferrer">
            <PlayArrowRounded /> {value}
          </a>
        );
      },
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
    <PageContainer title="Services" description="this is Services">
      <CustomTable
        onAddNew={() => setOpen(true)}
        toolbars={toolbars}
        columns={columns}
        rows={data?.services || []}
        loading={loading}
      />
      <AddService
        refetch={refetch}
        title={"Add Service"}
        open={open}
        onClose={() => setOpen(false)}
      />

      <VideoPlayer
        {...videoPlayerMetaData}
        open={openVideoPlayer}
        onClose={() => setOpenVideoPlayer(false)}
        refetch={refetch}
      />
    </PageContainer>
  );
}

function AddService({ open, onClose, title, refetch }) {
  const [createService, { loading }] = useMutation(CREATE_SERVICE);

  const lookups = useQuery(GET_SERVICE_CATEGORY);

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
      const { data } = await createService({ variables: { input: values } });

      refetch();
      reset();
      onClose();
      toast.success("Service Successfully Added!", { autoClose: 500 });
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
        {/* <Grid item lg={6}>
          <CustomTextField
            control={control}
            name={"service_day"}
            label={"Service Day"}
            placeholder={"Sunday Service"}
          />
        </Grid>
        <Grid item lg={6}>
          <CustomDateTimePicker
            control={control}
            name={"service_date"}
            label={"Service Date"}
          />
        </Grid> */}
        <Grid item lg={6}>
          <CustomAutoComplete
            control={control}
            name={"service_category_id"}
            label={"Category"}
            loading={lookups.loading}
            options={lookups.data?.serviceCategories?.map((c) => ({
              id: c.id,
              name: c.title,
            }))}
          />
        </Grid>
        <Grid item lg={6}>
          <CustomTextField
            control={control}
            name={"youtube_link"}
            label={"YouTube  Link"}
          />
        </Grid>
      </Grid>
    </CustomModal>
  );
}

const validator = yupResolver(
  Yup.object().shape({
    // service_day: Yup.string().required("Service day is required"),
    // service_date: Yup.date().required("Service date is required"),
    youtube_link: Yup.string()
      .url("YouTube link must be a valid URL")
      .required("YouTube link is required"),
    service_category_id: Yup.number().required(
      "Service category ID is required"
    ),
  })
);
