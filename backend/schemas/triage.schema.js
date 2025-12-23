import { z } from "zod";

export const TriageSchema = z.object({
  boardId: z.string().min(1),
  boardName: z.string().min(1),
  listName: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  tags: z.array(z.string()).max(3),
  confidence: z.number().min(0).max(1)
});
