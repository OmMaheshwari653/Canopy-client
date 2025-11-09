import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import {
  Box,
  Container,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import AdminLayout from "../../components/layout/AdminLayout";
import { DoughnutChart, LineChart } from "../../components/specific/Charts";
import {
  CurveButton,
  SearchField,
} from "../../components/styles/StyledComponents";
import { useErrors } from "../../hooks/hook";
import { useGetDashboardStatsQuery } from "../../redux/api/api";

const Dashboard = () => {
  const { data, isLoading, isError, error } = useGetDashboardStatsQuery();

  const { stats } = data || {};

  useErrors([
    {
      isError: isError,
      error: error,
    },
  ]);

  const AppBar = (
    <Paper
      elevation={3}
      sx={{
        padding: { xs: "1rem", sm: "1.5rem", md: "2rem" },
        margin: { xs: "1rem 0", md: "2rem 0" },
        borderRadius: "1rem",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: "1rem", sm: "1rem" }}
        alignItems={{ xs: "stretch", sm: "center" }}
      >
        <AdminPanelSettingsIcon
          sx={{ fontSize: { xs: "2.5rem", md: "3rem" } }}
        />
        <SearchField
          placeholder="Search.."
          sx={{
            flex: { xs: 1, sm: "auto" },
            minWidth: { xs: "100%", sm: "200px" },
          }}
        />
        <CurveButton sx={{ alignSelf: { xs: "stretch", sm: "auto" } }}>
          Search
        </CurveButton>
        <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }} />
        <Typography
          display={{
            xs: "none",
            lg: "block",
          }}
          color="rgba(0, 0, 0, 0.7)"
          textAlign={"center"}
          sx={{ whiteSpace: "nowrap" }}
        >
          {moment().format("dddd, D M YYYY,")}
        </Typography>
        <NotificationsIcon />
      </Stack>
    </Paper>
  );

  const Widgets = (
    <Container component="main" sx={{ mt: 4, mb: 4 }}>
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        spacing={"2rem"}
      >
        <Widget
          title={"Users"}
          value={stats?.usersCount}
          Icon={<PersonIcon />}
        />
        <Widget
          title={"Chats"}
          value={stats?.totalChatsCount}
          Icon={<GroupIcon />}
        />
        <Widget
          title={"Messages"}
          value={stats?.messagesCount}
          Icon={<MessageIcon />}
        />
      </Stack>
    </Container>
  );

  return (
    <AdminLayout>
      {isLoading ? (
        <Skeleton />
      ) : (
        <Container component="main">
          {AppBar}
          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={{ xs: "2rem", md: "2rem" }}
            alignItems={{ xs: "stretch", lg: "flex-start" }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: { xs: "1.5rem", md: "2rem 3.5rem" },
                borderRadius: "1rem",
                width: "100%",
                maxWidth: { xs: "100%", lg: "45rem" },
                flex: { lg: "1 1 65%" },
              }}
            >
              <Typography margin={"2rem 0"} variant="h4">
                Last Messages
              </Typography>
              <LineChart value={stats?.messagesChart || []} />
            </Paper>

            <Paper
              elevation={3}
              sx={{
                padding: "1rem",
                borderRadius: "1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                maxWidth: { xs: "100%", lg: "25rem" },
                flex: { lg: "1 1 35%" },
                position: "relative",
                minHeight: { xs: "300px", md: "400px" },
              }}
            >
              <DoughnutChart
                labels={["Single Chats", "Group Chats"]}
                value={[
                  stats?.totalChatsCount - stats?.groupsCount || 0,
                  stats?.groupsCount || 0,
                ]}
              />
              <Stack
                position={"absolute"}
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                spacing={"0.5rem"}
                width={"100%"}
                height={"100%"}
              >
                <GroupIcon />
                <Typography>Vs</Typography>
                <PersonIcon />
              </Stack>
            </Paper>
          </Stack>
          {Widgets}
        </Container>
      )}
    </AdminLayout>
  );
};

const Widget = ({ title, value, Icon }) => (
  <Paper
    elevation={3}
    sx={{
      padding: "2rem",
      borderRadius: "1.5rem",
      width: { xs: "100%", sm: "13rem" },
      maxWidth: "13rem",
    }}
  >
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography
        sx={{
          color: "rgba(0, 0, 0, 0.7)",
          borderRadius: "50%",
          border: "5px solid rgba(0, 0, 0, 0.9)",
          width: "5rem",
          height: "5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {value}
      </Typography>
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        {Icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
);

export default Dashboard;
