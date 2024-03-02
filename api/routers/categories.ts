import express from "express";
import Category from "../models/Category";
import { Types } from "mongoose";

const categoriesRouter = express.Router();

categoriesRouter.get("/", async (_req, res, next) => {
  try {
    const categories = await Category.find();
    return res.send(categories);
  } catch (e) {
    next(e);
  }
});

categoriesRouter.get("/:id", async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: "Wrong ObjectId!" });
    }

    const item = await Category.findById(_id);

    if (!item) {
      return res.status(404).send({ error: "Not found!" });
    }

    res.send(item);
  } catch (e) {
    next(e);
  }
});

export default categoriesRouter;
