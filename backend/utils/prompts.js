export function buildPrompt(data) {
  return `
Sos un asistente que clasifica una nota de voz para Trello.

REGLAS:
- No inventes tableros, listas ni etiquetas
- Usá SOLO los IDs provistos
- Respondé SOLO JSON válido

FORMATO:
{
  "boardId": "...",
  "listId": "...",
  "title": "...",
  "description": "...",
  "tags": ["..."],
  "confidence": 0.0
}

CONTEXTO:
${JSON.stringify(data, null, 2)}
`.trim();
}
