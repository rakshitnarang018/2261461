import axios from "axios";
import { getAuthToken } from "./auth";
import { LogPayload } from "./types";

export async function sendLog(payload: LogPayload): Promise<void> {
  try {
    const token = await getAuthToken();

    const response = await axios.post(
      "http://20.244.56.144/evaluation-service/logs",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Optional: log server response to console (remove in production)
    // console.log("Log submitted:", response.data);
  } catch (error) {
    console.error("Failed to send log:", error);
  }
}
