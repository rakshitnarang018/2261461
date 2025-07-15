import { Request, Response } from "express";
import { generateShortCode } from "../utils/shortener";
import { Log } from "logging-middleware"; // or "../middleware" if using relative import

const urlMap = new Map<string, string>();

export const shortenUrl = async (req: Request, res: Response) => {
  const { longUrl } = req.body;

  if (!longUrl || typeof longUrl !== "string") {
    await Log("backend", "error", "handler", "Invalid or missing longUrl");
    return res.status(400).json({ error: "Invalid or missing longUrl" });
  }

  try {
    const shortCode = generateShortCode();
    urlMap.set(shortCode, longUrl);

    const shortUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;
    await Log("backend", "info", "handler", `Shortened URL: ${shortUrl}`);

    return res.status(201).json({ shortUrl });
  } catch (err) {
    await Log("backend", "fatal", "handler", `Unexpected error while shortening URL: ${(err as Error).message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const redirectToLongUrl = async (req: Request, res: Response) => {
  const { code } = req.params;

  if (!code || typeof code !== "string") {
    await Log("backend", "error", "handler", "Missing or invalid short code in params");
    return res.status(400).json({ error: "Invalid short code" });
  }

  const longUrl = urlMap.get(code);

  if (!longUrl) {
    await Log("backend", "warn", "handler", `Short code not found: ${code}`);
    return res.status(404).json({ error: "Short URL not found" });
  }

  await Log("backend", "info", "handler", `Redirecting to long URL: ${longUrl}`);
  return res.redirect(longUrl);
};
