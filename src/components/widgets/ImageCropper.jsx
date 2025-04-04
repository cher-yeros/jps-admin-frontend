import { Box, Slider, Stack, Typography } from "@mui/material";
import { IconCircleCheck, IconX } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import { v4 as uuidv4 } from "uuid";
import CustomModal from "./CustomModal";

const MIN_DIMENSION = 500;

export default function ImageCropper2({
  acceptedFiles,
  setAcceptedFiles,
  aspectRatio,
  multiple,
  setValue,
  name,
  onChange,
  folder,
  ...props
}) {
  const { t } = useTranslation();

  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState();
  const blobUrlRef = useRef("");

  const [completedCrop, setCompletedCrop] = useState(null);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      aspectRatio,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  useEffect(() => {
    if (
      completedCrop?.width &&
      completedCrop?.height &&
      imgRef.current &&
      previewCanvasRef.current
    ) {
      // We use canvasPreview as it's much faster than imgPreview.
      canvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        completedCrop,
        scale,
        rotate
      );
    }
  }, [completedCrop, scale, rotate]);

  const fileGetter = async ({ file, blob }) => ({
    name: file.name,
    size: blob.size,
    type: blob.type,
    // uri: await fileToDataUri(blob),
    url: URL.createObjectURL(blob),

    file: blob,
    fileName:
      "https://matrixerpfleet.s3.us-west-2.amazonaws.com/" +
      folder +
      uuidv4() +
      "." +
      file.type.split("/")[1],
  });

  const onSave = async () => {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;

    if (!image || !previewCanvas || !completedCrop) {
      return;
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );

    const ctx = offscreen.getContext("2d");

    if (!ctx) {
      throw new Error("No 2d context");
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height
    );

    const blob = await offscreen.convertToBlob({
      type: acceptedFiles.type,
    });

    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
    }

    blobUrlRef.current = URL.createObjectURL(blob);

    if (multiple) {
    } else {
      const file = await fileGetter({ file: acceptedFiles, blob });

      setAcceptedFiles(file);

      // onChange(file);
      setValue(name, file);
    }

    props.onHide();
    setCompletedCrop(null);
    setRotate(0);
    setScale(1);
    // if (previewCanvasRef.current) {
    //   previewCanvasRef.current.href = blobUrlRef.current;
    //   previewCanvasRef.current.click();
    // }
  };

  const actions = [
    {
      label: "Save",
      icon: <IconCircleCheck />,
      onClick: onSave,
    },
    { label: "Reset", icon: <IconX /> },
  ];

  return (
    <CustomModal
      {...props}
      title={"Image Cropper"}
      actions={actions}
      size={"lg"}
      actionRelative
    >
      <Stack py={2} pt={3} px={3} direction={"row"} spacing={5}>
        <Stack flex={1} direction={"row"} spacing={2}>
          <Typography>{t("Rotation")}</Typography>
          <Slider
            size="small"
            min={-180}
            max={180}
            valueLabelDisplay="auto"
            value={rotate}
            onChange={(_, value) => setRotate(value)}
          />
        </Stack>
        <Stack flex={1} direction={"row"} spacing={2}>
          <Typography>{t("Scale")}</Typography>
          <Slider
            size="small"
            min={-10}
            max={10}
            step={0.1}
            valueLabelDisplay="auto"
            value={scale}
            onChange={(_, value) => setScale(value)}
          />
        </Stack>
      </Stack>
      <Box
        height={"26rem"}
        overflow={"hidden"}
        sx={{
          "& .ReactCrop ": {
            height: "100%",
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)",
            "& .ReactCrop__child-wrapper": {
              height: "100%",
            },
          },
        }}
      >
        <ReactCrop
          crop={crop}
          onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          keepSelection
          aspect={aspectRatio}
          minWidth={MIN_DIMENSION}
          // maxHeight={"100%"}
        >
          <img
            ref={imgRef}
            style={{
              height: "100%",
              width: "auto",
              transform: `scale(${scale}) rotate(${rotate}deg)`,
            }}
            src={acceptedFiles?.url}
            alt={"selcted_"}
            onLoad={onImageLoad}
          />
        </ReactCrop>

        <canvas
          ref={previewCanvasRef}
          style={{
            border: "1px solid black",
            objectFit: "contain",
            width: completedCrop?.width,
            height: completedCrop?.height,
            display: "none",
          }}
        />
      </Box>
    </CustomModal>
  );
}

export function useDebounceEffect(fn, waitTime, deps) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn.apply(undefined, deps);
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
  }, deps);
}

export async function canvasPreview(
  image,
  canvas,
  crop,
  scale = 1,
  rotate = 0
) {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  const TO_RADIANS = Math.PI / 180;

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  const pixelRatio = window.devicePixelRatio;
  // const pixelRatio = 1

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const rotateRads = rotate * TO_RADIANS;
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  ctx.save();

  // 5) Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY);
  // 4) Move the origin to the center of the original position
  ctx.translate(centerX, centerY);
  // 3) Rotate around the origin
  ctx.rotate(rotateRads);
  // 2) Scale the image
  ctx.scale(scale, scale);
  // 1) Move the center of the image to the origin (0,0)
  ctx.translate(-centerX, -centerY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  ctx.restore();
}
