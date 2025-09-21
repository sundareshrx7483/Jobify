import mongoose from "mongoose";
import { ROLE } from "../utils/constants.js";

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
  },
  location: {
    type: String,
  },
  role: {
    type: String,
    enum: Object.values(ROLE),
  },
  avatar: { type: String },
  avatarPublicId: { type: String },
});

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

export default mongoose.model("User", UserSchema);
