import { Request, Response } from "express";
import { generateShortCode } from "../utils/shortener";
import { Log } from "logging-middleware";

type ClickAnalytics = {
  timestamp: Date;
  referrer?: string;
  location: string;
};

type ShortURLData = {
  longUrl: string;
  createdAt: Date;
  expiresAt: Date;
  clickCount: number;
  clicks: ClickAnalytics[];
};

const urlMap = new Map<string, ShortURLData>();

// POST /shorten
export const shortenUrl = async (req: Request, res: Response) => {
  const { url: longUrl, validity, shortcode } = req.body;

  if (!longUrl || typeof longUrl !== "string") {
    await Log("backend", "error", "handler", "Missing or invalid longUrl");
    return res.status(400).json({ error: "Missing or invalid longUrl" });
  }

  let shortCode = shortcode;
  if (shortCode) {
    if (!/^[a-zA-Z0-9]{4,10}$/.test(shortCode)) {
      await Log("backend", "error", "handler", `Invalid shortcode: ${shortCode}`);
      return res.status(400).json({ error: "Shortcode must be alphanumeric (4–10 chars)" });
    }
    if (urlMap.has(shortCode)) {
      await Log("backend", "error", "handler", `Shortcode already used: ${shortCode}`);
      return res.status(409).json({ error: "Shortcode already in use" });
    }
  } else {
    do {
      shortCode = generateShortCode();
    } while (urlMap.has(shortCode));
  }

  const now = new Date();
  const expiryMins = Number.isInteger(validity) ? validity : 30;
  const expiresAt = new Date(now.getTime() + expiryMins * 60 * 1000);

  urlMap.set(shortCode, {
    longUrl,
    createdAt: now,
    expiresAt,
    clickCount: 0,
    clicks: [],
  });

  const shortLink = `${req.protocol}://${req.get("host")}/${shortCode}`;
  await Log("backend", "info", "handler", `Shortened ${longUrl} → ${shortLink}`);

  return res.status(201).json({
    shortLink,
    expiry: expiresAt.toISOString(),
  });
};

// GET /:code
export const redirectToLongUrl = async (req: Request, res: Response) => {
  const { code } = req.params;
  const entry = urlMap.get(code);

  if (!entry) {
    await Log("backend", "warn", "handler", `Invalid shortcode: ${code}`);
    return res.status(404).json({ error: "Short URL not found" });
  }

  const now = new Date();
  if (entry.expiresAt < now) {
    await Log("backend", "warn", "handler", `Expired shortcode: ${code}`);
    return res.status(410).json({ error: "Short URL has expired" });
  }

  entry.clickCount += 1;
  entry.clicks.push({
    timestamp: now,
    referrer: req.get("referer") || undefined,
    location: "India", // Optional: replace with IP geolocation
  });

  await Log("backend", "info", "handler", `Redirecting /${code} → ${entry.longUrl}`);
  return res.redirect(entry.longUrl);
};

// GET /shorturls/:shortcode
export const getStats = async (req: Request, res: Response) => {
  const { shortcode } = req.params;
  const entry = urlMap.get(shortcode);

  if (!entry) {
    await Log("backend", "warn", "handler", `Stats request for invalid shortcode: ${shortcode}`);
    return res.status(404).json({ error: "Short URL not found" });
  }

  await Log("backend", "info", "handler", `Stats returned for shortcode: ${shortcode}`);

  return res.json({
    shortLink: `${req.protocol}://${req.get("host")}/${shortcode}`,
    originalUrl: entry.longUrl,
    createdAt: entry.createdAt.toISOString(),
    expiresAt: entry.expiresAt.toISOString(),
    totalClicks: entry.clickCount,
    clicks: entry.clicks,
  });
};
