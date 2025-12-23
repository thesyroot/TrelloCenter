import { TriageSchema } from "../schemas/triage.schema.js";
import { callGroq } from "../services/groq.js";
import { getBoards, getLabels, getLists } from "../services/trello.js";
import { buildPrompt } from "../utils/prompt.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST" });
  }

  const { transcript, suggestedTitle } = req.body;

  // 1️⃣ Trello dinámico
  const boards = await getBoards();

  const enrichedBoards = await Promise.all(
    boards.map(async b => ({
      id: b.id,
      name: b.name,
      lists: (await getLists(b.id)).map(l => ({
        id: l.id,
        name: l.name
      })),
      tags: (await getLabels(b.id)).map(t => t.name)
    }))
  );

  // 2️⃣ Prompt IA
  const prompt = buildPrompt({
    transcript,
    suggestedTitle,
    boards: enrichedBoards
  });

  // 3️⃣ IA
  const result = await callGroq(prompt);

  // 4️⃣ Validación
  const parsed = TriageSchema.parse(result);

  // 5️⃣ Devuelve al celular
  res.json(parsed);
}
