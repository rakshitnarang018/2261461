import { Router } from "express";
import { shortenUrl, redirectToLongUrl } from "../controllers/urlController";

const router = Router();

router.post("/shorten", shortenUrl);
router.get("/:code", redirectToLongUrl);

export default router;
