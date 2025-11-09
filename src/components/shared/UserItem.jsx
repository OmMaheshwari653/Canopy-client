import { Avatar, IconButton, Stack, Typography, ListItem } from "@mui/material";
import React, { memo } from "react";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { transformImage } from "../../lib/features";

const UserItem = ({
  user,
  handler,
  handlerIsLoading,
  isAdded = false,
  styling = {},
}) => {
  const { name, _id, avatar } = user;

  return (
    <ListItem sx={{ px: { xs: 1, sm: 2 } }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={{ xs: "0.5rem", sm: "1rem" }}
        width={"100%"}
        sx={{
          ...styling,
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            transform: "translateY(-2px)",
          },
        }}
      >
        <Avatar src={transformImage(avatar)} />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            textOverflow: "ellipsis",
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
        >
          {name}
        </Typography>
        <IconButton
          onClick={() => handler(_id)}
          disabled={handlerIsLoading}
          size="small"
          sx={{
            bgcolor: isAdded ? "error.main" : "primary.main",
            color: "white",
            "&:hover": {
              bgcolor: isAdded ? "error.dark" : "primary.dark",
            },
            width: { xs: 32, sm: 36 },
            height: { xs: 32, sm: 36 },
          }}
        >
          {isAdded ? <RemoveIcon /> : <AddIcon />}
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
