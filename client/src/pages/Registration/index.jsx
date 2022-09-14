import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import styles from "./Login.module.scss";

export const Registration = () => {
  const inputFileRef = React.useRef(null);
  const [selectedFile, setSelectedFile] = React.useState("");
  const [preview, setPreview] = React.useState("");
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
    mode: "onChange",
  });

  React.useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || !e.target.files.length) {
      setSelectedFile("");
      return;
    }
    setSelectedFile(e.target.files[0]);
    e.target.value = null;
  };

  const onSubmit = async (value) => {
    const formData = new FormData();
    formData.append("email", value.email);
    formData.append("password", value.password);
    formData.append("fullName", value.fullName);
    formData.append("image", selectedFile);
    const data = await dispatch(fetchRegister(formData));
    if (!data.payload) {
      alert("Failed to register");
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
        Create account
      </Typography>
      <Avatar
        onClick={() => inputFileRef.current.click()}
        src={preview}
        sx={{ width: 100, height: 100, margin: "10px auto 20px" }}
      />
      <input
        ref={inputFileRef}
        type="file"
        onChange={onSelectFile}
        accept=".jpg,.png,.jpeg"
        hidden
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register("fullName", { required: "Enter your full name" })}
          label="Full name"
          fullWidth
        />
        <TextField
          className={styles.field}
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register("email", { required: "Enter your email" })}
          label="E-Mail"
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Password"
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
          Register
        </Button>
      </form>
    </Paper>
  );
};
