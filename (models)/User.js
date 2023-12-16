import mongoose, { Schema, model, models } from "mongoose";

let isConnect = false;

try {
  mongoose.connect(process.env.MONGO_URI);
  mongoose.Promise = global.Promise;
  isConnect = true;
  console.log("connected");
} catch (error) {
  console.log(error.message);
}

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

//if dont have a user, then create it
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
