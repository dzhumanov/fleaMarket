import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectCategories } from "../../../features/categories/categoriesSlice";
import { fetchCategories } from "../../../features/categories/categoriesThunk";
import { Grid, Typography, styled } from "@mui/material";
import { NavLink } from "react-router-dom";

const Link = styled(NavLink)({
  color: "#000",
  textDecoration: "none",
  "&:hover": {
    color: "#000",
  },
});

const NavBar = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <Grid container direction="column" sx={{ mt: "40px" }}>
        <Typography variant="h3" component="div" sx={{ textAlign: "center" }}>
          <Link to={`/`}>All</Link>
        </Typography>
        {categories.map((category) => (
          <Typography
            key={category._id}
            variant="h4"
            component="div"
            sx={{ textAlign: "center" }}
          >
            <Link to={`/category/${category._id}`}>{category.title}</Link>
          </Typography>
        ))}
      </Grid>
    </>
  );
};

export default NavBar;
