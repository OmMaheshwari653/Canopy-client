import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography } from "@mui/material";
import { gray } from "../components/constants/color";

const Home = () => {
  return (
    <Box
      bgcolor={`${gray}`}
      height={"100%"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Typography variant="h5" p={"3rem"} textAlign={"center"}>
        Select a chat to start messaging
      </Typography>
    </Box>
  );
};

export default AppLayout()(Home);
