import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  CustomTextField,
  MyDropzone,
} from "../../components/forms/theme-elements/CustomTextField";
import CustomModal from "../../components/widgets/CustomModal";
import { CREATE_PACKAGE, UPDATE_PACKAGE } from "../../graphql/package";
import { uploadToServer } from "../utilities/helpers";

export default function NewPackage({ refetch, record, isEdit, ...props }) {
  const [uploading, setUploading] = useState(false);

  const [createPackage, { loading: creating }] = useMutation(CREATE_PACKAGE);
  const [updatePackage, { loading: updating }] = useMutation(UPDATE_PACKAGE);

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

  const onSubmit = async (values) => {
    try {
      setUploading(true);
      const picture = await uploadToServer("package", values.picture);
      setUploading(false);

      // return;

      if (!isEdit) {
        const { data } = await createPackage({
          variables: { input: { ...values, picture } },
        });
      } else {
        const { data } = await updatePackage({
          variables: { input: { ...values, picture } },
        });
      }

      refetch();
      props.onClose();
      reset();
      toast.success(
        isEdit
          ? "Package Successfully Updated!"
          : "Package Successfully Created!",
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
      title={"New Package"}
      onSubmit={handleSubmit(onSubmit)}
      loading={creating || updating || uploading}
    >
      <Grid container columnSpacing={3} rowSpacing={1}>
        <Grid item lg={8}>
          <Grid container columnSpacing={3} rowSpacing={1}>
            <Grid item lg={6}>
              <CustomTextField
                control={control}
                name={"name"}
                label={"Package Name"}
              />
            </Grid>

            <Grid item lg={3}>
              <CustomTextField
                control={control}
                name={"price_etb"}
                label={"Price (ETB)"}
                type={"number"}
              />
            </Grid>
            <Grid item lg={3}>
              <CustomTextField
                control={control}
                name={"price_usd"}
                label={"Price (USD)"}
                type={"number"}
              />
            </Grid>

            <Grid item lg={6}>
              <CustomTextField
                control={control}
                name={"description"}
                label={"Description"}
                multiline
                rows={8}
              />
            </Grid>
            <Grid item lg={6}>
              <CustomTextField
                control={control}
                name={"features"}
                label={"Features"}
                placeholder={"Write the features separating with comma..."}
                multiline
                rows={8}
              />
            </Grid>
          </Grid>
        </Grid>{" "}
        <Grid item lg={4}>
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
        </Grid>
      </Grid>
    </CustomModal>
  );
}

const validator = yupResolver(
  Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().nullable(),
    features: Yup.string().nullable(),
    price_etb: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be greater than zero")
      .required("Price is required"),
    price_usd: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be greater than zero")
      .required("Price is required"),
  })
);

NewPackage.propTypes = {
  refetch: PropTypes.func, // Function to refetch data
  record: PropTypes.object, // Object representing a record
  isEdit: PropTypes.bool, // Boolean flag to indicate edit mode

  open: PropTypes.bool,
  onClose: PropTypes.func,
};
