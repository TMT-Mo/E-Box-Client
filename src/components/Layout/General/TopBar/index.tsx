import styled from "@emotion/styled";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import logo from "@/assets/logo.png";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { LocationPath } from "@/util/constants";
const StyledTopBar = styled(
  Stack,
  {}
)({
  background: "transparent",
  padding: "2rem",
  justifyContent: "space-around",
  position: "absolute",
  zIndex: 20,
  flexDirection: 'row',
  width: '100%'
});

const TopBar = () => {
  const navigate = useNavigate()
  const {logout} = useAuth()
  const {postManagement} = LocationPath.admin
  const signOutHandler = () => {
    logout();
  };

  return (
    <StyledTopBar>
      <Stack direction="row" alignItems="center" spacing={3}>
        <img src={logo} className="w-8 h-8" />
        <Typography fontSize="1.5rem" color="#fff" fontWeight={600}>
          E-Box
        </Typography>
      </Stack>
      <PopupState variant="popover" popupId="demo-popup-popover">
        {(popupState) => (
          <div>
            <IconButton {...bindTrigger(popupState)}>
              <Avatar
                sx={{
                  width: 30,
                  height: 30,
                }}
                alt="Cindy Baker"
              />
            </IconButton>
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Paper sx={{ width: 220, maxWidth: "100%" }}>
                <MenuList>
                  <MenuItem onClick={() => navigate(postManagement)}>
                    <ListItemIcon>
                      <LockPersonIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Admin mode</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <LockPersonIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Change password</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={signOutHandler}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Sign out</ListItemText>
                  </MenuItem>
                </MenuList>
              </Paper>
            </Popover>
          </div>
        )}
      </PopupState>
    </StyledTopBar>
  );
};

export default TopBar;
