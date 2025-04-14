import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Add, Delete, Edit, Launch, SendToMobile } from "@mui/icons-material";
import { Chip, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import * as Yup from "yup";
import CustomModal from "../../components/widgets/CustomModal";
import { CustomTextField } from "../../components/forms/theme-elements/CustomTextField";
import PageContainer from "../../components/container/PageContainer";
import CustomTable from "../../components/widgets/CustomTable";import { SEND_BULK_EMAIL_FOR_PARTNERS } from "../../graphql/bible_study";
import { ADD_NEW_PARTNER, GET_PARTNERS } from "../../graphql/partnership";
import { numberFormat } from "../../utils/misc";

export default function Partners() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [sendBulkEmailOpen, setSendBulkEmailOpen] = useState(false);

  const { data, loading, refetch } = useQuery(GET_PARTNERS);

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
      headerName: "Partner Name",
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
      field: "partnership_plan",
      headerName: "Plan",
      flex: 1,
      renderCell: ({value}) =>
        value ? (
          value
        ) : (
          <Chip label={"Not Recurring"} size="small" color="warning" />
        ),
    },
    {
      field: "partnership_type",
      headerName: "Type",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      renderCell: ({value, row}) =>
        numberFormat(value) +
        " " +
        (row.payment_method === "Paypal" ? "USD" : "ETB"),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({value, row}) => <Chip color="success" label={"Active"} />,
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
      label: "Send Bulk Email",
      icon: <SendToMobile />,
      onClick: () => setSendBulkEmailOpen(true),
    },
    {
      label: "Add New Partner",
      icon: <Add />,
      onClick: () => setOpen(true),
    },
  ];
  return (
  <PageContainer title="Blogs" description="this is Blogs">
      <CustomTable onAddNew={() => setOpen(true)}
        toolbars={toolbars}
        columns={columns}
        rows={data?.partners || []}
        loading={loading}
      />
      <AddNewPartner
        refetch={refetch}
        title={"Add New Partner"}
        open={open}
        onClose={() => setOpen(false)}
      />
      <SendBulkEmailForm
        open={sendBulkEmailOpen}
        onClose={() => setSendBulkEmailOpen(false)}
        title={"Send Email to All Partners"}
      />{" "}
    </>
  );
}

function AddNewPartner({ open, onClose, title, refetch }) {
  const [addNewPartner, { loading }] = useMutation(ADD_NEW_PARTNER);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: validator,
    defaultValues: { partnership_type: "Recurring" },
  });

  const onSubmit = async (values) => {
    try {
      const { data } = await addNewPartner({ variables: { input: values } });

      refetch();
      reset();
      onClose();
      toast.success("New Partner Successfully Added!", { autoClose: 500 });
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
      <form
        className="php-email-form"
        onSubmit={handleSubmit(onSubmit)}
        style={{ padding: 0 }}
      >
        <div className="row">
          <div className="col-md-6 form-group">
            <CustomTextField
              control={control}
              name={"first_name"}
              label={"First Name"}
            />
          </div>
          <div className="col-md-6 form-group mt-3 mt-md-0">
            <CustomTextField
              control={control}
              name={"last_name"}
              label={"Last Name"}
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-6 form-group">
            <CustomTextField control={control} name={"phone"} label={"Phone"} />
          </div>
          <div className="col-md-6 form-group mt-3 mt-md-0">
            <CustomTextField control={control} name={"email"} label={"Email"} />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6 form-group">
            <CustomTextField
              control={control}
              name={"partnership_plan"}
              label={"Partnership Plan"}
              select
              options={[
                "Every Month",
                "Every 3 Month",
                "Every 6 Month",
                "Every Year",
              ]}
              disabled={watch("partnership_type") === "One Time"}
            />
          </div>
          <div className="col-md-6 form-group mt-3 mt-md-0">
            <CustomTextField
              control={control}
              name={"payment_method"}
              label={"Payment Method"}
              select
              options={["Local Currency", "Paypal"]}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6 form-group">
            <CustomTextField
              control={control}
              name={"amount"}
              label={"Amount"}
              type="number"
              endAdornment={
                <Typography>
                  {watch("payment_method") === "Paypal" ? "USD" : "ETB"}
                </Typography>
              }
            />
          </div>
          <div className="col-md-6 form-group mt-3 mt-md-0">
            {" "}
            <CustomTextField
              control={control}
              name={"church_name"}
              label={"Name of Organization"}
            />
          </div>
        </div>

        <div className="form-group mt-3"></div>
        <div className="form-group mt-3">
          <CustomTextField
            control={control}
            name={"address"}
            label={"Address"}
            multiline
            rows={1}
          />{" "}
        </div>
        <div className="form-group mt-3">
          <CustomTextField
            control={control}
            name={"additional_message"}
            label={"Additional Message"}
            multiline
            rows={3}
          />
        </div>

        <div className="mt-4"></div>
      </form>
    </CustomModal>
  );
}

const validator = yupResolver(
  Yup.object().shape({
    first_name: Yup.string().required("First Name is required!"),
    last_name: Yup.string().required("Last Name is required!"),
    phone: Yup.string().required("Phone is required!"),
    email: Yup.string()
      .email("Enter a Valid Email!")
      .required("Email is required!"),
    partnership_type: Yup.string().required("partnership Type is required!"),
    partnership_plan: Yup.string().when("partnership_type", {
      is: (value) => value !== "One Time",
      then: (schema) => schema.required("Partnership Plan is required!"),
      otherwise: (schema) =>
        schema.notRequired("partnership Plan is required!"),
    }),
    amount: Yup.number().min(0).required("Amount is required!"),
    payment_method: Yup.string().required("Payment Method is required!"),
    church_name: Yup.string().required("Church Name is is required!"),
    address: Yup.string().required("Address is required!"),
    additional_message: Yup.string().notRequired(),
  })
);

function SendBulkEmailForm({ open, onClose, title, refetch }) {
  const [createRecord, { loading }] = useMutation(SEND_BULK_EMAIL_FOR_PARTNERS);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: PARTNER_validator,
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

const PARTNER_validator = yupResolver(
  Yup.object().shape({
    body: Yup.string().required("Body is required"),
    title: Yup.string().required("Title is required"),
    subject: Yup.string().required("Subject is required"),
  })
);
