import CustomModal from "../../components/reusable/CustomModal";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Grid, TextField } from "@mui/material";
import CustomTextField from "../../components/forms/theme-elements/CustomTextField";
export default function NewPackage({ ...props }) {
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

  return (
    <CustomModal title={"New Package"} {...props} onSubmit={() => {}}>
      <Grid container>
        <Grid item lg={12} border={1}>
          <CustomTextField />
          <TextField />
        </Grid>
      </Grid>
    </CustomModal>
  );
}

const validator = yupResolver(
  Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().nullable(),
    features: Yup.array().of(Yup.string()),
    price_etb: Yup.number()
      .typeError("Price (ETB) must be a number")
      .positive("Price (ETB) must be greater than zero")
      .required("Price (ETB) is required"),
    price_usd: Yup.number()
      .typeError("Price (USD) must be a number")
      .positive("Price (USD) must be greater than zero")
      .required("Price (USD) is required"),
  })
);
