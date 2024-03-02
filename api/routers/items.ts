import express from "express";
import Item from "../models/Item";
import mongoose, { Types } from "mongoose";
import auth, { RequestWithUser } from "../middleware/auth";
import { imageUpload } from "../multer";

const itemsRouter = express.Router();

itemsRouter.get("/", async (req, res, next) => {
  try {
    const items = await Item.find()
      .populate("user", "username")
      .sort({ date: -1 });
    return res.send(items);
  } catch (e) {
    next(e);
  }
});

itemsRouter.get("/:id", async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: "Wrong ObjectId!" });
    }

    const item = await Item.findById(_id)
      .populate("user", "username displayName phoneNumber")
      .populate("category", "title");

    if (!item) {
      return res.status(404).send({ error: "Not found!" });
    }

    res.send(item);
  } catch (e) {
    next(e);
  }
});

itemsRouter.get("/category/:id", async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: "Wrong ObjectId!" });
    }

    const items = await Item.find({ category: _id }).populate(
      "user",
      "username"
    );

    if (!items) {
      return res.status(404).send({ error: "Not found!" });
    }

    return res.send(items);
  } catch (e) {
    next(e);
  }
});

itemsRouter.post(
  "/",
  auth,
  imageUpload.single("image"),
  async (req: RequestWithUser, res, next) => {
    try {
      const userId = req.user?._id;

      const itemData = {
        user: userId,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        image: req.file ? req.file.filename : null,
        price: req.body.price,
      };

      const item = new Item(itemData);

      await item.save();
      return res.send(item);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }
      next(e);
    }
  }
);

itemsRouter.delete("/:id", auth, async (req: RequestWithUser, res, next) => {
  try {
    const itemId = req.params.id;

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).send({ error: "Item not found!" });
    }

    if (item.user.toString() !== req.user?._id.toString()) {
      return res
        .status(403)
        .send({ error: "You have no rights to delete this item!" });
    }

    await Item.findByIdAndDelete(itemId);

    return res.send({ message: "Item deleted." });
  } catch (e) {
    next(e);
  }
});

export default itemsRouter;
