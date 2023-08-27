import axios, { type AxiosRequestConfig } from "axios";
import type { NextApiHandler } from "next";
import { env } from "~/env.mjs";

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  if (method === "GET") {
    const { text, gender } = req.query;
    const API_KEY = env.ELEVENLABS_API_KEY;
    const VOICE_ID =
      gender == "f" ? "EXAVITQu4vr4xnSDxMaL" : "GBv7mTt0atIp3Br8iCZE";

    // Set options for the API request.
    const options: AxiosRequestConfig = {
      method: "POST",
      url: `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      headers: {
        accept: "audio/mpeg", // Set the expected response type to audio/mpeg.
        "content-type": "application/json", // Set the content type to application/json.
        "xi-api-key": `${API_KEY}`, // Set the API key in the headers.
      },
      data: {
        text: text?.toString() ?? "Hello", // Pass in the inputText as the text to be converted to speech.
      },
      responseType: "arraybuffer", // Set the responseType to arraybuffer to receive binary data as response.
    };
    const speechDetails = await axios.request(options);
    const audio = speechDetails.data;

    res.setHeader("Content-Type", "audio/mpeg");
    res.status(200).send(audio);
  }

  res.status(200).json({ name: "John Doe" });
};
export default handler;
