// api/classify-task.js
import { getBoardsContext } from "./_lib/boardsContext.js";
import { callGroqJSON } from "./_lib/groq.js";
import { buildPrompt } from "./_lib/prompt.js";
import { validateAndFixResult } from "./_lib/validate.js";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { transcript, suggestedTitle } = req.body || {};
    const boardsContext = getBoardsContext();

    const prompt = buildPrompt({
      boardsContext,
      transcript: transcript || "",
      suggestedTitle: suggestedTitle || ""
    });

    const raw = await callGroqJSON({
      apiKey: process.env.GROQ_API_KEY,
      prompt
    });

    const fixed = validateAndFixResult({
      boardsContext,
      result: raw
    });

    return res.status(200).json(fixed);
  } catch (err) {
    return res.status(500).json({
      error: "classify_failed",
      message: err?.message || String(err)
    });
  }
}
