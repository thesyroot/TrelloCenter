import { TriageSchema } from "../schemas/triage.schema.js";
import { callGroq } from "../services/groq.js";
import { getBoards, getLabels, getLists } from "../services/trello.js";
import { buildPrompt } from "../utils/prompts.js";

import { TRIAGE_HINTS } from "../config/triage-hints.js";

export default async function handler(req, res) {
  const animeTags = [
    "ReadManga",
    "ReadNovel",
    "Finished",
    "Cancelled",
    "ViewPriority"
  ];



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

  const boardsForModel = enrichedBoards.map(b => ({
    id: b.id,
    name: b.name,
    lists: b.lists,          // [{id,name}]
    labels: b.tags.map(t => ({ name: t })) // normalizamos
  }));



  // 2️⃣ Prompt IA
  const prompt = buildPrompt({
    transcript,
    suggestedTitle,
    boards: boardsForModel,
    hints: TRIAGE_HINTS
  });

  // 3️⃣ IA
  const result = await callGroq(prompt);

  if (result.boardName === "Anime") {
    result.tags = result.tags.filter(tag =>
      animeTags.includes(tag)
    );
  }

  if (result.tags.length > 3) {
    result.tags = result.tags.slice(0, 3);
  }

  // 4️⃣ Validación
  const parsed = TriageSchema.parse(result);

  // 5️⃣ Devuelve al celular
  res.json(parsed);
}
