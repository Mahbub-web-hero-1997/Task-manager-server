import User from "../Models/user.models.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponse from "../Utils/ApiResponse.js";

const registerUser = async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;
  //   Body Data Validation
  if ((!fullName, !email, !password, !confirmPassword)) {
    throw new ApiError(400, "All fields are required");
  }
  if (
    [fullName, email, password, confirmPassword].some(
      (field) => field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields must have some value");
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "Email already exists");
  }
  if (password !== confirmPassword) {
    throw new ApiError(400, "Password do not match");
  }
  const user = await User.create({
    fullName,
    email,
    password,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Failed to register User");
  }
  res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User successfully registered"));
};

export { registerUser };
