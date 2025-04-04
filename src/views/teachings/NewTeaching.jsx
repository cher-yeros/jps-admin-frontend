import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import { capitalize } from "lodash";
import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  CustomAutoComplete,
  CustomTextField,
  MyDropzone,
} from "../../components/forms/theme-elements/CustomTextField";
import CustomModal from "../../components/widgets/CustomModal";
import { GET_TEACHING_CATEOGORYS } from "../../graphql/lookup";
import { CREATE_TEACHING, UPDATE_TEACHING } from "../../graphql/teaching";
import { attachmentSchema, TeachingType } from "../utilities/constants";
import { uploadToServer } from "../utilities/helpers";

export default function NewTeaching({ refetch, record, isEdit, ...props }) {
  const [uploading, setUploading] = useState(false);

  const [pictureProgress, setPictureProgress] = useState(null);
  const [trailerProgress, setTrailerProgress] = useState(null);
  const [teachingProgress, setTeachingProgress] = useState(null);

  const [createTeaching, { loading: creating }] = useMutation(CREATE_TEACHING);
  const [updateTeaching, { loading: updating }] = useMutation(UPDATE_TEACHING);

  const lookups = useQuery(GET_TEACHING_CATEOGORYS);

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
      const picture = await uploadToServer("thumbnail", values.picture, (p) => {
        setPictureProgress(p);
      });
      const trailer = await uploadToServer("trailer", values.trailer, (p) => {
        setTrailerProgress(p);
      });
      const file_url = await uploadToServer(
        "teaching",
        values.file_url,
        (p) => {
          setTeachingProgress(p);
        }
      );
      setUploading(false);

      // return;

      if (!isEdit) {
        await createTeaching({
          variables: { input: { ...values, picture, trailer, file_url } },
        });
      } else {
        await updateTeaching({
          variables: { input: { ...values, picture, trailer, file_url } },
        });
      }

      refetch();
      props.onClose();
      reset();
      toast.success(
        isEdit
          ? "Teaching Successfully Updated!"
          : "Teaching Successfully Created!",
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
      title={"New Teaching"}
      onSubmit={handleSubmit(onSubmit)}
      loading={creating || updating || uploading}
    >
      <Grid container columnSpacing={3} rowSpacing={1}>
        <Grid item lg={8}>
          <Grid container columnSpacing={3} rowSpacing={1}>
            <Grid item lg={6}>
              <CustomTextField
                control={control}
                name="title"
                label="Teaching Title"
              />
            </Grid>

            <Grid item lg={6}>
              <CustomAutoComplete
                control={control}
                name="category_id"
                label="Category"
                loading={lookups.loading}
                options={lookups?.data?.getTeachingCategories.map((key) => ({
                  id: key?.id,
                  name: key?.title,
                }))}
              />
            </Grid>

            <Grid item lg={6}>
              <CustomAutoComplete
                control={control}
                name="content_type"
                label="Content Type"
                options={Object.keys(TeachingType).map((key) => ({
                  id: key,
                  name: capitalize(TeachingType[key]),
                }))}
              />
            </Grid>

            <Grid item lg={6}>
              <CustomTextField
                control={control}
                name="owner"
                label="Teacher Name"
              />
            </Grid>

            <Grid item lg={6}>
              <CustomTextField
                control={control}
                name="seo_tags"
                label="SEO Tags"
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
            label="Thumbnail"
            height={"15rem"}
            setValue={setValue}
            isImage
            imageOverlap
            progress={pictureProgress}
          />
          <MyDropzone
            control={control}
            name="trailer"
            cg={12}
            lg={12}
            tg={12}
            label="Trailer"
            height={"5rem"}
            setValue={setValue}
            progress={trailerProgress}
            // isImage
            // imageOverlap
          />
          <MyDropzone
            control={control}
            name="file_url"
            cg={12}
            lg={12}
            tg={12}
            label="Teaching File"
            height={"5rem"}
            setValue={setValue}
            progress={teachingProgress}
            // isImage
            // imageOverlap
          />
        </Grid>
      </Grid>
    </CustomModal>
  );
}

const validator = yupResolver(
  Yup.object().shape({
    category_id: Yup.string().required("Category is required"),
    content_type: Yup.mixed()
      .oneOf([...Object.keys(TeachingType).map((key) => key)])
      .required("Content Type is required"),
    description: Yup.string().required("Description is required"),
    file_url: attachmentSchema.required(),
    owner: Yup.string().required("Owner is required"),
    picture: attachmentSchema.required(),
    price_etb: Yup.number()
      .positive("Price must be positive")
      .required("Price in ETB is required"),
    price_usd: Yup.number()
      .positive("Price must be positive")
      .required("Price in USD is required"),
    seo_tags: Yup.string().required("SEO Tags are required"),
    title: Yup.string().required("Title is required"),
    trailer: attachmentSchema.required(),
  })
);

NewTeaching.propTypes = {
  refetch: PropTypes.func, // Function to refetch data
  record: PropTypes.object, // Object representing a record
  isEdit: PropTypes.bool, // Boolean flag to indicate edit mode
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
