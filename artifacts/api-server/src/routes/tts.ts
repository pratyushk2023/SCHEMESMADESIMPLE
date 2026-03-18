import { Router, type IRouter } from "express";
import { TextToSpeechBody, TextToSpeechResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/tts", async (req, res) => {
  try {
    const body = TextToSpeechBody.parse(req.body);
    
    const lang = body.language ?? "en";
    const text = encodeURIComponent(body.text.substring(0, 200));
    const langCode = lang === "hi" ? "hi" : lang === "ta" ? "ta" : lang === "bn" ? "bn" : lang === "te" ? "te" : lang === "mr" ? "mr" : "en";
    
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${text}&tl=${langCode}&client=tw-ob`;
    
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; SchemesMadeSimple/1.0)"
      }
    });
    
    if (!response.ok) {
      return res.json(TextToSpeechResponse.parse({
        audioBase64: "",
        mimeType: "audio/mpeg"
      }));
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    
    const data = TextToSpeechResponse.parse({
      audioBase64: base64,
      mimeType: "audio/mpeg"
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.json(TextToSpeechResponse.parse({
      audioBase64: "",
      mimeType: "audio/mpeg"
    }));
  }
});

export default router;
