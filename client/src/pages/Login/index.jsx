import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  Typography,
  TextField,
  Paper,
  Button,
  Box,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const [loginError, setLoginError] = React.useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (value) => {
    setLoginError(false);
    const data = await dispatch(fetchAuth(value));
    if (!data.payload) {
      setLoginError(true);
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to={"/"} />;
  }
  return (
    <Paper elevation={0} classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register("email", { required: "Enter your email" })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Enter your password" })}
          fullWidth
        />

        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Enter
        </Button>
        {loginError && (
          <Stack direction="row" justifyContent="center">
            <Typography variant="h7" sx={{ color: "red", p: 0.5 }}>
              Wrong login or password!
            </Typography>
          </Stack>
        )}
      </form>
    </Paper>
  );
};
