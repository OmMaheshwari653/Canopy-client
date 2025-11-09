import { Container, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

const Table = ({ rows, columns, heading, rowHeight }) => {
  return (
    <Container sx={{ height: "100vh", py: 2 }}>
      <Paper
        elevation={3}
        sx={{
          padding: { xs: "1rem", md: "1rem 4rem" },
          borderRadius: "1rem",
          margin: "auto",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: "none",
        }}
      >
        <Typography
          textAlign={"center"}
          variant="h4"
          sx={{
            margin: "2rem",
            textTransform: "uppercase",
          }}
        >
          {heading}
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={rowHeight}
          sx={{
            border: "none",
            flex: 1,
            ".table-header": {
              bgcolor: "black",
              color: "white",
            },
          }}
        />
      </Paper>
    </Container>
  );
};

export default Table;
