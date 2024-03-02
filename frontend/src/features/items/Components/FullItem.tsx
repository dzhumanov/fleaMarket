import { Box, Button, Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { apiURL } from "../../../constants";
import Preloader from "../../../components/UI/Preloader/Preloader";
import { deleteItem, fetchOneItem } from "../itemsThunk";
import { selectSingleItem, selectSingleItemLoading } from "../itemsSlice";
import { selectUser } from "../../users/usersSlice";

const FullItem = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id?: string }>();
  const item = useAppSelector(selectSingleItem);
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectSingleItemLoading);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleDelete = async () => {
    if (id) {
      await dispatch(deleteItem(id));
      navigate(-1);
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchOneItem(id));
    }
  }, [id, dispatch]);

  let itemImage;

  if (item?.image) {
    itemImage = apiURL + "/" + item.image;
  }
  return (
    <>
      <Grid container>
        {loading ? (
          <Preloader loading={loading} />
        ) : (
          <Grid
            container
            direction="column"
            sx={{
              bgcolor: "#fff",
              mb: "20px",
              border: "3px solid black",
              borderRadius: "10px",
              py: "20px",
            }}
          >
            <Grid item>
              <Box
                component="img"
                sx={{
                  display: "block",
                  maxWidth: "100%",
                  marginX: "auto",
                }}
                src={itemImage}
              />
            </Grid>
            <Grid item container alignItems="center">
              <Grid item lg={6} sx={{ ml: "30px" }}>
                <Typography variant="h1">{item?.title}</Typography>
                <Typography variant="h5">
                  Category: {item?.category?.title}
                </Typography>
                <Typography variant="h5">
                  Price:{" "}
                  <span style={{ fontWeight: "bold" }}>{item?.price}</span> SOM
                </Typography>
                <Typography variant="h4">{item?.description}</Typography>
              </Grid>
              <Grid item lg={3} container direction="column">
                <Grid item>
                  <Typography variant="h3">Contacts:</Typography>
                </Grid>
                <Grid item container direction="column">
                  <Typography variant="h5">
                    Name: {item?.user.displayName}
                  </Typography>
                  <Typography variant="h5">
                    Phone number: {item?.user.phoneNumber}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container xs>
              <Button
                variant="contained"
                onClick={handleGoBack}
                sx={{ mr: "20px" }}
              >
                Back
              </Button>
              {user?._id === item?.user?._id && (
                <Button variant="contained" onClick={handleDelete}>Delete item</Button>
              )}
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default FullItem;
