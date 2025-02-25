const expressAsyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const Watch = require("../model/watchModel");
const Note = require("../model/noteModel");

const getUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find();

  if (!users) {
    res.status(404);
    throw new Error("Users Not Found");
  }
  res.status(200).json(users);
});
const getWatches = expressAsyncHandler(async (req, res) => {
  const watches = await Watch.find();
  if (!watches) {
    res.status(404);
    throw new Error("Users Not Found");
  }
  res.status(200).json(watches);
});

const getNotes = expressAsyncHandler(async (req, res) => {
  const notes = await Note.find();
  if (!notes) {
    res.status(404);
    throw new Error("Notes Not Found");
  }
  res.status(200).json(notes);
});

const updatedWatches = expressAsyncHandler(async (req, res) => {
  const updatedWatches = await Watch.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  if (!updatedWatches) {
    res.status(404);
    throw new Error("Watches Not Found");
  }
  res.status(200).json(updatedWatches);
});
module.exports = { getUsers, getNotes, getWatches, updatedWatches };
