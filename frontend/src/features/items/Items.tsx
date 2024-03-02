import { Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectItems } from "./itemsSlice";
import SingleItem from "./Components/SingleItem";
import { useEffect } from "react";
import { fetchItems } from "./itemsThunk";

const Items = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);
  return (
    <>
      <Grid
        item
        container
        spacing={2}
        justifyContent="space-between"
        sx={{
          mt: "10px",
          border: "3px solid black",
          bgcolor: "#fff",
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
