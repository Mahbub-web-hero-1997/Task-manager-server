import User from "../Models/user.models.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponse from "../Utils/ApiResponse.js";

// Generate Access and Refresh Token

const generateAccessAndRefreshToken = async (uId) => {
  try {
    const user = await User.findById(uId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Failed to generate access or refresh token");
  }
};

// User Register Function
const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  console.log(req.body);
  //   Body Data Validation
  if ((!name, !email, !password, !confirmPassword)) {
    throw new ApiError(400, "All fields are required");
  }
  if (
    [name, email, password, confirmPassword].some(
      (field) => field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields must have some value");
  }
  //   Check Existing User
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "Email already exists");
  }
  if (password !== confirmPassword) {
    throw new ApiError(400, "Password do not match");
  }
  //   Create user
  const user = await User.create({
    name,
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
// Login User function

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  //   Check Validation
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid Password");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };
  res
    .status(200)
    .cookie(accessToken, options)
    .cookie(refreshToken, options)
    .json(
      new ApiResponse(200, { user: loggedInUser }, "User loggedIn successfully")
    );
};

export { registerUser, loginUser };
