import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Add, Delete, Edit, Launch } from "@mui/icons-material";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import * as Yup from "yup";
import CustomModal from "../../components/widgets/CustomModal";
import {
  CustomDateTimePicker,
  CustomTextField,
  CustomTimePicker,
} from "../../components/forms/theme-elements/CustomTextField";
import PageContainer from "../../components/container/PageContainer";
import CustomTable from "../../components/widgets/CustomTable";
import {
  CREATE_BIBLE_STUDY_SESSION,
  DELETE_BIBLE_STUDY_SESSION,
  GET_BIBLE_STUDY_SESSIONS,
} from "../../graphql/bible_study";
import axios from "axios";

export default function BibleStudySessions() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const { data, loading, refetch } = useQuery(GET_BIBLE_STUDY_SESSIONS);
  const [deleteBSSession, deleteBSSessionMutaion] = useMutation(
    DELETE_BIBLE_STUDY_SESSION
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
          "Are you sure you want to delete this prophetic school session?"
        );
        if (confirm)
          try {
            await deleteBSSession({ variables: { id: row?.id } });
            toast.success("Prophetic School Session deleted successfully!");
            refetch();
          } catch (error) {
            toast.error("Error deleting prophetic School Session");
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
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: ({ value }) => new Date(value).toLocaleDateString(),
    },
    {
      field: "start_time",
      headerName: "Start Time",
      flex: 1,
      renderCell: ({ value }) => new Date(value).toLocaleTimeString(),
    },
    {
      field: "end_time",
      headerName: "End Time",
      flex: 1,
      renderCell: ({ value }) => new Date(value).toLocaleTimeString(),
    },
    {
      field: "zoom_id",
      headerName: "Zoom Id",
      flex: 1,
    },
    {
      field: "zoom_link",
      headerName: "Zoom Link",
      flex: 1,
    },
    {
      field: "zoom_passcode",
      headerName: "Zoom Passcode",
      flex: 1,
    },
    {
      field: "payment_amount",
      headerName: "Payment Amount",
      flex: 1,
      renderCell: ({ value, row }) =>
        row?.payment_amount_usd + " USD / " + row?.payment_amount_etb + " ETB",
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
        rows={data?.bibleStudySessions || []}
        loading={loading}
      />{" "}
      <AddBibleStudySession
        refetch={refetch}
        title={"Add Prophetic School Session"}
        open={open}
        onClose={() => setOpen(false)}
      />
    </PageContainer>
  );
}

function AddBibleStudySession({ open, onClose, title, refetch }) {
  const [imgUrl, setImgUrl] = useState(null);

  const [createRecord, { loading }] = useMutation(CREATE_BIBLE_STUDY_SESSION);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: validator,
    defaultValues: {
      date: new Date(),
      start_time: new Date(),
      end_time: new Date(),
    },
  });

  const onSubmit = async (values) => {
    try {
      const link =
        process.env.NODE_ENV === "production"
          ? "https://api.jpstvethiopia.com/api/upload-file"
          : "http://localhost:4000/api/upload-file";

      const formData = new FormData();

      formData.append("picture", values.picture);

      const response = await axios.post(link, formData);

      // console.log(response);
      // return;
      // delete values.picture;

      const { data } = await createRecord({
        variables: { input: { ...values, picture: response.data?.fileName } },
      });

      refetch();
      reset();
      onClose();
      toast.success("Prophetic School Session Successfully Added!", {
        autoClose: 500,
      });
    } catch (error) {
      toast.error(error.message, {
        autoClose: 500,
      });
    }
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }

    setValue("picture", file);
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
        <Grid item lg={8}>
          <CustomTextField control={control} name={"title"} label={"Title"} />
          <CustomTextField
            control={control}
            name={"description"}
            label={"Description"}
            multiline
            rows={5}
          />
        </Grid>{" "}
        <Grid item lg={4}>
          <Box
            height={"18rem"}
            sx={{
              mt: 1.65,
              background: "#ebebeb",
              border: 3,
              borderStyle: "dashed",
              borderColor: "gray",
              borderRadius: 1,
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
            }}
            onClick={() => document.getElementById("image-uploader").click()}
          >
            {imgUrl && (
              <img
                style={{ height: "100%", width: "auto" }}
                src={imgUrl}
                alt="adf"
              />
            )}
          </Box>
          <input
            type="file"
            hidden
            id="image-uploader"
            onChange={onFileChange}
          />
        </Grid>
        <Grid item lg={4}>
          <CustomDateTimePicker
            control={control}
            name={"date"}
            label={"Date"}
          />
        </Grid>
        <Grid item lg={4}>
          <CustomTimePicker
            control={control}
            name={"start_time"}
            label={"Start Time"}
          />
        </Grid>
        <Grid item lg={4}>
          <CustomTimePicker
            control={control}
            name={"end_time"}
            label={"End Time"}
          />
        </Grid>
        <Grid item lg={4}>
          <CustomTextField
            control={control}
            name={"payment_amount_usd"}
            label={"Payment Amount (USD)"}
            type={"number"}
            endAdornment={<Typography fontSize={"1.5rem"}>USD </Typography>}
          />
        </Grid>
        <Grid item lg={4}>
          <CustomTextField
            control={control}
            name={"payment_amount_etb"}
            label={"Payment Amount (ETB)"}
            type={"number"}
            endAdornment={<Typography fontSize={"1.5rem"}>ETB</Typography>}
          />
        </Grid>
        <Grid item lg={4}>
          <CustomTextField
            control={control}
            name={"zoom_id"}
            label={"Zoom ID"}
          />
        </Grid>
        <Grid item lg={6}>
          <CustomTextField
            control={control}
            name={"zoom_link"}
            label={"Zoom Link"}
          />
        </Grid>
        <Grid item lg={6}>
          <CustomTextField
            control={control}
            name={"zoom_passcode"}
            label={"Zoom Passcode"}
          />
        </Grid>
      </Grid>
    </CustomModal>
  );
}

const validator = yupResolver(
  Yup.object().shape({
    date: Yup.string().required("Date is required"),
    description: Yup.string().required("Description is required"),
    end_time: Yup.date().required("End time is required"),
    payment_amount_usd: Yup.number().required("Payment amount is required"),
    payment_amount_etb: Yup.number().required("Payment amount is required"),
    start_time: Yup.date().required("Start time is required"),
    title: Yup.string().required("Title is required"),
    zoom_id: Yup.string().required("Zoom ID is required"),
    zoom_link: Yup.string().required("Zoom link is required"),
    zoom_passcode: Yup.string().required("Zoom passcode is required"),
  })
);
