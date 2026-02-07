import express from "express";
import Channel from "../models/Channel.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE CHANNEL (Protected)
router.post("/", protect, async (req, res) => {
  try {
    const { channelName, description, channelBanner } = req.body;

    if (!channelName) {
      return res.status(400).json({ message: "Channel name is required" });
    }

    const channel = await Channel.create({
      channelName,
      description,
      channelBanner,
      owner: req.userId,
    });

    res.status(201).json({
      message: "Channel created successfully",
      channel,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET MY CHANNEL
router.get("/my-channel", protect, async (req, res) => {
  try {
    const channel = await Channel.findOne({ owner: req.userId });

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    res.json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
