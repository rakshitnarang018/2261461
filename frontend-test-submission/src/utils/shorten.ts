import axios from "axios";

export interface ShortenRequest {
  url: string;
  validity?: number;
  shortcode?: string;
}

export interface ShortenResponse {
  shortLink: string;
  expiry: string;
}

export const createShortUrl = async (
  data: ShortenRequest
): Promise<ShortenResponse> => {
  const response = await axios.post("http://localhost:8000/shorturls", data);
  return response.data;
};

export const fetchStats = async (shortcode: string) => {
  const response = await axios.get(`http://localhost:8000/shorturls/${shortcode}`);
  return response.data;
};
