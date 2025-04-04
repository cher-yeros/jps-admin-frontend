import {
  Autocomplete,
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  colors,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import {
  Icon123,
  IconCheckbox,
  IconLockOpen,
  IconPictureInPicture,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
import { useCallback, useState } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import ImageCropper2 from "../../widgets/ImageCropper";

export function CustomTextField({
  label,
  control,
  name,
  options,
  select,
  lf,
  tf,
  rows,
  multiline,
  endAdornment,
  ...props
}) {
  const { t } = useTranslation();

  return (
    <div className="d-flex mt-3" style={{ flex: 1 }}>
      {label}
      <Box
        style={{ flex: 12 || tf || 7 }}
        className="input-group"
        // sx={{
        //   "& .MuiButton-root": { fontSize: "1.35rem" },
        //   "& .MuiInputBase-input": { fontSize: "1.5rem!important" },
        //   "& .MuiFormLabel-root": { fontSize: "1.5rem!important" },
        //   "& .MuiSvgIcon-root": { fontSize: "3rem!important" },
        // }}
      >
        <Controller
          control={control}
          name={name}
          render={({ field, fieldState: { error } }) => {
            return (
              <TextField
                {...props}
                {...field}
                value={field.value || ""}
                // label={t(label)}
                variant="outlined"
                fullWidth
                select={select || options}
                multiline={multiline || rows}
                rows={rows}
                error={error}
                helperText={error?.message}
                InputProps={{
                  endAdornment: endAdornment,
                }}
              >
                {options?.map((option) => (
                  <MenuItem
                    key={option?.value || option}
                    value={option?.value || option}
                    // sx={{ fontSize: "1.5rem" }}
                  >
                    {option?.label || option}
                  </MenuItem>
                ))}
              </TextField>
            );
          }}
        />
      </Box>
    </div>
  );
}

export function CustomAutoComplete({
  label,
  control,
  name,
  options,
  select,
  lf,
  tf,
  rows,
  multiline,
  multiple,
  placeholder,
  loading,
  ...props
}) {
  const { t } = useTranslation();

  return (
    <div className="d-flex mt-3">
      {label}

      <div style={{ flex: 12 || tf || 7 }} className="input-group">
        <Controller
          control={control}
          name={name}
          render={({ field, fieldState: { error } }) => {
            const { onChange, value, ref } = field;

            return (
              <Autocomplete
                {...field}
                // sx={{
                //   "& .MuiButton-root": { fontSize: "1.35rem" },
                //   "& .MuiInputBase-input": { fontSize: "1.5rem!important" },
                //   "& .MuiFormLabel-root": { fontSize: "1.5rem!important" },
                //   "& .MuiSvgIcon-root": { fontSize: "3rem!important" },
                // }}
                multiple={multiple}
                id="tags-outlined"
                options={options || []}
                getOptionLabel={(option) => option.name}
                filterSelectedOptions
                value={
                  value || !loading
                    ? multiple
                      ? options?.filter((option) => value?.includes(option?.id))
                      : options?.find((option) => value === option?.id) ?? null
                    : multiple
                    ? []
                    : null
                }
                onChange={(e, newValue) => {
                  multiple
                    ? onChange(newValue ? newValue?.map((nv) => nv.id) : null)
                    : onChange(newValue ? newValue.id : null);
                }}
                isOptionEqualToValue={(option, value) => {
                  return option["id"] === value["id"];
                }}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // label={t(label)}
                    placeholder={placeholder}
                    error={error}
                    helperText={error?.message}
                    fullWidth
                    inputRef={ref}
                  />
                )}
              />
            );
          }}
        />
      </div>
    </div>
  );
}

// export const CustomDateTimePicker = ({
//   label,
//   cg,
//   lg,
//   tg,
//   helperText,
//   options,
//   children,
//   value,
//   disabled,
//   // onChange,
//   noLabel,
//   small,
//   endAfterIcon,
//   startBeforeIcon,
//   name,
//   register,
//   setValue,
//   customStyle,

//   control,
//   tf,
//   ...otherProps
// }) => {
//   const { t } = useTranslation();

//   return (
//     <div className="d-flex mt-3">
//       <div style={{ flex: 12 || tf || 7 }} className="input-group">
//         <Controller
//           name={name}
//           control={control}
//           render={({ field, fieldState: { error } }) => {
//             const { value, onChange, ...other } = field;

//             return (
//               <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DesktopDatePicker
//                   {...other}
//                   flex={1}
//                   label={label}
//                   disabled={disabled}
//                   inputFormat="DD/MM/YYYY"
//                   value={dayjs(value)}
//                   onChange={(newValue) => {
//                     onChange(dayjs(newValue).toDate());
//                   }}
//                   sx={{
//                     width: "100%",
//                     "& .MuiButton-root": { fontSize: "1.35rem" },
//                     "& .MuiInputBase-input": { fontSize: "1.5rem!important" },
//                     "& .MuiFormLabel-root": { fontSize: "1.5rem!important" },
//                     "& .MuiSvgIcon-root": { fontSize: "3rem!important" },
//                   }}
//                   // textFiel
//                   renderInput={(params) => (
//                     <TextField
//                       fullWidth
//                       error={!!error}
//                       helperText={error?.message}
//                       label={t(label)}
//                       // sx={
//                       //   {
//                       //     "& .MuiFormControl-root": { width: "100%" },
//                       //     "& .MuiOutlinedInput-input": {
//                       //       padding: small
//                       //         ? "6px 10px!important"
//                       //         : "8.5px 10px!important",
//                       //     },
//                       //   }
//                       // small
//                       //   ? {
//                       //       ...datePickerStyle,
//                       //       "& .MuiOutlinedInput-input": {
//                       //         padding: small && "8px 10px",
//                       //         fontSize: small && ".85rem",
//                       //       },
//                       //     }
//                       //   : { ...datePickerStyle })
//                       // }
//                       {...params}
//                     />
//                   )}
//                 />
//               </LocalizationProvider>
//             );
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export const CustomTimePicker = ({
//   label,
//   cg,
//   lg,
//   tg,
//   helperText,
//   options,
//   children,
//   value,
//   disabled,
//   // onChange,
//   noLabel,
//   small,
//   endAfterIcon,
//   startBeforeIcon,
//   name,
//   register,
//   setValue,
//   customStyle,

//   control,
//   tf,
//   ...otherProps
// }) => {
//   const { t } = useTranslation();

//   return (
//     <div className="d-flex mt-3">
//       <div style={{ flex: 12 || tf || 7 }} className="input-group">
//         <Controller
//           name={name}
//           control={control}
//           render={({ field, fieldState: { error } }) => {
//             const { value, onChange, ...other } = field;

//             return (
//               <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DesktopTimePicker
//                   {...other}
//                   flex={1}
//                   label={label}
//                   disabled={disabled}
//                   inputFormat="DD/MM/YYYY"
//                   value={dayjs(value)}
//                   onChange={(newValue) => {
//                     onChange(dayjs(newValue).toDate());
//                   }}
//                   sx={{
//                     width: "100%",
//                     "& .MuiButton-root": { fontSize: "1.35rem" },
//                     "& .MuiInputBase-input": { fontSize: "1.5rem!important" },
//                     "& .MuiFormLabel-root": { fontSize: "1.5rem!important" },
//                     "& .MuiSvgIcon-root": { fontSize: "3rem!important" },
//                   }}
//                   // textFiel
//                   renderInput={(params) => (
//                     <TextField
//                       fullWidth
//                       error={!!error}
//                       helperText={error?.message}
//                       label={t(label)}
//                       // sx={
//                       //   {
//                       //     "& .MuiFormControl-root": { width: "100%" },
//                       //     "& .MuiOutlinedInput-input": {
//                       //       padding: small
//                       //         ? "6px 10px!important"
//                       //         : "8.5px 10px!important",
//                       //     },
//                       //   }
//                       // small
//                       //   ? {
//                       //       ...datePickerStyle,
//                       //       "& .MuiOutlinedInput-input": {
//                       //         padding: small && "8px 10px",
//                       //         fontSize: small && ".85rem",
//                       //       },
//                       //     }
//                       //   : { ...datePickerStyle })
//                       // }
//                       {...params}
//                     />
//                   )}
//                 />
//               </LocalizationProvider>
//             );
//           }}
//         />
//       </div>
//     </div>
//   );
// };

export const CustomRadio = ({
  label,
  cg,
  lg,
  tg,
  helperText,
  options,
  children,
  value,
  disabled,
  // onChange,
  noLabel,
  small,
  endAfterIcon,
  startBeforeIcon,
  name,
  register,
  setValue,
  customStyle,

  vertical,

  control,
  tf,
  ...otherProps
}) => {
  const { t } = useTranslation();

  return (
    <div className="d-flex mt-3">
      <div style={{ flex: 12 || tf || 7 }} className="input-group">
        <FormControl
          sx={{ flexDirection: !vertical && "row" }}
          variant="standard"
          error={true}
        >
          <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => {
              const { value, ...other } = field;

              return (
                <RadioGroup
                  {...other}
                  value={value || null}
                  aria-label="options"
                  size=""
                  row
                  sx={{ alignItems: "center" }}
                >
                  {options?.map((option) => (
                    <Stack key={option.label || option}>
                      <FormControlLabel
                        key={option.label || option}
                        sx={{
                          "& .MuiTypography-root": { fontSize: "1.5rem" },
                          ...otherProps,
                        }}
                        label={
                          <Typography sx={{ color: error && colors.red[500] }}>
                            {t(option.label || option)}
                          </Typography>
                        }
                        value={option.value || option}
                        control={
                          <Radio
                            size="medium"
                            sx={{ color: error && colors.red[500] }}
                            disabled={disabled}
                          />
                        }
                      />
                    </Stack>
                  ))}
                </RadioGroup>
              );
            }}
          />
        </FormControl>
      </div>
    </div>
  );
};

export function MyDropzone({
  label,
  cg,
  lg,
  tg,
  width,
  height,
  isImage,
  name,
  setValue,
  control,
  filesOverlap,
  imageOverlap,
  croppable,
  aspectRatio,
  multiple,
  folder,
  progress,
}) {
  const { t } = useTranslation();

  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [showCropper, setShowCropper] = useState(false);
  const [onFileChange, setOnFileChange] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const filePromises = acceptedFiles.map(async (file) => {
      return {
        name: file.name,
        size: file.size,
        url: URL.createObjectURL(file),
        uri: await fileToDataUri(file),
        type: file.type || "NA",
        file,
        fileName: uuidv4() + "." + file.type.split("/")[1],
      };
    });

    const files2 = await Promise.all(filePromises);

    if (multiple) {
      setValue(name, files2);
    } else {
      setValue(name, files2[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/gif": [".gif"],
    },
  });

  return (
    <>
      <Grid item xs={cg}>
        <Grid container alignItems="start">
          <Grid item xs={lg}>
            <Typography sx={{ fontSize: ".8rem", display: "inline" }}>
              {t(label)}
            </Typography>{" "}
            {progress > 0 && (
              <Typography
                component={"span"}
                sx={{ fontSize: ".8rem" }}
                color={progress >= 99.9 ? "green" : "success"}
              >
                ( Uploading : {progress} % )
              </Typography>
            )}
          </Grid>

          <Grid item xs={tg}>
            <Grid item xl={12}>
              <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => {
                  const { onChange } = field;

                  // setOnFileChange(onChange);

                  return (
                    <Dropzone
                      onDrop={async (acceptedFiles) => {
                        const filePromises = acceptedFiles.map(async (file) => {
                          return {
                            name: file.name,
                            size: file.size,
                            type: file.type || "NA",
                            url: URL.createObjectURL(file),
                            uri: await fileToDataUri(file),
                            file: file,
                            fileName:
                              // "http://api2.jpstvethiopia.com/" +
                              // folder +
                              uuidv4() + "." + file.type.split("/")[1],
                          };
                        });

                        const files = await Promise.all(filePromises);

                        if (multiple) {
                          onChange(files);
                          setAcceptedFiles(files);
                        } else {
                          onChange(files[0]);
                          setAcceptedFiles(files[0]);

                          if (croppable) {
                            setShowCropper(true);
                          }
                        }
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          sx={{
                            width: width,
                            height: height,
                          }}
                        >
                          <Box
                            sx={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              overflow: "hidden",
                              justifyContent:
                                !(filesOverlap && acceptedFiles?.length > 0) &&
                                "center",
                              alignItems:
                                !(filesOverlap && acceptedFiles?.length > 0) &&
                                "center",
                              cursor: "pointer",
                              border: 2,
                              borderColor: error ? "red" : "divider",
                              borderStyle: "dashed",
                              borderRadius: 1,
                              background: "rgb(242 242 242)",
                              "&:hover": {
                                border: 2,
                                borderColor: error
                                  ? "red"
                                  : "rgb(33, 150, 243)",
                                borderStyle: "dashed",
                              },
                            }}
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            {isImage &&
                              acceptedFiles?.name &&
                              !multiple &&
                              imageOverlap && (
                                <img
                                  height={"100%"}
                                  width={"auto"}
                                  style={{ zIndex: 1 }}
                                  src={
                                    multiple
                                      ? acceptedFiles[0]?.url
                                      : acceptedFiles?.url
                                  }
                                  alt={"selcted_" + name}
                                />
                              )}

                            {!isImage && acceptedFiles?.name && !multiple && (
                              <Stack
                                key={acceptedFiles?.name}
                                direction={"row"}
                                spacing={0}
                                alignItems={"center"}
                                sx={{
                                  border: 0,
                                  borderColor: "divider",
                                  borderRadius: 1,
                                  px: 1,
                                  py: 0.25,
                                }}
                              >
                                {/* <Icon123 color="success" /> */}
                                <Typography
                                  fontSize={".85rem"}
                                  flex={1}
                                  overflow={"hidden"}
                                  textOverflow={"ellipsis"}
                                >
                                  {acceptedFiles?.name}
                                </Typography>
                                {/* <Stack direction={"row"}>
                                  <IconLockOpen
                                    color="primary"
                                    sx={{ cursor: "pointer" }}
                                  />
                                  <IconX
                                    color="error"
                                    sx={{ cursor: "pointer" }}
                                  />
                                </Stack> */}
                              </Stack>
                            )}

                            {acceptedFiles.length > 0 && filesOverlap && (
                              <Stack spacing={0.5} p={2} width={"100%"}>
                                {acceptedFiles?.length > 0 &&
                                  acceptedFiles.map((image) => (
                                    <Stack
                                      key={image.name}
                                      direction={"row"}
                                      spacing={1.5}
                                      alignItems={"center"}
                                      sx={{
                                        border: 1,
                                        borderColor: "divider",
                                        borderRadius: 1,
                                        px: 1,
                                        py: 0.5,
                                      }}
                                    >
                                      <IconCheckbox color="success" />
                                      <Typography
                                        fontSize={".85rem"}
                                        flex={1}
                                        overflow={"hidden"}
                                        textOverflow={"ellipsis"}
                                      >
                                        {image.name}
                                      </Typography>
                                      <Stack direction={"row"}>
                                        <IconLockOpen
                                          color="primary"
                                          sx={{ cursor: "pointer" }}
                                        />
                                        <IconX
                                          color="error"
                                          sx={{ cursor: "pointer" }}
                                        />
                                      </Stack>
                                    </Stack>
                                  ))}
                              </Stack>
                            )}

                            <Stack
                              height={"100%"}
                              alignItems={"center"}
                              justifyContent={"center"}
                              display={
                                (acceptedFiles.length > 0 ||
                                  acceptedFiles?.name) &&
                                (imageOverlap || filesOverlap) &&
                                "none"
                              }
                            >
                              {isDragActive ? (
                                <Box textAlign={"center"}>
                                  {t(
                                    `Drop your ${
                                      isImage ? "image" : "file"
                                    } here`
                                  )}
                                </Box>
                              ) : (
                                <Box>
                                  <Stack alignItems="center">
                                    {!acceptedFiles?.name &&
                                      (isImage ? (
                                        <IconPictureInPicture
                                          sx={{
                                            fontSize: "2.5rem",
                                            color: grey[500],
                                          }}
                                        />
                                      ) : (
                                        <IconUpload
                                          sx={{
                                            fontSize: "2.5rem",
                                            color: grey[500],
                                          }}
                                        />
                                      ))}

                                    {!acceptedFiles?.name && (
                                      <Typography textAlign={"center"}>
                                        {t(
                                          `Drag your ${
                                            isImage ? "image" : "file"
                                          } or click here`
                                        )}
                                      </Typography>
                                    )}
                                  </Stack>
                                </Box>
                              )}
                            </Stack>
                          </Box>
                        </Box>
                      )}
                    </Dropzone>
                  );
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <ImageCropper2
        acceptedFiles={acceptedFiles}
        setAcceptedFiles={setAcceptedFiles}
        aspectRatio={aspectRatio}
        open={showCropper}
        onClose={() => setShowCropper(false)}
        multiple={multiple}
        setValue={setValue}
        name={name}
        folder={folder}
        // onChange={onFileChange}
      />
    </>
  );
}

export function fileToDataUri(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}
