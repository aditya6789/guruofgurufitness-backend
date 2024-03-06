import CustomErrorHandler from "../services/CustomErrorHandler.js";
import JwtService from "../services/JwtService.js";

const auth = async (req, res, next) => {
  let authHeader = req.headers.authorization;

  if (!authHeader) {
    console.log("Authorization header missing");
    return next(CustomErrorHandler.unAuthorized());
  }

  console.log("Authorization header:", authHeader);

  try {
    const token = authHeader.split(" ")[1];
    console.log("Token:", token);

    const decodedToken = JwtService.verify(token);

    if (!decodedToken || !decodedToken._id || !decodedToken.role) {
      console.log("Invalid decoded token");
      return next(CustomErrorHandler.unAuthorized());
    }

    const user = {
      _id: decodedToken._id,
      role: decodedToken.role,
    };

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // Handle token expiration gracefully
      console.log("Token expired");
      return next(CustomErrorHandler.unAuthorized("Token expired"));
    } else {
      console.error("JWT verification error:", error);
      return next(CustomErrorHandler.unAuthorized());
    }
  }
};

export default auth;
