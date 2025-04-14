import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Add, Delete, Edit, Launch } from "@mui/icons-material";
import { Grid, IconButton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
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
import {
  CREATE_BLOG,
  DELETE_BLOG,
  GET_BLOGS,
  GET_CATEGORYS,
  UPDATE_BLOG,
} from "../../graphql/blog";
import { uploadToServer } from "../utilities/helpers";
import TextViewer from "../../components/widgets/TextViewer";
import ImageViewer from "../../components/widgets/ImageViewer";
import { IconEye } from "@tabler/icons-react";
export default function Blogs() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [openTextViewer, setOpenTextViewer] = useState(false);
  const [openVideoPlayer, setOpenVideoPlayer] = useState(false);
  const [openImageViewer, setOpenImageViewer] = useState(false);

  const [viewerMetaData, setViewerMetaData] = useState({
    title: "",
    address: "",
  });

  const [selectedRecord, setSelectedRecord] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const { data, loading, refetch } = useQuery(GET_BLOGS);

  const [deleteBlog, { deleteBlogMut }] = useMutation(DELETE_BLOG);

  const actions = [
    // {
    //   icon: <Launch />,
    //   onClick: ({ row }) => {
    //     navigate("/blog/" + row?.title?.toLowerCase().replaceAll(" ", "-"), {
    //       state: { blog: row },
    //     });
    //   },
    //   color: "primary",
    // },
    {
      icon: <Edit />,
      onClick: async ({ row }) => {
        setIsEdit(true);
        setSelectedRecord(row);
        setOpen(true);
      },
      color: "success",
    },
    {
      icon: <Delete />,
      onClick: async ({ row }) => {
        if (window.confirm("Are you sure you want to delete this blog ?"))
          try {
            const result = await deleteBlog({ variables: { id: row?.id } });
            toast.success("Blog deleted successfully");

            refetch();
          } catch (error) {
            toast.error("Error deleting blog");
          }
      },
      color: "error",
    },
  ];

  const columns = [
    {
      field: "image",
      headerName: "Thumbnail",
      flex: 1,
      renderCell: ({ value, row }) => {
        return (
          <IconButton
            color="primary"
            onClick={() => {
              setViewerMetaData({ title: row?.title, address: value });

              setOpenImageViewer(true);
            }}
          >
            <IconEye />
          </IconButton>
        );
      },
    },
    // {
    //   field: "user",
    //   headerName: "Owner",
    //   flex: 1,
    //   renderCell: ({value}) => {
    //     return value?.first_name + " " + value?.last_name;
    //   },
    // },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      renderCell: ({ value }) => value.title,
    },
    {
      field: "excerpt",
      headerName: "Subject",
      flex: 1,
      renderCell: ({ value, row }) => {
        return (
          <IconButton
            color="primary"
            onClick={() => {
              setViewerMetaData({ title: row?.title, content: value });

              setOpenTextViewer(true);
            }}
          >
            <IconEye />
          </IconButton>
        );
      },
    },
    {
      field: "body",
      headerName: "Body",
      flex: 1,
      renderCell: ({ value, row }) => {
        return (
          <IconButton
            color="primary"
            onClick={() => {
              setViewerMetaData({ title: row?.title, content: value });

              setOpenTextViewer(true);
            }}
          >
            <IconEye />
          </IconButton>
        );
      },
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
        toolbars={toolbars}
        columns={columns}
        rows={data?.blogs || []}
        loading={loading}
        onAddNew={() => setOpen(true)}
      />

      <AddBlog
        refetch={refetch}
        title={"Add Blog"}
        open={open}
        onClose={() => setOpen(false)}
        isEdit={isEdit}
        record={selectedRecord}
      />
      <TextViewer
        {...viewerMetaData}
        open={openTextViewer}
        onClose={() => setOpenTextViewer(false)}
      />
      <ImageViewer
        {...viewerMetaData}
        open={openImageViewer}
        onClose={() => setOpenImageViewer(false)}
      />
    </PageContainer>
  );
}

function AddBlog({ open, onClose, title, refetch, record, isEdit }) {
  const [uploading, setUploading] = useState(false);

  const [pictureProgress, setPictureProgress] = useState(null);

  const [createBlog, { loading }] = useMutation(CREATE_BLOG);
  const [editBlog, { editBlogMut }] = useMutation(UPDATE_BLOG);

  const [imgUrl, setImgUrl] = useState(null);

  const lookups = useQuery(GET_CATEGORYS);

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

  useEffect(() => {
    if (isEdit) {
      setValue("id", record?.id);
      setValue("title", record?.title);
      setValue("excerpt", record?.excerpt);
      setValue("body", record?.body);
      setValue("categoryId", record?.category?.id);
      setValue("image", record?.image);
    }
  }, [record, isEdit]);

  const onSubmit = async (values) => {
    try {
      if (!isEdit) {
        setUploading(true);
        const image = await uploadToServer("blog", values.image, (p) => {
          setPictureProgress(p);
        });
        setUploading(false);

        await createBlog({
          variables: { input: { ...values, image } },
        });
      } else {
        await editBlog({
          variables: { input: { ...values } },
        });
      }

      refetch();
      reset();
      onClose();
      toast.success("Blog Successfully Added!", { autoClose: 500 });
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
      loading={loading || uploading}
    >
      <Grid container columnSpacing={4} rowSpacing={2}>
        <Grid item lg={6}>
          <CustomTextField control={control} name={"title"} label={"Title"} />
        </Grid>
        <Grid item lg={6}>
          <CustomTextField
            control={control}
            name={"excerpt"}
            label={"Subject"}
          />
        </Grid>
        <Grid item lg={6}>
          <CustomAutoComplete
            control={control}
            name={"categoryId"}
            label={"Category"}
            loading={lookups.loading}
            options={lookups.data?.categories?.map((c) => ({
              id: c.id,
              name: c.title,
            }))}
          />
        </Grid>
        <Grid item lg={6}>
          {/* <CustomTextField
            control={control}
            name={"image"}
            label={"Image Link"}
          /> */}
        </Grid>
        <Grid item lg={6}>
          <CustomTextField
            control={control}
            name={"body"}
            label={"Body"}
            multiline
            rows={10}
          />
        </Grid>

        <MyDropzone
          control={control}
          name="image"
          cg={6}
          lg={12}
          tg={12}
          label="Thumbnail"
          height={"15rem"}
          setValue={setValue}
          isImage
          imageOverlap
          progress={pictureProgress}
        />
      </Grid>
    </CustomModal>
  );
}

const validator = yupResolver(
  Yup.object().shape({
    title: Yup.string().required("Title is required!"),
    excerpt: Yup.string().required("excerpt is required!"),
    body: Yup.string().required("Body is required!"),
    categoryId: Yup.number().required("Category is required!"),
  })
);
