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
import {
  CREATE_TEACHING_CATEOGORY,
  UPDATE_TEACHING_CATEOGORY,
} from "../../graphql/teaching";
import { attachmentSchema } from "../utilities/constants";
import { uploadToServer } from "../utilities/helpers";

export default function NewTeachingCategoryCategory({
  refetch,
  record,
  isEdit,
  ...props
}) {
  const [uploading, setUploading] = useState(false);

  const [createTeachingCategory, { loading: creating }] = useMutation(
    CREATE_TEACHING_CATEOGORY
  );
  const [updateTeachingCategory, { loading: updating }] = useMutation(
    UPDATE_TEACHING_CATEOGORY
  );

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
      const picture = await uploadToServer("category", values.picture);
      setUploading(false);

      // return;

      if (!isEdit) {
        await createTeachingCategory({
          variables: { input: { ...values, picture } },
        });
      } else {
        await updateTeachingCategory({
          variables: { input: { ...values, picture } },
        });
      }

      refetch();
      props.onClose();
      reset();
      toast.success(
        isEdit
          ? "Teaching Category Successfully Updated!"
          : "Teaching Category Successfully Created!",
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

  console.log(errors);

  return (
    <CustomModal
      {...props}
      title={"New Teaching Category"}
      onSubmit={handleSubmit(onSubmit)}
      loading={creating || updating || uploading}
    >
      <Grid container columnSpacing={3} rowSpacing={1}>
        <Grid item lg={8}>
          <Grid container columnSpacing={3} rowSpacing={1}>
            <Grid item lg={12}>
              <CustomTextField
                control={control}
                name={"title"}
                label={"Teaching Category Name"}
              />
            </Grid>

            <Grid item lg={12}>
              <CustomTextField
                control={control}
                name={"description"}
                label={"Description"}
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
            label="Category Picture"
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
    description: Yup.string().required("Description is required"),

    picture: attachmentSchema.required("Photo URL is required"),

    title: Yup.string().required("Title is required"),
  })
);

NewTeachingCategoryCategory.propTypes = {
  refetch: PropTypes.func, // Function to refetch data
  record: PropTypes.object, // Object representing a record
  isEdit: PropTypes.bool, // Boolean flag to indicate edit mode
};
