const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const adminProtect = expressAsyncHandler(async (req, res, next) => {
  try {
    let token = "";

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      let user = await User.findById(decoded.id).select("-password");

      if (!user) {
        res.status(400);
        throw new Error("user Not Found");
      }

      if (user.isAdmin) {
        req.user = user;
        next();
      } else {
        throw new Error("you are Not Found");
      }
    } else {
      throw new Error("Token Not Found");
    }
  } catch (error) {
    throw new Error("Token Not Found : UnAuthorized Access");
  }
});

module.exports = adminProtect;
