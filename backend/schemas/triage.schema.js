import { z } from "zod";

export const TriageSchema = z.object({
  boardId: z.string(),
  listId: z.string(),
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  confidence: z.number().min(0).max(1)
});
