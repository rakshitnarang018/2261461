import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

let token: string | null = null;

export async function getAuthToken(): Promise<string> {
  if (token) return token;

  const {
    EMAIL,
    NAME,
    ROLL_NO,
    ACCESS_CODE,
    CLIENT_ID,
    CLIENT_SECRET,
  } = process.env;

  const response = await axios.post("http://20.244.56.144/evaluation-service/auth", {
    email: EMAIL,
    name: NAME,
    rollNo: ROLL_NO,
    accessCode: ACCESS_CODE,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  });

  token = response.data.access_token;
  return token!;
}
