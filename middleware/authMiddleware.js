// const expressAsyncHandler = require("express-async-handler");
// const jwt = require("jsonwebtoken");
// const User = require("../model/userModel");

// const protect = expressAsyncHandler(async (req, res, next) => {
//   try {
//     let token = "";

//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith("Bearer")
//     ) {
//       token = req.headers.authorization.split(" ")[1];

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       const user = await User.findById(decoded.id).select("-password");

//       if (!user) {
//         res.status(401);
//         throw new Error("Invalid User");
//       }
//       req.user = user;

//       next();
//     } else {
//       res.status(401);
//       throw new Error("UnAuthorized Access : No Token Found");
//     }
//   } catch (error) {
//     res.status(401);
//     throw new Error("UnAuthorized Access : No Token Found");
//   }
// });

// module.exports = protect;









const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const protect = expressAsyncHandler(async (req, res, next) => {
  try {
    let token = "";

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      console.log("Token received:", token); // Debugging Token

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded JWT:", decoded); // Debugging Decoded JWT

      const user = await User.findById(decoded.id).select("-password");
      console.log("User found in DB:", user); // Debugging User

      if (!user) {
        console.error("Error: User not found");
        res.status(401);
        throw new Error("Invalid User");
      }

      req.user = user; // Attach user to request
      next(); // Move to next middleware or route handler
    } else {
      console.error("Error: No token found in headers");
      res.status(401);
      throw new Error("UnAuthorized Access : No Token Found");
    }
  } catch (error) {
    console.error("Middleware Error:", error.message);
    res.status(401);
    throw new Error("UnAuthorized Access : No Token Found");
  }
});

module.exports = protect;
