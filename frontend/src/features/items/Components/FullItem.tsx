import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
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
    <Card sx={{ border: "3px solid black", borderRadius: "10px" }}>
      {loading ? (
        <Preloader loading={loading} />
      ) : (
        <>
          <CardMedia
            component="img"
            height="500"
            image={itemImage}
            alt={item?.title}
          />
          <CardContent>
            <Typography variant="h3">
              <span style={{ fontWeight: "bold" }}>{item?.price}</span> SOM
            </Typography>
            <Typography variant="h2" fontWeight="bold">
              {item?.title}
            </Typography>
            <Typography variant="h5">
              Category: {item?.category?.title}
            </Typography>
            <Typography variant="h4">{item?.description}</Typography>
            <Box mt={2}>
              <Typography variant="h3">Contacts:</Typography>
              <Typography variant="h5">
                Name: {item?.user.displayName}
              </Typography>
              <Typography variant="h5">
                Phone number: {item?.user.phoneNumber}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              onClick={handleGoBack}
              sx={{
                mr: "20px",
                fontSize: "32px",
                bgcolor: "#000",
                color: "#fff",
                "&:hover": {
                  bgcolor: "#fff",
                  color: "#000",
                },
                "&:active": {
                  bgcolor: "#000",
                  color: "#fff",
                },
              }}
            >
              Back
            </Button>
            {user?._id === item?.user?._id && (
              <Button
                variant="contained"
                onClick={handleDelete}
                sx={{
                  mr: "20px",
                  fontSize: "32px",
                  bgcolor: "#000",
                  color: "#fff",
                  "&:hover": {
                    bgcolor: "#fff",
                    color: "#000",
                  },
                  "&:active": {
                    bgcolor: "#000",
                    color: "#fff",
                  },
                }}
              >
                Delete item
              </Button>
            )}
          </CardActions>
        </>
      )}
    </Card>
  );
};

export default FullItem;
