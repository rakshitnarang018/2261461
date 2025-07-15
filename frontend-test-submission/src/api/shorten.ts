import axios from "axios";

const BASE_URL = "http://localhost:8000";

export interface ShortenRequest {
  url: string;
  validity?: number;
  shortcode?: string;
}

export interface ShortenResponse {
  shortLink: string;
  expiry: string;
}

export async function createShortUrl(data: ShortenRequest): Promise<ShortenResponse> {
  const response = await axios.post(`${BASE_URL}/shorturls`, data);
  return response.data;
}
