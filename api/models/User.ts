import mongoose, { Schema, HydratedDocument } from "mongoose";
import bcrypt from "bcrypt";
import { UserFields, UserModel } from "../types";
import { randomUUID } from "crypto";

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: async function (
          this: HydratedDocument<UserFields>,
          username: string
        ) {
          if (!this.isModified("username")) return true;
          const user = await User.findOne({ username: username });
          if (user) return false;
          return true;
        },
        message: "This user is already registered!",
      },
    },
    password: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

UserSchema.methods.checkPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

UserSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    delete ret.password;
    return ret;
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model<UserFields, UserModel>("User", UserSchema);

export default User;
