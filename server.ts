import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client with proper header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Takri Tutor & Historical Scholar Endpoint
app.post("/api/takri-ai", async (req, res) => {
  try {
    const { prompt, mode, context } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({
        reply: "Gemini API key is not configured yet. Here is offline Takri insight: Takri (𑚔𑚭𑚊𑚤𑚯) is an ancient Sharada-derived script used for Western Pahari languages across Himachal Pradesh, Jammu, and parts of Uttarakhand until the mid-20th century.",
        takriText: "𑚔𑚭𑚊𑚤𑚯 𑚨𑚮𑚋𑚭",
        devanagari: "टाकरी सिखा",
        english: "Learn Takri"
      });
    }

    const systemPrompt = `You are "Takri Vidwan" (टाकरी विद्वान), an expert linguist and epigraphist specializing in the historical Takri script (𑚔𑚭𑚊𑚤𑚯 / टाकरी) and Western Pahari languages (Chameali, Kangri, Mandyali, Kulluvi, Sirmauri, Kinnauri Pahari, Mahasuvi) of Himachal Pradesh.
Takri is an abugida script derived from Sharada script, standardized by Raja Sri Singh in Chamba in the 19th century and officially used in the royal courts of Himachal hill states.

Your goal is to help users learn, write, and understand Takri script, translate phrases, explain historical inscriptions (like Chamba copper plates, Kangra fort records, temple stones), and appreciate Himachal Pradesh's cultural heritage.

When explaining or translating:
1. Provide accurate Takri Unicode characters (Unicode range U+11680 to U+116CF: 𑚀, 𑚁, 𑚂, 𑚃, 𑚄, 𑚅, 𑚆, 𑚇, 𑚈, 𑚉, 𑚊, 𑚋, 𑚌, 𑚍, 𑚎, 𑚏, 𑚐, 𑚑, 𑚒, 𑚓, 𑚔, 𑚕, 𑚖, 𑚗, 𑚘, 𑚙, 𑚚, 𑚛, 𑚜, 𑚝, 𑚞, 𑚟, 𑚠, 𑚡, 𑚢, 𑚣, 𑚤, 𑚥, 𑚦, 𑚧, 𑚨, 𑚩, 𑚪, 𑚫, 𑚬, matras: 𑚭, 𑚮, 𑚯, 𑚰, 𑚱, 𑚲, 𑚳, 𑚴, 𑚵, 𑚶, 𑚷, 𑚸, numerals: 𑛀-𑛉).
2. Always accompany Takri text with Devanagari transliteration, phonetic Roman (IAST or simple English), and clear English/Hindi explanation.
3. Keep tone respectful, welcoming, historically grounded, and inspiring for language preservation.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `Mode: ${mode || "general"}\nContext: ${context || "learning"}\nUser Query: ${prompt}`,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    res.json({
      reply: response.text || "No response generated.",
    });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({
      error: "Failed to process request with AI tutor",
      details: error.message,
    });
  }
});

// Vite middleware / production serving
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Takri Heritage App server running at http://localhost:${PORT}`);
  });
}

setupVite();
