import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";

import commentRoutes from "./routes/commentRoutes.js";



dotenv.config();

// connect to MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());



app.use("/api/channels", channelRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/comments", commentRoutes);

app.use("/api/videos", videoRoutes);

app.get("/", (req, res) => {
  res.send("YouTube Clone API is running");
});

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
