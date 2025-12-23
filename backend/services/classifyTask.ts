// src/services/classifyTask.ts
export type ClassifyResult = {
  boardId: string;
  listName: string;
  title: string;
  description: string;
  tags: string[];
  confidence: number;
};

export async function classifyTask(params: {
  transcript: string;
  suggestedTitle?: string;
}): Promise<ClassifyResult> {
  const res = await fetch("https://TU-VERCEL-URL.vercel.app/api/classify-task", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params)
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Error clasificando tarea");

  return data;
}
