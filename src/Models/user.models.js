import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Passwords do not match",
      },
    },
    refreshToken: {
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    timeStamps: true,
  }
);

userSchema.pro("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});
userSchema.methods.isPasswordCorrect = async function (password) {
  if (!password) return null;
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAccessToken = async function () {
  const token = jwt.sign(
    { id: this._id, email: this.email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
  return token;
};
userSchema.methods.generateRefreshToken = async function () {
  const token = jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
  return token;
};

const User = mongoose.model("User", userSchema);
export default User;
