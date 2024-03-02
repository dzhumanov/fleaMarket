import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectItems, selectItemsLoading } from "./itemsSlice";
import { fetchByCategory, fetchItems } from "./itemsThunk";
import { useParams } from "react-router-dom";

import { selectSingleCategory } from "../categories/categoriesSlice";
import { fetchOneCategory } from "../categories/categoriesThunk";

import { Grid, Typography } from "@mui/material";
import SingleItem from "./Components/SingleItem";
import Preloader from "../../components/UI/Preloader/Preloader";

const Items = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);
  const loading = useAppSelector(selectItemsLoading);
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

      {loading ? (
        <Preloader loading={loading} />
      ) : (
        <Grid
          item
          container
          justifyContent="space-between"
          sx={{
            mt: "10px",
          }}
        >
          {items.length > 0 ? (
            items.map((item) => <SingleItem item={item} key={item._id} />)
          ) : (
            <Typography variant="h3">No items yet</Typography>
          )}
        </Grid>
      )}
    </>
  );
};

export default Items;
