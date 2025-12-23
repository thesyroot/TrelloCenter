export async function callGroq(prompt) {
  const r = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        temperature: 0.2,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "Respondé solo JSON válido." },
          { role: "user", content: prompt }
        ]
      })
    }
  );

  if (!r.ok) {
    const txt = await r.text();
    throw new Error(`Groq error ${r.status}: ${txt}`);
  }

  const json = await r.json();
  return JSON.parse(json.choices[0].message.content);
}
