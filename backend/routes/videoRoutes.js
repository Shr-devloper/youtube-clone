import express from "express";
import Video from "../models/Video.js";
import Channel from "../models/Channel.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * CREATE VIDEO (Protected)
 */
router.post("/", protect, async (req, res) => {
  try {
    const {
      title,
      description,
      videoUrl,
      thumbnailUrl,
      category,
      channelId,
    } = req.body;

    if (!title || !videoUrl || !thumbnailUrl || !category || !channelId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const channel = await Channel.findOne({
      _id: channelId,
      owner: req.userId,
    });

    if (!channel) {
      return res.status(403).json({ message: "Not authorized to upload video" });
    }

    const video = await Video.create({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      category,
      channel: channelId,
      uploader: req.userId,
    });

    res.status(201).json({
      message: "Video uploaded successfully",
      video,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * GET ALL VIDEOS (Home Page)
 */
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find()
      .populate("channel", "channelName subscribers")

      .populate("uploader", "username")
      .sort({ createdAt: -1 });

    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * GET SINGLE VIDEO (Video Player Page)
 */
router.get("/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate("channel", "channelName")
      .populate("uploader", "username");

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * UPDATE VIDEO (Protected)
 */
router.put("/:id", protect, async (req, res) => {
  try {
    const video = await Video.findOne({
      _id: req.params.id,
      uploader: req.userId,
    });

    if (!video) {
      return res.status(403).json({ message: "Not authorized" });
    }

    Object.assign(video, req.body);
    await video.save();

    res.json({ message: "Video updated", video });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * DELETE VIDEO (Protected)
 */
router.delete("/:id", protect, async (req, res) => {
  try {
    const video = await Video.findOneAndDelete({
      _id: req.params.id,
      uploader: req.userId,
    });

    if (!video) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id/like", protect, async (req, res) => {
  const video = await Video.findByIdAndUpdate(
    req.params.id,
    { $inc: { likes: 1 } },
    { new: true }
  );
  res.json(video);
});

router.put("/:id/dislike", protect, async (req, res) => {
  const video = await Video.findByIdAndUpdate(
    req.params.id,
    { $inc: { dislikes: 1 } },
    { new: true }
  );
  res.json(video);
});

export default router;
