import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { gray } from "../constants/color";
import {
  Close as CloseIcon,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  ManageAccounts as ManageAccountsIcon,
  Message as MessageIcon,
  Groups as GroupsIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { useLocation, Link as LinkComponent, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Title from "../shared/Title";
import { useAdminLogoutMutation } from "../../redux/api/api";

const Link = styled(LinkComponent)`
  text-decoration: none;
  color: black;
  padding: 1rem 2rem;
  border-radius: 2rem;

  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
`;

const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <ManageAccountsIcon />,
  },
  {
    name: "Chats",
    path: "/admin/chats",
    icon: <GroupsIcon />,
  },
  {
    name: "Messages",
    path: "/admin/messages",
    icon: <MessageIcon />,
  },
];

const SideBar = () => {
  const location = useLocation();
  const [adminLogout] = useAdminLogoutMutation();

  const logoutHandler = async () => {
    try {
      await adminLogout().unwrap();
      window.location.href = "/admin";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Stack width={"100%"} direction={"column"} p={"3rem"} spacing={"3rem"}>
      <Typography variant="h5" textTransform={"uppercase"}>
        Admin
      </Typography>

      <Stack spacing={"1rem"}>
        {adminTabs.map((tab) => (
          <Link
            to={tab.path}
            key={tab.path}
            sx={
              location.pathname === tab.path && {
                bgcolor: "black",
                color: "white",
                ":hover": { color: "white" },
              }
            }
          >
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              {tab.icon}
              <Typography variant="body1">{tab.name}</Typography>
            </Stack>
          </Link>
        ))}

        <Link onClick={logoutHandler}>
          <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
            <ExitToAppIcon />
            <Typography variant="body1">Logout</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};

const AdminLayout = ({ children }) => {
  const { isAdmin } = useSelector((state) => state.auth);
  const [isMobile, setIsMobile] = useState(false);

  const handleMobile = () => {
    setIsMobile(!isMobile);
  };

  const handleClose = () => {
    setIsMobile(false);
  };

  if (!isAdmin) return <Navigate to="/admin" />;

  return (
    <>
      <Title title={"admin"} />
      <Grid container minHeight={"100vh"}>
        <Box
          sx={{
            display: {
              xs: "block",
              md: "none",
            },
            position: "fixed",
            right: "1rem",
            top: "1rem",
          }}
        >
          <IconButton onClick={handleMobile} onClose={handleClose}>
            {isMobile ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>

        <Grid
          size={{ md: 4, lg: 3 }}
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          <SideBar />
        </Grid>
        <Grid
          size={{ xs: 12, md: 8, lg: 9 }}
          sx={{
            bgcolor: gray,
          }}
        >
          {children}
        </Grid>

        <Drawer open={isMobile} onClose={handleMobile}>
          <SideBar w="50vw" />
        </Drawer>
      </Grid>
    </>
  );
};

export default AdminLayout;
