import React, { useState } from "react";
import { Button, Menu, MenuItem, Typography, styled } from "@mui/material";
import { User } from "../../../types";
import { useAppDispatch } from "../../../app/hooks";
import { logoutUser } from "../../../features/users/usersSlice";
import { NavLink } from "react-router-dom";

interface Props {
  user: User;
}

const Link = styled(NavLink)({
  color: "#000",
  textDecoration: "none",
  "&:hover": {
    color: "#000",
  },
});

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={handleClick} sx={{ color: "#000", fontSize: "32px" }}>
        Hello, {user.username}
      </Button>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <Typography variant="h5" component="div" sx={{ textAlign: "center" }}>
            <Link to="/create">Sell something</Link>
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography variant="h5">Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
