import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  CustomAutoComplete,
  CustomTextField,
} from "../../components/forms/theme-elements/CustomTextField";
import CustomModal from "../../components/widgets/CustomModal";
import { GET_PACKAGES } from "../../graphql/lookup";
import { CREATE_PARTNER, UPDATE_PARTNER } from "../../graphql/partner";

export default function NewPartner({ refetch, record, isEdit, ...props }) {
  const [uploading, setUploading] = useState(false);

  const [createPartner, { loading: creating }] = useMutation(CREATE_PARTNER);
  const [updatePartner, { loading: updating }] = useMutation(UPDATE_PARTNER);

  const lookups = useQuery(GET_PACKAGES);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "all",
    resolver: validator,
    defaultValues: {},
  });

  console.log(errors);

  const onSubmit = async (values) => {
    try {
      if (!isEdit) {
        const { data } = await createPartner({
          variables: { input: { ...values } },
        });

        if (data?.createPartner?.data?.checkout_url) {
          window.open(data?.createPartner?.data?.checkout_url, "_blank");
        }
      } else {
        await updatePartner({
          variables: { input: { ...values } },
        });
      }

      refetch();
      props.onClose();
      reset();
      toast.success(
        isEdit
          ? "Partner Successfully Updated!"
          : "Partner Successfully Created!",
        { autoClose: 500 }
      );
    } catch (error) {
      toast.error(error.message, {
        autoClose: 500,
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <CustomModal
      {...props}
      title={"New Partner"}
      onSubmit={handleSubmit(onSubmit)}
      loading={creating || updating || uploading}
    >
      <Grid container columnSpacing={3} rowSpacing={1}>
        <Grid item lg={12}>
          <Grid container columnSpacing={3} rowSpacing={1}>
            <Grid item lg={4}>
              <CustomTextField
                control={control}
                name="first_name"
                label="First Name"
              />
            </Grid>

            <Grid item lg={4}>
              <CustomTextField
                control={control}
                name="last_name"
                label="Last Name"
              />
            </Grid>

            <Grid item lg={4}>
              <CustomTextField
                control={control}
                name="email"
                label="Email"
                type="email"
              />
            </Grid>

            <Grid item lg={4}>
              <CustomTextField
                control={control}
                name="phone"
                label="Phone Number"
              />
            </Grid>

            <Grid item lg={4}>
              <CustomTextField
                control={control}
                name="dob"
                label="Date of Birth"
                type="date"
              />
            </Grid>

            <Grid item lg={4}>
              <CustomTextField
                control={control}
                name="gender"
                label="Gender"
                select
                options={["Male", "Female"]}
              />
            </Grid>

            <Grid item lg={4}>
              <CustomTextField
                control={control}
                name="currency"
                label="Currency"
                select
                options={["USD", "ETB"]}
              />
            </Grid>

            <Grid item lg={4}>
              <CustomAutoComplete
                control={control}
                name="package_id"
                label="Package"
                loading={lookups.loading}
                options={lookups.data?.getPackages}
              />
            </Grid>

            {/* <Grid item lg={4}>
              <CustomTextField
                control={control}
                name="password"
                label="Password"
                type="password"
              />
            </Grid> */}

            <Grid item lg={4}>
              <CustomTextField
                control={control}
                name="address"
                label="Address"
              />
            </Grid>
          </Grid>
        </Grid>{" "}
        {/* <Grid item lg={4}>
          <MyDropzone
            control={control}
            name="picture"
            cg={12}
            lg={12}
            tg={12}
            label="Driver Photo"
            height={"20rem"}
            setValue={setValue}
            isImage
            imageOverlap
            // croppable
            // aspectRatio={9/16}
            // folder={s3Folders.driverphotos}
          />
        </Grid> */}
      </Grid>
    </CustomModal>
  );
}

const validator = yupResolver(
  Yup.object().shape({
    address: Yup.string().nullable(), // Optional
    currency: Yup.string().required("Currency is required"),
    dob: Yup.date().nullable().typeError("Invalid date format"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    first_name: Yup.string().required("First name is required"),
    gender: Yup.string().oneOf(["Male", "Female"]).nullable(), // Optional with predefined values
    last_name: Yup.string().required("Last name is required"),
    package_id: Yup.number()
      .integer()
      .positive()
      .required("Package is required"),
    // password: Yup.string()
    //   .min(8, "Password must be at least 8 characters")
    //   .required("Password is required"),
    phone: Yup.string()
      .matches(/^\+?[0-9]{10,15}$/, "Invalid phone number")
      .required("Phone number is required"),
  })
);

NewPartner.propTypes = {
  refetch: PropTypes.func, // Function to refetch data
  record: PropTypes.object, // Object representing a record
  isEdit: PropTypes.bool, // Boolean flag to indicate edit mode open: PropTypes.bool,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
