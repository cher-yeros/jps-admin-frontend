import * as Yup from "yup";

export const attachmentSchema = Yup.object().shape({
  fileName: Yup.string().optional(),
  name: Yup.string().required("Name is required"),
  size: Yup.number().required("Size is required"),
  type: Yup.string().required("Type is required"),
  url: Yup.string().required("URI is required"),
});

export const attachmentSchemaNotRequired = Yup.object().shape({
  fileName: Yup.string().optional(),
  name: Yup.string().notRequired("Name is required"),
  size: Yup.number().notRequired("Size is required"),
  type: Yup.string().notRequired("Type is required"),
  url: Yup.string().notRequired("URI is required"),
});

export const TeachingType = {
  VIDEO: "video",
  AUDIO: "audio",
  PDF: "pdf",
  EPUB: "epub",
  // ZOOM_MEETING: "zoom_meeting",
  // YOUTUBE_LIVE: "youtube_live",
};
