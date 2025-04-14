import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Add, Delete, Launch } from "@mui/icons-material";
import { Box, Grid, IconButton, Stack } from "@mui/material";
import { IconEye } from "@tabler/icons-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import * as Yup from "yup";
import PageContainer from "../../components/container/PageContainer";
import {
  CustomAutoComplete,
  CustomTextField,
  MyDropzone,
} from "../../components/forms/theme-elements/CustomTextField";
import CustomModal from "../../components/widgets/CustomModal";
import CustomTable from "../../components/widgets/CustomTable";
import ImageViewer from "../../components/widgets/ImageViewer";
import {
  CREATE_GALLERY,
  DELETE_GALLERY,
  GET_GALLERY,
  GET_GALLERY_CATEGORY,
  UPDATE_GALLERY,
} from "../../graphql/gallery";
import { uploadToServer } from "../utilities/helpers";

export default function Gallery() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [openCreateTeaching, setOpenCreateTeaching] = useState(false);
  const [openVideoPlayer, setOpenVideoPlayer] = useState(false);
  const [openImageViewer, setOpenImageViewer] = useState(false);

  const [videoPlayerMetaData, setVidePlayerMetaData] = useState({
    title: "",
    address: "",
  });

  const { data, loading, refetch } = useQuery(GET_GALLERY);

  const [editGallery, { editGalleryMut }] = useMutation(UPDATE_GALLERY);
  const [deleteGallery, { deleteGalleryMut }] = useMutation(DELETE_GALLERY);

  // useEffect(() => {
  //   const lightbox = GLightbox({
  //     selector: ".portfolio-lightbox",
  //     touchNavigation: true,
  //     loop: true,
  //     autoplayVideos: true,
  //   });

  //   // Clean up on component unmount
  //   return () => {
  //     lightbox.destroy();
  //   };
  // }, []);

  const actions = [
    {
      icon: <Launch />,
      onClick: () => {
        navigate("/gallery");
      },
      color: "primary",
    },
    // {
    //   icon: <Edit />,
    //   onClick: () => {},
    //   color: "success",
    // },
    {
      icon: <Delete />,
      onClick: async ({ row }) => {
        const confirm = window.confirm(
          "Are you sure you want to delete this gallery image?"
        );
        if (confirm)
          try {
            await deleteGallery({ variables: { id: row?.id } });
            toast.success("Category deleted successfully!");
            refetch();
          } catch (error) {
            toast.error("Error deleting gallery image");
          }
      },
      color: "error",
    },
  ];

  const columns = [
    {
      field: "images",
      headerName: "Images",
      flex: 1,
      renderCell: ({ value, row }) => (
        <IconButton
          color="primary"
          onClick={() => {
            setVidePlayerMetaData({
              title: row?.title,
              address: JSON.parse(value),
              multiple: true,
            });

            setOpenImageViewer(true);
          }}
        >
          <IconEye />
        </IconButton>
      ),
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "city",
      headerName: "Sub Title",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Gallery Category",
      flex: 1,
      renderCell: ({ value, row }) => value?.title,
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
    <PageContainer title={"Gallery"} description="this is Gallery">
      <CustomTable
        toolbars={toolbars}
        columns={columns}
        rows={data?.galleries || []}
        loading={loading}
        onAddNew={() => setOpen(true)}
      />
      <AddGallery
        refetch={refetch}
        title={"Add Gallery"}
        open={open}
        onClose={() => setOpen(false)}
      />{" "}
      <ImageViewer
        {...videoPlayerMetaData}
        open={openImageViewer}
        onClose={() => setOpenImageViewer(false)}
        refetch={refetch}
      />
    </PageContainer>
  );
}

function AddGallery({ open, onClose, title, refetch }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [pictureProgress, setPictureProgress] = useState(null);

  const [createGallery, { loading }] = useMutation(CREATE_GALLERY);

  const lookups = useQuery(GET_GALLERY_CATEGORY);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    mode: "all",
    resolver: validator,
    defaultValues: {
      // picture: [],
    },
  });

  const onSubmit = async (values) => {
    try {
      setUploading(true);
      let filesNames = await Promise.all(
        values?.images?.map(async (img) => {
          const picture = await uploadToServer("gallery", img, (p) => {
            setPictureProgress(p);
          });

          return picture;
        })
      );

      setUploading(false);

      const { data } = await createGallery({
        variables: { input: { ...values, images: filesNames } },
      });

      refetch();
      reset();
      onClose();
      toast.success("Gallery Successfully Added!", { autoClose: 500 });
    } catch (error) {
      toast.error(error.message, {
        autoClose: 500,
      });
    }
  };

  const onFileChange = async (e) => {
    const files = e.target.files;
    // setValue("picture", [...files]);
    setSelectedImages(e.target.files);
    // await Promise.all(
    //   files?.map((file) => {

    //   })
    // );
  };

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title={title}
      onSubmit={handleSubmit(onSubmit)}
      loading={loading || uploading}
    >
      <Grid container columnSpacing={4} rowSpacing={2}>
        <Grid item md={6} xs={12}>
          <CustomTextField control={control} name={"title"} label={"Title"} />
          <CustomTextField
            control={control}
            name={"city"}
            label={"Sub Title"}
          />
          <Box my={1}></Box>
          <CustomAutoComplete
            control={control}
            name={"gallery_category_id"}
            label={"Category"}
            loading={lookups.loading}
            options={lookups.data?.galleryCategories?.map((c) => ({
              id: c.id,
              name: c.title,
            }))}
          />
        </Grid>
        <MyDropzone
          control={control}
          name="images"
          cg={6}
          lg={12}
          tg={12}
          label="Images"
          height={"15rem"}
          setValue={setValue}
          filesOverlap
          // isImage
          // imageOverlap
          multiple
          progress={pictureProgress}
        />
      </Grid>
    </CustomModal>
  );
}

const validator = yupResolver(
  Yup.object().shape({
    title: Yup.string().required("Title is required"),
    city: Yup.string().required("Sub Title is required"),
    // image: Yup.string()
    //   .url("Image must be a valid URL")
    //   .required("Image is required"),
    gallery_category_id: Yup.number().required(
      "Service category ID is required"
    ),
  })
);
