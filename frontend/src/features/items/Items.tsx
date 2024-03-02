import { Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectItems } from "./itemsSlice";
import SingleItem from "./Components/SingleItem";
import { useEffect } from "react";
import { fetchByCategory, fetchItems } from "./itemsThunk";
import { useParams } from "react-router-dom";
import { selectSingleCategory } from "../categories/categoriesSlice";
import { fetchOneCategory } from "../categories/categoriesThunk";

const Items = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);
  const category = useAppSelector(selectSingleCategory);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchByCategory(id));
      dispatch(fetchOneCategory(id));
    } else {
      dispatch(fetchItems());
    }
  }, [dispatch, id]);

  return (
    <>
      {id ? (
        <Typography variant="h1" fontWeight="bold">
          {category?.title}
        </Typography>
      ) : (
        <Typography variant="h1" fontWeight="bold">
          Items
        </Typography>
      )}

      <Grid
        item
        container
        justifyContent="space-between"
        sx={{
          mt: "10px",
        }}
      >
        {items.map((item) => (
          <SingleItem item={item} key={item._id} />
        ))}
      </Grid>
    </>
  );
};

export default Items;
