const expressAsyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const Watch = require("../model/watchModel");

const getComplaints = expressAsyncHandler(async (req, res) => {
  // check User Using JWT

  const user = await User.findById(req.user._id.toString());

  if (!user) {
    res.status(401);
    throw new Error("Invalid User Data");
  }

  // get more compliants in oneClick

  const complaints = await Watch.find({ user: user._id.toString() });

  if (!complaints) {
    res.status(404);
    throw new Error("Complaints Not Found");
  }

  res.status(200).json(complaints);
});

const getComplaint = expressAsyncHandler(async (req, res) => {
  // res.send("Get Complaint");

  // check User Using JWT

  // const user = await User.findById(req.user._id.toString());
  // console.log("helllo", 33);

  // if (!user) {
  //   res.status(401);
  //   throw new Error("Invalid User Data");
  // }

  // get more compliants in oneClick

  const complaint = await Watch.findById(req.params.id);

  if (!complaint) {
    res.status(401);
    throw new Error("Complaint Not Found");
  }

  res.status(200).json(complaint);
});

const raiseComplaints = expressAsyncHandler(async (req, res) => {
  // Make Sure fill All details

  const { watch, description, registration } = req.body;

  if (!watch || !description || !registration) {
    res.status(400);
    throw new Error("Please fill All Details");
  }

  // check User Using JWT

  const user = await User.findById(req.user._id.toString());

  if (!user) {
    res.status(401);
    throw new Error("Invalid User Data");
  }

  //   Create complaint

  const complaint = await Watch.create({
    user: user._id,
    watch: watch,
    registration: registration,
    description: description,
    status: "open",
  });

  if (!complaint) {
    res.status(400);
    throw new Error("Complaint Not created");
  } else {
    console.log(complaint);
    res.status(201).json(complaint);
  }
});

// const closeComplaint = expressAsyncHandler(async (req, res) => {
//   // res.send("Complaint updated");

//   // check User Using JWT

//   const user = await User.findById(req.user._id.toString());

//   if (!user) {
//     res.status(401);
//     throw new Error("Invalid User Data");
//   }

//   const updatedComplaint = await Watch.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );

//   if (!updatedComplaint) {
//     res.status(400);
//     throw new Error("Complaint Not Update");
//   }
//   res.status(201).json(updatedComplaint);
// });

const closeComplaint = expressAsyncHandler(async (req, res) => {
  // Check User Using JWT

  const user = await User.findById(req.user._id.toString());

  if (!user) {
    res.status(401);
    throw new Error("Invalid User Data");
  }

  const updatedComplaint = await Car.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!updatedComplaint) {
    res.status(400);
    throw new Error("Complaint Not Updated");
  }

  res.status(201).json(updatedComplaint);
});

module.exports = {
  getComplaint,
  getComplaints,
  raiseComplaints,
  closeComplaint,
};
