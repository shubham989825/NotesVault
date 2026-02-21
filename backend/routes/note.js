import express from "express";
import Note from "../models/Note.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();


// 🔹 CREATE NOTE
router.post("/", protect, async (req, res) => {
  const { title, content } = req.body;

  const note = await Note.create({
    title,
    content,
    user: req.user._id
  });

  res.status(201).json(note);
});


// 🔹 GET USER NOTES
router.get("/", protect, async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});


// 🔹 DELETE NOTE
router.delete("/:id", protect, async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  if (note.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  await note.deleteOne();
  res.json({ message: "Note deleted" });
});

export default router;