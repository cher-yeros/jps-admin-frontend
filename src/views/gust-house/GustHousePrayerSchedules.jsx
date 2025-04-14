import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Add, Delete, Edit, Launch } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import * as Yup from "yup";
import CustomModal from "../../components/widgets/CustomModal";
import {
  CustomDateTimePicker,
  CustomTextField,
} from "../../components/forms/theme-elements/CustomTextField";
import PageContainer from "../../components/container/PageContainer";
import CustomTable from "../../components/widgets/CustomTable";
import {
  CREATE_VISITOR_PRAYER_SCHEDULE,
  GET_VISITOR_PRAYER_SCHEDULES,
} from "../../graphql/visitor";

export default function VisitorPrayerSchedules() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const { data, loading, refetch } = useQuery(GET_VISITOR_PRAYER_SCHEDULES);

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
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: ({ value }) => new Date(value).toLocaleDateString(),
    },
    {
      field: "start_time",
      headerName: "Start Date",
      flex: 1,
      renderCell: ({ value }) => new Date(value).toLocaleDateString(),
    },
    {
      field: "end_time",
      headerName: "End Date",
      flex: 1,
      renderCell: ({ value }) => new Date(value).toLocaleDateString(),
    },
    {
      field: "payment_amount",
      headerName: "Payment Amount ",
      flex: 1,
      renderCell: ({ value, row }) =>
        row?.payment_amount_usd + " USD / " + row?.payment_amount_etb + " ETB",
    },
    {
      field: "extra_payment",
      headerName: "Transport Payment from Airport",
      flex: 1,
      renderCell: ({ value, row }) =>
        row?.pickup_extra_payment_usd +
        " USD / " +
        row?.pickup_extra_payment_etb +
        " ETB",
    },

    // {
    //   field: "Actions",
    //   headerName: "Actions",
    //   width: 150,
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
        toolbars={toolbars}
        columns={columns}
        rows={data?.guestHousePrayerSchedules || []}
        loading={loading}
      />{" "}
      <AddSchedule
        refetch={refetch}
        title={"Add Guest House Prayer Schedule"}
        open={open}
        onClose={() => setOpen(false)}
      />
    </PageContainer>
  );
}

function AddSchedule({ open, onClose, title, refetch }) {
  const [createRecord, { loading }] = useMutation(
    CREATE_VISITOR_PRAYER_SCHEDULE
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: validator,
    defaultValues: {
      start_time: new Date(),
      end_time: new Date(),
    },
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
        <Grid item lg={6}>
          <CustomDateTimePicker
            control={control}
            name={"start_time"}
            label={"Start Date"}
          />
        </Grid>
        <Grid item lg={6}>
          <CustomDateTimePicker
            control={control}
            name={"end_time"}
            label={"End Date"}
          />
        </Grid>
        <Grid item lg={6}>
          <CustomTextField
            control={control}
            name={"payment_amount_usd"}
            label={"Payment Amount USD"}
            type={"number"}
            endAdornment={<Typography fontSize={"1.5rem"}>USD</Typography>}
          />
        </Grid>
        <Grid item lg={6}>
          <CustomTextField
            control={control}
            name={"payment_amount_etb"}
            label={"Payment Amount ETB"}
            type={"number"}
            endAdornment={<Typography fontSize={"1.5rem"}>ETB</Typography>}
          />
        </Grid>
        <Grid item lg={6}>
          <CustomTextField
            control={control}
            name={"pickup_extra_payment_usd"}
            label={"Extra Payment For Airport Pickup (USD)"}
            type={"number"}
            endAdornment={<Typography fontSize={"1.5rem"}>USD</Typography>}
          />
        </Grid>
        <Grid item lg={6}>
          <CustomTextField
            control={control}
            name={"pickup_extra_payment_etb"}
            label={"Extra Payment For Airport Pickup (ETB)"}
            type={"number"}
            endAdornment={<Typography fontSize={"1.5rem"}>ETB</Typography>}
          />
        </Grid>
      </Grid>
    </CustomModal>
  );
}

const validator = yupResolver(
  Yup.object().shape({
    end_time: Yup.date().required("End time is required"),
    payment_amount_etb: Yup.number()
      .positive("Payment amount must be positive")
      .required("Payment amount is required"),
    payment_amount_usd: Yup.number()
      .positive("Payment amount must be positive")
      .required("Payment amount is required"),
    pickup_extra_payment_etb: Yup.number()
      .positive("Payment amount must be positive")
      .required("Payment amount is required"),
    pickup_extra_payment_usd: Yup.number()
      .positive("Payment amount must be positive")
      .required("Payment amount is required"),
    start_time: Yup.date().required("Start time is required"),
  })
);
