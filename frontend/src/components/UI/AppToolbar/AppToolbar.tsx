import { NavLink } from "react-router-dom";
import { AppBar, Grid, styled, Toolbar, Typography } from "@mui/material";
import { useAppSelector } from "../../../app/hooks";
import { selectUser } from "../../../features/users/usersSlice";
import UserMenu from "./UserMenu";
import AnonymousMenu from "./AnonymousMenu";

const Link = styled(NavLink)({
  color: "#000",
  textDecoration: "none",
  "&:hover": {
    color: "#000",
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#fff" }}>
      <Toolbar sx={{ width: "65%", margin: "auto" }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h3" component="div" sx={{ textAlign: "center" }}>
            <Link to="/">Home</Link>
          </Typography>
          <Grid item>
            {user ? <UserMenu user={user} /> : <AnonymousMenu />}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
