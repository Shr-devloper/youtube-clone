import express from "express";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * ADD COMMENT (Protected)
 */
router.post("/:videoId", protect, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const video = await Video.findById(req.params.videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const comment = await Comment.create({
      text,
      user: req.userId,
      video: req.params.videoId,
    });

    res.status(201).json({
      message: "Comment added",
      comment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * GET COMMENTS FOR A VIDEO
 */
router.get("/:videoId", async (req, res) => {
  try {
    const comments = await Comment.find({ video: req.params.videoId })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * UPDATE COMMENT (Protected)
 */
router.put("/:commentId", protect, async (req, res) => {
  try {
    const comment = await Comment.findOne({
      _id: req.params.commentId,
      user: req.userId,
    });

    if (!comment) {
      return res.status(403).json({ message: "Not authorized" });
    }

    comment.text = req.body.text || comment.text;
    await comment.save();

    res.json({ message: "Comment updated", comment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * DELETE COMMENT (Protected)
 */
router.delete("/:commentId", protect, async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete({
      _id: req.params.commentId,
      user: req.userId,
    });

    if (!comment) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
