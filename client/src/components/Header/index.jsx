import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { logout, selectIsAuth } from "../../redux/slices/auth";
import {
  styled,
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Button,
  Stack,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import AddIcon from "@mui/icons-material/Add";
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});
export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm("Are you sure you wont to logout?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };
  if (true) {
    return (
      <Box sx={{ flexGrow: 1, mb: 1 }}>
        <AppBar elevation={0} position="static">
          <StyledToolbar>
            <Link style={{ textDecoration: "none" }} to={"/"}>
              <Button size="large" variant="contained">
                BLOG
              </Button>
            </Link>
            {isAuth ? (
              <Stack direction="row" spacing={2}>
                <Link style={{ textDecoration: "none" }} to="/add-post">
                  <Button
                    sx={{
                      display: { xs: "none", sm: "flex" },
                    }}
                    variant="contained"
                  >
                    Add post
                  </Button>
                  <IconButton sx={{ display: { xs: "flex", sm: "none" } }}>
                    <AddIcon />
                  </IconButton>
                </Link>
                <IconButton onClick={onClickLogout}>
                  <LogoutIcon />
                </IconButton>
              </Stack>
            ) : (
              <Stack direction="row" spacing={2}>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "white",
                    marginTop: "3px",
                  }}
                  to="/register"
                >
                  <Button variant="contained">Register</Button>
                </Link>

                <IconButton>
                  <Link style={{ color: "white" }} to={"/login"}>
                    <LoginIcon />
                  </Link>
                </IconButton>
              </Stack>
            )}
          </StyledToolbar>
        </AppBar>
      </Box>
    );
  }

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Write an article</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Crate account</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
