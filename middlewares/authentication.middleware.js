import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);

    const user = await User.findById(decodedToken?._id);
    if (!user) {
      return next();
    }
    req.user = user;
    next();
  } catch (error) {
    return res.render("ErrorPage");
  }
};

export { verifyJWT };
