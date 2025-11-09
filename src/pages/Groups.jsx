import React, { lazy, memo, Suspense, use, useEffect, useState } from "react";
import {
  Grid,
  Tooltip,
  IconButton,
  Box,
  Drawer,
  Stack,
  Typography,
  TextField,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import {
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
  Edit as EditIcon,
  Done as DoneIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import Title from "../components/shared/Title";
import { matblack } from "../components/constants/color";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../components/styles/StyledComponents";
import AvatarCard from "../components/shared/AvatarCard";
import { sampleChats, sampleUsers } from "../components/constants/sampleData";
import { useAsyncMutation, useErrors } from "../hooks/hook";
import { LayoutLoader } from "../components/layout/Loaders";
import {
  useAddGroupmembersMutation,
  useChatDetailsQuery,
  useDeleteChatMutation,
  useMyGroupsQuery,
  useRemoveGroupmemberMutation,
  useRenameGroupMutation,
} from "../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../redux/reducers/misc";

const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialogs/ConfirmDeleteDialog")
);

const AddMemberDialog = lazy(() =>
  import("../components/dialogs/AddMemberDialog")
);

const UserItem = lazy(() => import("../components/shared/UserItem"));

const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAddMember } = useSelector((state) => state.misc);

  const myGroups = useMyGroupsQuery("");

  const groupDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );

  const [updateGroup, isLoadingGroupName] = useAsyncMutation(
    useRenameGroupMutation
  );

  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(
    useRemoveGroupmemberMutation
  );

  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(
    useDeleteChatMutation
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");

  const [members, setmembers] = useState([]);

  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    },
  ];

  useErrors(errors);

  useEffect(() => {
    const groupData = groupDetails.data;
    if (groupData) {
      setGroupName(groupData.chat.name);
      setGroupNameUpdatedValue(groupData.chat.name);
      setmembers(groupData.chat.members);
    }
    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setmembers([]);
      setIsEdit(false);
    };
  }, [groupDetails.data]);

  const navigateBack = () => {
    navigate("/");
  };

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };

  const updateGroupName = () => {
    setIsEdit(false);
    updateGroup("Updating Group Name...", {
      chatId,
      name: groupNameUpdatedValue,
    }).then(() => {
      // Group list ko refresh karo
      myGroups.refetch();
      // Group details ko bhi refresh karo
      groupDetails.refetch();
    });
  };

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };

  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true));
  };

  // Line 159-172

  const deleteHandler = () => {
    deleteGroup("Deleting Group...", chatId);
    closeConfirmDeleteHandler();
    navigate("/groups");
  };

  const removeMemberHandler = (userId) => {
    removeMember("Removing member...", { chatId, userId });
  };

  // useEffect(() => {
  //   if (chatId) {
  //     setGroupName(`Group Name ${chatId}`);
  //     setGroupNameUpdatedValue(`Group Name ${chatId}`);
  //   }
  //   return () => {
  //     setGroupName("");
  //     setGroupNameUpdatedValue("");
  //     setIsEdit(false);
  //   };
  // }, [chatId]);

  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
          position: "fixed",
          right: "1rem",
          top: "1rem",
          zIndex: 1000,
        }}
      >
        <IconButton
          onClick={handleMobile}
          sx={{
            bgcolor: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            "&:hover": {
              bgcolor: "white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <Tooltip title="Back to Home">
        <IconButton
          sx={{
            position: "absolute",
            top: { xs: "1rem", sm: "2rem" },
            left: { xs: "1rem", sm: "2rem" },
            bgcolor: "#667eea",
            color: "white",
            boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
            "&:hover": {
              bgcolor: "#5568d3",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 16px rgba(102, 126, 234, 0.5)",
            },
            transition: "all 0.3s ease",
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupName = (
    <Box
      sx={{
        width: "100%",
        maxWidth: "45rem",
        bgcolor: "white",
        borderRadius: "16px",
        padding: { xs: "1.5rem", sm: "2rem" },
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        mb: 3,
        border: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      <Stack
        direction={"row"}
        alignItems="center"
        spacing={"1rem"}
        justifyContent={"center"}
      >
        {isEdit ? (
          <>
            <TextField
              value={groupNameUpdatedValue}
              onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
              variant="outlined"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />
            <IconButton
              onClick={updateGroupName}
              disabled={isLoadingGroupName}
              sx={{
                bgcolor: "#10b981",
                color: "white",
                "&:hover": {
                  bgcolor: "#059669",
                },
                "&:disabled": {
                  bgcolor: "rgba(16, 185, 129, 0.3)",
                },
              }}
            >
              <DoneIcon />
            </IconButton>
          </>
        ) : (
          <>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "700",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "1.5rem", sm: "2rem" },
              }}
            >
              {groupName}
            </Typography>
            <IconButton
              disabled={isLoadingGroupName}
              onClick={() => setIsEdit(true)}
              sx={{
                color: "#667eea",
                "&:hover": {
                  bgcolor: "rgba(102, 126, 234, 0.1)",
                },
              }}
            >
              <EditIcon />
            </IconButton>
          </>
        )}
      </Stack>
    </Box>
  );

  const ButtonGroup = (
    <Stack
      direction={{
        xs: "column-reverse",
        sm: "row",
      }}
      spacing={2}
      p={{
        xs: "1rem",
        sm: "1rem",
        md: "1rem 4rem",
      }}
      justifyContent={"center"}
    >
      <Button
        size="large"
        color="primary"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={openAddMemberHandler}
      >
        Add Member
      </Button>
      <Button
        size="large"
        color="error"
        variant="contained"
        startIcon={<DeleteIcon />}
        onClick={openConfirmDeleteHandler}
      >
        Delete Group
      </Button>
    </Stack>
  );

  return myGroups.isLoading ? (
    <LayoutLoader />
  ) : (
    <Grid container height={"100vh"} sx={{ bgcolor: "#f5f7fa" }}>
      <Grid
        size={{ sm: 4 }}
        height={"100%"}
        sx={{
          display: { xs: "none", sm: "block" },
          borderRight: "1px solid rgba(0,0,0,0.08)",
          bgcolor: "white",
        }}
      >
        <GroupsList myGroups={myGroups?.data?.groups} chatId={chatId} />
      </Grid>
      <Grid
        size={{ xs: 12, sm: 8 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: { xs: "1rem", sm: "2rem 3rem" },
          overflowY: "auto",
        }}
      >
        {IconBtns}
        {groupName && (
          <>
            {GroupName}

            <Box
              sx={{
                width: "100%",
                maxWidth: "45rem",
                bgcolor: "white",
                borderRadius: "16px",
                padding: { xs: "1.5rem", sm: "2rem" },
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 2 }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "700",
                    color: "#1f2937",
                    fontSize: { xs: "1.1rem", sm: "1.25rem" },
                  }}
                >
                  Group Members
                </Typography>
                <Box
                  sx={{
                    bgcolor: "#667eea",
                    color: "white",
                    px: 2,
                    py: 0.5,
                    borderRadius: "20px",
                    fontWeight: "600",
                    fontSize: "0.875rem",
                  }}
                >
                  {members.length}
                </Box>
              </Stack>

              <Stack
                spacing={{ xs: 1.5, sm: 2 }}
                sx={{
                  height: { xs: "35vh", sm: "40vh", md: "45vh" },
                  overflow: "auto",
                  pr: 1,
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "#f1f5f9",
                    borderRadius: "10px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "10px",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #5568d3 0%, #63398a 100%)",
                    },
                  },
                }}
              >
                {isLoadingRemoveMember ? (
                  <Box display="flex" justifyContent="center" py={4}>
                    <CircularProgress />
                  </Box>
                ) : members.length > 0 ? (
                  members.map((i) => (
                    <UserItem
                      user={i}
                      key={i._id}
                      isAdded
                      styling={{
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        padding: { xs: "0.8rem 1.2rem", sm: "1rem 2rem" },
                        borderRadius: "0.8rem",
                        bgcolor: "white",
                        border: "1px solid rgba(0,0,0,0.05)",
                        transition: "all 0.2s ease",
                      }}
                      handler={removeMemberHandler}
                    />
                  ))
                ) : (
                  <Typography textAlign="center" color="text.secondary" py={4}>
                    No members in this group
                  </Typography>
                )}
              </Stack>
            </Box>

            {ButtonGroup}
          </>
        )}
      </Grid>

      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog chatId={chatId} />
        </Suspense>
      )}

      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            open={confirmDeleteDialog}
            handleClose={closeConfirmDeleteHandler}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      )}

      <Drawer
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: "70vw", // ✅ Width thoda badha diya
            maxWidth: "300px", // ✅ Maximum width set kiya
            boxShadow: "0 8px 16px rgba(0,0,0,0.2)", // ✅ Better shadow
          },
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
        anchor="left" // ✅ Left side se open hoga
      >
        <GroupsList
          w={"100%"} // ✅ Full width use karo drawer ka
          myGroups={myGroups?.data?.groups}
          chatId={chatId}
        />
      </Drawer>
    </Grid>
  );
};

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack
    width={w}
    sx={{
      bgcolor: "bisque",
      height: "100vh",
      overflow: "auto",
      // ✅ Mobile drawer ke liye better padding
      padding: { xs: "0.5rem 0", sm: "0" },
    }}
  >
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem group={group} chatId={chatId} key={group._id} />
      ))
    ) : (
      <Typography textAlign="center" padding="1rem">
        No groups found
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;
  const navigate = useNavigate();

  const handleClick = () => {
    if (chatId !== _id) {
      navigate(`?group=${_id}`);
    }
  };

  return (
    <Stack
      direction={"row"}
      spacing={"1rem"}
      alignItems={"center"}
      onClick={handleClick}
      sx={{
        padding: "1rem",
        borderRadius: 0,
        transition: "all 0.3s ease",
        bgcolor: chatId === _id ? "black" : "unset",
        color: chatId === _id ? "white" : "black",
        cursor: "pointer",
        "&:hover": {
          bgcolor: chatId === _id ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.1)",
        },
        border: chatId === _id ? "2px solid black" : "2px solid transparent",
      }}
    >
      <AvatarCard avatar={avatar} />
      <Typography
        sx={{
          fontWeight: chatId === _id ? "bold" : "normal",
        }}
      >
        {name}
      </Typography>
    </Stack>
  );
});

export default Groups;
