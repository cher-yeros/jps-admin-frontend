import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Add, Delete, Edit, Launch, SendToMobile } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import * as Yup from "yup";
import CustomModal from "../../components/widgets/CustomModal";
import { CustomTextField } from "../../components/forms/theme-elements/CustomTextField";
import PageContainer from "../../components/container/PageContainer";
import CustomTable from "../../components/widgets/CustomTable";
import {
  GET_BIBLE_STUDY_APPLICATIONS,
  REGISTER_MEMBERS_BS,
  SEND_BULK_EMAIL_FOR_MEMBERS,
} from "../../graphql/bible_study";

export default function BibleStudyApplications() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const { data, loading, refetch } = useQuery(GET_BIBLE_STUDY_APPLICATIONS);

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
      headerName: "Member Name",
      flex: 1,
      renderCell: ({ row }) => {
        return row.first_name + " " + row.last_name;
      },
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
      field: "title",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
  ];

  const toolbars = [
    {
      label: "Send Bulk Email",
      icon: <SendToMobile />,
      onClick: () => setOpen(true),
    },
    {
      label: "Add New Member",
      icon: <Add />,
      onClick: () => setOpenRegister(true),
    },
  ];

  return (
    <>
      {" "}
      <DataGridWrapper
        toolbars={toolbars}
        columns={columns}
        rows={data?.bibleStudyApplications || []}
        loading={loading}
      />{" "}
      <SendBulkEmailForm
        open={open}
        onClose={() => setOpen(false)}
        title={"Send Email to all Members"}
      />
      <AddBibleStudyMember
        open={openRegister}
        onClose={() => setOpenRegister(false)}
        refetch={refetch}
      />
    </PageContainer>
  );
}

function SendBulkEmailForm({ open, onClose, title, refetch }) {
  const [createRecord, { loading }] = useMutation(SEND_BULK_EMAIL_FOR_MEMBERS);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: validator,
    defaultValues: {},
  });

  const onSubmit = async (values) => {
    try {
      const { data } = await createRecord({
        variables: { input: { ...values } },
      });

      // refetch();
      reset();
      onClose();
      toast.success("Bulk Email Successfully Sent!", {
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
          <CustomTextField control={control} name={"title"} label={"Title"} />
        </Grid>

        <Grid item lg={12}>
          <CustomTextField
            control={control}
            name={"subject"}
            label={"Subject"}
          />
        </Grid>

        <Grid item lg={12}>
          <CustomTextField
            control={control}
            name={"body"}
            label={"Body"}
            multiline
            rows={15}
          />
        </Grid>
      </Grid>
    </CustomModal>
  );
}

function AddBibleStudyMember({ open, onClose, title, refetch }) {
  const [createRecord, { loading }] = useMutation(REGISTER_MEMBERS_BS);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: member_validator,
    defaultValues: {},
  });

  const onSubmit = async (values) => {
    try {
      const { data } = await createRecord({
        variables: { input: { ...values } },
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
          <CustomTextField
            control={control}
            name={"first_name"}
            label={"First Name"}
          />{" "}
        </Grid>{" "}
        <Grid item lg={6}>
          <CustomTextField
            control={control}
            name={"last_name"}
            label={"Last Name"}
          />
        </Grid>
        <Grid item lg={6}>
          <CustomTextField control={control} name={"phone"} label={"Phone"} />
        </Grid>
        <Grid item lg={6}>
          <CustomTextField control={control} name={"email"} label={"Email"} />
        </Grid>
        <Grid item lg={6}>
          <CustomTextField
            control={control}
            name={"payment_method"}
            label={"Payment Method"}
            select
            options={["Local Currency", "Paypal"]}
          />
        </Grid>
        <Grid item lg={6}>
          <CustomTextField
            control={control}
            name={"payment_amount"}
            label={"Payment Amount"}
            type="number"
            endAdornment={
              <Typography fontSize={"1.5rem"}>
                {watch("payment_method") === "Paypal" ? "USD" : "ETB"}
              </Typography>
            }
          />
        </Grid>
      </Grid>
    </CustomModal>
  );
}

const validator = yupResolver(
  Yup.object().shape({
    body: Yup.string().required("Body is required"),
    title: Yup.string().required("Title is required"),
    subject: Yup.string().required("Subject is required"),
  })
);

const member_validator = yupResolver(
  Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    payment_method: Yup.string().required("Payment method is required"),
    payment_amount: Yup.number()
      .positive("Payment amount must be positive")
      .required("Payment amount is required"),
    phone: Yup.string().required("Phone number is required"),
  })
);
