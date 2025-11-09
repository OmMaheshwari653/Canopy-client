import { useInputValidation } from "6pp";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useAdminLoginMutation, useGetAdminQuery } from "../../redux/api/api";
import { useEffect } from "react";

const AdminLogin = () => {
  const { isAdmin } = useSelector((state) => state.auth);

  const [adminLogin] = useAdminLoginMutation();
  const { refetch } = useGetAdminQuery();

  const secretKey = useInputValidation("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await adminLogin(secretKey.value).unwrap();
      refetch();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isAdmin) return <Navigate to="/admin/dashboard" />;

  return (
    <Container
      component={"main"}
      maxWidth="xs"
      sx={{
        minHeight: "100vh", // allow the card to grow
        py: 4, // vertical padding so top/bottom edges stay visible
        display: "flex",
        justifyContent: "center",
        alignItems: "center", // keep the card at the top
        overflowY: "auto", // scroll if it is still too tall
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Admin Login
        </Typography>
        <form
          style={{
            width: "100%",
            marginTop: "1rem",
          }}
          onSubmit={submitHandler}
        >
          <TextField
            required
            fullWidth
            label="password"
            type="password"
            margin="normal"
            variant="outlined"
            value={secretKey.value}
            onChange={secretKey.changeHandler}
          />
          <Button
            sx={{ mt: 2 }}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AdminLogin;
