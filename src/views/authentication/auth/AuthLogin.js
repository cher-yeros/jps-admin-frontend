import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { CustomTextField } from "../../../components/forms/theme-elements/CustomTextField";
import { LOGIN_USER } from "../../../graphql/user";
import { loginFinished } from "../../../redux/slices/authSlice";

const AuthLogin = ({ title, subtitle, subtext }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginUser, { loading }] = useMutation(LOGIN_USER);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm({
    mode: "all",
    resolver: validator,
    defaultValues: {},
  });

  const onSubmit = async () => {
    const isValid = await trigger(["email", "password"]);

    if (isValid)
      try {
        const { data } = await loginUser({
          variables: {
            input: {
              email: watch("email"),
              password: watch("password"),
            },
          },
        });

        dispatch(loginFinished(data?.loginUser));

        if (data?.loginUser?.user?.role === "admin") navigate("/");
        else navigate("/");

        reset();
        // toast.success("You have Successfully logged in!", { autoClose: 500 });
      } catch (error) {
        toast.error(error.message, {
          autoClose: 500,
        });
      }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
          >
            Email
          </Typography>
          <CustomTextField
            control={control}
            name={"email"}
            id="email"
            variant="outlined"
            type={"email"}
            fullWidth
          />
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField
            control={control}
            name={"password"}
            id="password"
            type="password"
            variant="outlined"
            fullWidth
          />
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remeber this Device"
            />
          </FormGroup>
          <Typography
            component={Link}
            to="/"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          //   component={Link}
          //   to="/"
          type="button"
          onClick={loading ? () => {} : onSubmit}
        >
          {loading ? "Loading..." : "Sign In"}
        </Button>
      </Box>
      {/* {subtitle} */}
    </>
  );
};

export default AuthLogin;

const validator = yupResolver(
  Yup.object().shape({
    email: Yup.string()
      .email("Enter a Valid Email!")
      .required("Email is required!"),
    password: Yup.string().required("Password is Required").min(6),
    // .matches(strongPasswordRegex, "Use strong passowrd"),
  })
);
