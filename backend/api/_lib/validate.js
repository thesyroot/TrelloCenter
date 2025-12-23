// api/_lib/validate.js
import { findBoardById } from "./boardsContext.js";

function clamp01(n) {
  if (typeof n !== "number" || Number.isNaN(n)) return 0;
  if (n < 0) return 0;
  if (n > 1) return 1;
  return n;
}

export function validateAndFixResult({ boardsContext, result }) {
  const safe = {
    boardId: String(result?.boardId || ""),
    listName: String(result?.listName || ""),
    title: String(result?.title || "").trim(),
    description: String(result?.description || "").trim(),
    tags: Array.isArray(result?.tags) ? result.tags.map(String) : [],
    confidence: clamp01(result?.confidence)
  };

  const board = findBoardById(boardsContext, safe.boardId);

  // Si board inválido: bajamos confianza y dejamos vacío para que el front pida confirmación.
  if (!board) {
    safe.confidence = Math.min(safe.confidence, 0.4);
    return safe;
  }

  // Lista debe existir
  if (!board.lists.includes(safe.listName)) {
    // fallback suave a DOING si existe, sino primera lista
    safe.listName = board.lists.includes("DOING") ? "DOING" : board.lists[0];
    safe.confidence = Math.min(safe.confidence, 0.6);
  }

  // Tags: solo los del tablero, máximo 3
  const allowedTags = new Set(board.tags || []);
  safe.tags = safe.tags.filter(t => allowedTags.has(t)).slice(0, 3);

  // Título mínimo
  if (!safe.title) {
    safe.title = "Nueva tarea";
    safe.confidence = Math.min(safe.confidence, 0.6);
  }

  // Anti-“Anime por default”: si eligió Anime pero no hay señal fuerte, baja confianza.
  if (board.name.toLowerCase() === "anime") {
    const text = `${safe.title} ${safe.description}`.toLowerCase();
    const hasAnimeKeyword = (board.keywords || []).some(k => text.includes(k));
    if (!hasAnimeKeyword) {
      safe.confidence = Math.min(safe.confidence, 0.5);
    }
  }

  return safe;
}
