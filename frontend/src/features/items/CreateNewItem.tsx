import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ItemMutation } from "../../types";
import { Container, Typography } from "@mui/material";
import { selectUser } from "../users/usersSlice";
import { useEffect } from "react";
import { createItem } from "./itemsThunk";
import ItemForm from "./Components/ItemForm";

const CreateNewItem = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  const onFormSubmit = async (ItemMutation: ItemMutation) => {
    try {
      await dispatch(createItem(ItemMutation)).unwrap();
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Container
      sx={{
        bgcolor: "#fff",
        pt: "30px",
        pb: "30px",
        border: "3px solid black",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h4">Create new post</Typography>
      <ItemForm onSubmit={onFormSubmit}/>
    </Container>
  );
};

export default CreateNewItem;
