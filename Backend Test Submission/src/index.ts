import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import urlRoutes from "./routes/urlRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", urlRoutes);
app.use("/shorturls", urlRoutes); // for /shorturls/:shortcode stats

app.get("/", (_req, res) => {
  res.send("✅ Affordmed URL Shortener API is running.");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
