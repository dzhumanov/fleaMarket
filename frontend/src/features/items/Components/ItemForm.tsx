import React, { useState } from "react";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { ItemMutation } from "../../../types";
import FileInput from "../../../components/UI/FileInput/FileInput";
import { useAppSelector } from "../../../app/hooks";
import { selectCategories } from "../../categories/categoriesSlice";

interface Props {
  onSubmit: (mutation: ItemMutation) => void;
}

const ItemForm: React.FC<Props> = ({ onSubmit }) => {
  const categories = useAppSelector(selectCategories);

  const [state, setState] = useState<ItemMutation>({
    title: "",
    description: "",
    category: "",
    image: null,
    price: 0,
  });

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  return (
    <form autoComplete="off" onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            id="title"
            label="Title"
            value={state.title}
            onChange={inputChangeHandler}
            name="title"
            required
          />
        </Grid>

        <Grid item xs>
          <TextField
            multiline
            rows={3}
            id="description"
            label="Description"
            value={state.description}
            onChange={inputChangeHandler}
            name="description"
            required
          />
        </Grid>

        <Grid item xs>
          <FileInput
            label="Image"
            name="image"
            onChange={fileInputChangeHandler}
          />
        </Grid>

        <Grid item container xs spacing={2}>
          <Grid item xs>
            <TextField
              id="price"
              label="Price"
              type="number"
              value={state.price}
              onChange={inputChangeHandler}
              name="price"
              required
            />
          </Grid>
          <Grid item xs>
            <TextField
              select
              id="category"
              label="Category"
              value={state.category}
              onChange={inputChangeHandler}
              name="category"
              required
            >
              <MenuItem value="" disabled>
                Please select a category
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.title}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Grid item xs>
          <Button type="submit" color="primary" variant="contained">
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ItemForm;
