import { Router } from "express";
import {
  shortenUrl,
  redirectToLongUrl,
  getStats
} from "../controllers/urlController";

const router = Router();

router.post("/shorten", shortenUrl);              // POST /shorten
router.get("/:code", redirectToLongUrl);          // GET /:code
router.get("/shorturls/:shortcode", getStats);    // GET /shorturls/:shortcode

export default router;
