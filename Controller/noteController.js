const expressAsyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const Watch = require("../model/watchModel");
const Note = require("../model/noteModel");

const getNotes = expressAsyncHandler(async (req, res) => {
  // Check User Using JWT

  const user = await User.findById(req.user._id.toString());

  const watch = await Watch.findById(req.params.wid);

  if (!user || !watch) {
    res.status(401);
    throw new Error("Invalid User Data");
  }

  const allNotes = await Note.findOne({ watch: req.params.wid });

  if (!allNotes) {
    res.status(404);
    throw new Error("Notes Not Found");
  }

  const getnote = await Note.findOne({ watch: req.params.wid });

  return res.status(200).json(getnote);

  // res.send("All Notes");
});

const addNotes = expressAsyncHandler(async (req, res) => {
  const { note } = req.body;

  if (!note) {
    res.status(400);
    throw new Error("Please fill all the details");
  }

  // Check User Using JWT
  const user = await User.findById(req.user._id.toString());
  const watch = await Watch.findById(req.params.wid);
  if (!user || !watch) {
    res.status(401);
    throw new Error("Invalid User Data");
  }

  // Create Note
  const newNote = await Note.create({
    user: req.user._id,
    watch: req.params.wid,
    note: note,
  });

  if (!note) {
    throw new Error("Note creation failed");
  }

  res.status(201).json(newNote);
});

module.exports = { getNotes, addNotes };
