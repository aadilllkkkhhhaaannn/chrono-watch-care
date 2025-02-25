const expressAsyncHandler = require("express-async-handler");
const User = require("../model/userModel");
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Make sure fields All details
  if (!name || !email || !password) {
    res.status(404);
    throw new Error("Please Fill All Details");
  }

  // Check if user Already exist
  const userExist = await User.findOne({ email: email });

  if (userExist) {
    res.status(400);
    throw new Error("User Already Exist");
  }

  // Hash password
  // const salt = bcrypt.genSaltSync(10);
  // const hashedPassword = bcrypt.hashSync(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    // password: hashedPassword,
  });

  if (!user) {
    res.status(401);
    throw new Error("User cannot be Registered");
  }

  // Add a delay before sending response
  setTimeout(() => {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: email,
      token: genrateToken(user._id),
    });
  }, [1000]);
});

const loginUser = expressAsyncHandler(async (req, res) => {
  // Make sure fields All details
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(404);
    throw new Error("Please fill all details");
  }

  const user = await User.findOne({ email });

  // Match the password
  if (user && (password, user.password)) {
    // Add a delay before sending response
    setTimeout(() => {
      res.status(200).json({
        id: user._id,
        name: user.name,
        email: email,
        token: genrateToken(user._id),
        isAdmin: user.isAdmin,
      });
    }, [1000]);
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

// Private Controller
const privateController = expressAsyncHandler(async (req, res) => {
  res.json({
    msg: "I am Private Controller",
  });
});

// Generate Token
const genrateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "40d", // Set token expiration time to 40 days
  });
};

module.exports = { registerUser, loginUser, privateController };
