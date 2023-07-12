import * as React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Tooltip,
  styled as muiStyled,
  Stack,
  Container,
  TooltipProps,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Avatar from "@mui/material/Avatar/Avatar";
import Fade from "@mui/material/Fade";
import {
  Pending,
  ListAltOutlined,
  FolderSharedOutlined,
  AssignmentOutlined,
  HistoryEduOutlined,
  UploadFileOutlined,
  ManageHistoryOutlined,
  AccountBoxOutlined,
  HelpOutline,
} from "@mui/icons-material";
import TopBar from "./TopBar";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "@/hooks";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LocationPath } from "@/util/constants";

const drawerWidth = 300;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: 10,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "#EBF1F9",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DividerStyled = styled(Divider)({
  margin: "30px 0",
  background: "#fff",
});

export default function AdminLayout() {
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { chat, history, postManagement } = LocationPath.admin;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });
  const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    display: `${window.innerWidth < 720 && "none"}`,
    width: `calc(${theme.spacing(13)} + 1px)`,
    // width: 0,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(14)} + 1px)`,
    },
  });

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    "& .MuiPaper-root": {
      background: "#000",
      position: "relative",
      padding: "10px 20px",
      "::-webkit-scrollbar": {
        width: "3px",
      },
    },
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: `${!open ? "none" : "flex"} `,
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 0.5),
    height: "fit-content",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const ListTextStyled = styled(ListItemText)({
    display: open ? "block" : "none",
    whiteSpace: "nowrap",
    fontSize: "16px !important",
  });

  const ListItemIconStyled = styled(ListItemIcon)({
    display: "flex",
    justifyContent: open ? "flex-start" : "center",
  });

  const StyledTooltip = muiStyled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))`
    & .MuiTooltip-tooltip {
      padding: 10px;
      font-size: 14px;
      background: #fff;
      color: #000;
      display: ${open && "none"};
      translate: 5px;
      filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
    }
    & .MuiTooltip-tooltip:hover {
      background: #387AFF;
      color: #fff;
      cursor: pointer;
    }
  `;

  const StyledListBtn = styled(ListItemButton)({
    borderRadius: "15px",
    height: "48px",
    display: "flex",
    minHeight: 48,
    maxWidth: !open ? "50px" : "100%",
    justifyContent: "center",
    fontSize: "13px",
    px: 2.5,
    color: "#fff",
    "&.Mui-selected": {
      backgroundColor: "#2f3542",
    },
    ":hover": {
      backgroundColor: "#57606f",
    },
  });

  const StyledList = styled(List)({
    alignItems: "center",
    display: !open ? "flex" : "initial",
    flexDirection: "column",
    width: "100%",
  });

  const handleListItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container disableGutters sx={{ minWidth: "100%", overflowX: "hidden" }}>
        <Box sx={{ display: "flex" }}>
          <AppBar position="fixed" open={open} elevation={0}>
            <TopBar handleDrawerOpen={handleDrawerOpen} isOpen={open} />
          </AppBar>
          <Drawer variant="permanent" open={open} elevation={3}>
            <DrawerHeader>
              <IconButton
                onClick={handleDrawerClose}
                sx={{
                  ...(!open && { display: "none" }),
                  height: "fit-content",
                }}
              >
                <ChevronLeftIcon className="fill-white text-white" />
              </IconButton>
            </DrawerHeader>
            <Stack spacing={3} alignItems="center" padding="20px 0">
              {/* <img src={open ? logo : logoShort} alt="" /> */}
              <Avatar
                sx={{
                  width: 50,
                  height: 50,
                }}
                alt="Cindy Baker"
              />
              {open && (
                <Stack spacing={1} textAlign="center">
                  <Typography
                    maxWidth="200px"
                    color="#fff"
                    whiteSpace="normal"
                    fontWeight="bold"
                  >
                    {userInfo?.username}
                  </Typography>
                  <Typography
                    maxWidth="200px"
                    color="#fff"
                    whiteSpace="normal"
                    fontWeight="bold"
                  >
                    {userInfo?.roleName!}
                  </Typography>
                </Stack>
              )}
            </Stack>
            <DividerStyled />
            <StyledList aria-label="main mailbox folders">
              <h5 className="pb-3 text-blue-config">"Account"</h5>

              <Stack spacing={0.5}>
                <StyledListBtn
                  selected={pathname === postManagement}
                  onClick={() => handleListItemClick(postManagement)}
                >
                  <StyledTooltip
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 300 }}
                    title="Post Management"
                    placement="right"
                  >
                    <ListItemIconStyled>
                      <AccountBoxOutlined className="fill-white" />
                    </ListItemIconStyled>
                  </StyledTooltip>
                  <ListTextStyled primary="Post Management" />
                </StyledListBtn>
                <StyledListBtn
                  selected={pathname === history}
                  onClick={() => handleListItemClick(history)}
                >
                  <StyledTooltip
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 300 }}
                    title="History"
                    placement="right"
                  >
                    <ListItemIconStyled>
                      <AccountBoxOutlined className="fill-white" />
                    </ListItemIconStyled>
                  </StyledTooltip>
                  <ListTextStyled primary="History" />
                </StyledListBtn>
                <StyledListBtn
                  selected={pathname === chat}
                  onClick={() => handleListItemClick(chat)}
                >
                  <StyledTooltip
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 300 }}
                    title="Chat"
                    placement="right"
                  >
                    <ListItemIconStyled>
                      <AccountBoxOutlined className="fill-white" />
                    </ListItemIconStyled>
                  </StyledTooltip>
                  <ListTextStyled primary="Chat" />
                </StyledListBtn>
              </Stack>
            </StyledList>
            <DividerStyled />

            {/* <div className="absolute top-0 left-0 w-full h-full z-0 bg-gradient-to-br from-slate-800 to-stone-500"></div> */}
          </Drawer>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              pt: 3,
              background: "#EBF1F9",
              // height: 100,
              mt: 5,
              minHeight: "100vh",
              display: "flex",
              zIndex: 0,
            }}
          >
            <DrawerHeader />
            <Container maxWidth="xl">
              <Outlet />
            </Container>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
