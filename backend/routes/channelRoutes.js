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

router.put("/:id/subscribe", protect, async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "Channel ID missing" });
    }

    const channel = await Channel.findById(req.params.id);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    // 🔥 SAFETY: ensure array exists
    if (!Array.isArray(channel.subscribers)) {
      channel.subscribers = [];
    }

    const userId = req.userId.toString();

    const isSubscribed = channel.subscribers
      .map((id) => id.toString())
      .includes(userId);

    if (isSubscribed) {
      channel.subscribers = channel.subscribers.filter(
        (id) => id.toString() !== userId
      );
    } else {
      channel.subscribers.push(userId);
    }

    await channel.save();
    res.json(channel);
  } catch (error) {
    console.error("SUBSCRIBE ERROR:", error);
    res.status(500).json({ message: "Subscribe failed" });
  }
});



export default router;
