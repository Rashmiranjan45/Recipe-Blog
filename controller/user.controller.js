import User from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "SOMETHING WENT WRONG WHILE GENERATING ACCESS OR REFRESH TOKEN"
    );
  }
};

// Registering User...
const registerUser = async (req, res) => {
  // Get value from req.body
  const { fullName, password, email } = req.body;
  // check the value are not empty..
  if ([fullName, password, email].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All field are required.");
  }
  console.log(req.file);
  // create the user and save into DB.
  const user = await User.create({
    fullName,
    email,
    password,
    avatar: `/uploads/${req.file.filename}`,
  });

  if (!user) {
    throw new ApiError(500, "Something went wrong !");
  }
  // after successful signup send user to login page..
  return res.redirect("/api/v1/user/login");
};

//Signup page..
const signupUser = (req, res) => {
  res.render("register");
};

// Login page
const loginUser = (req, res) => {
  res.render("login");
};

const userLoggedIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // if user is not available redirect to login page again..
    if (!user) {
      return res.redirect("/api/v1/user/login");
    }
    // check the password user entered with password stored in DB....
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new ApiError(400, "INVALID CREDENTIALS");
    }

    const { accessToken, refreshToken } = await generateAccessRefreshToken(
      user._id
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    console.log(req.cookies);
    return res
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .redirect("/api/v1/recipe/");
  } catch (error) {
    console.log("Try Again Later...!", error);
  }
};

const logutUser = async (req, res) => {
  return res.clearCookie("accessToken").redirect("/api/v1/recipe/");
};

export { registerUser, signupUser, loginUser, userLoggedIn, logutUser };
