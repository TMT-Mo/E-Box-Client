import React, { useEffect } from "react";
import LanguageSelect from "../../../LanguageSelect";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popover,
} from "@mui/material";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Badge from "@mui/material/Badge";
import { useAuth, useDispatch, useSelector } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { LocationPath } from "@/util/constants";

interface Props {
  handleDrawerOpen: () => void;
  isOpen: boolean;
}

const TopBar: React.FC<Props> = (props) => {
  const { handleDrawerOpen, isOpen } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {logout} = useAuth()
  const {home} = LocationPath.general
  const { userInfo } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOutHandler = () => {
    logout();
  };



  return (
    <div className="flex py-6 px-8 justify-between items-center  md:px-36">
      <IconButton
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="end"
        sx={{
          // marginLeft: 15,
          ...(isOpen && { opacity: "0", cursor: "unset" }),
          fill: "#000",
          scale: '120%'
        }}

      >
        <MenuIcon/>
      </IconButton>
      <div className="flex space-x-5 scale-110">

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
                    <MenuItem onClick={() => navigate(home)}>
                      <ListItemIcon>
                        <LockPersonIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                      >
                        Student mode
                      </ListItemText>
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <LockPersonIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                      >
                        Change password
                      </ListItemText>
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
      </div>
    </div>
  );
};

export default TopBar;
