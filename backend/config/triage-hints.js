// api/_lib/hints.js
// Este archivo define CÓMO interpretar la intención del usuario

export const TRIAGE_HINTS = {
  // ─────────────────────────────────────────────
  // REGLAS GLOBALES (prioridades fuertes)
  // ─────────────────────────────────────────────
  globalRules: [
    "Las tareas de trabajo, compras o impresión 3D NUNCA van al tablero Anime",
    "El tablero Anime SOLO se usa para consumir anime, manga o novelas",
    "Las tareas universitarias tienen prioridad si se mencionan materias, parciales o estudio",
    "Nunca elegir un tablero solo porque tenga muchas etiquetas"
  ],

  // ─────────────────────────────────────────────
  // DEFINICIÓN SEMÁNTICA DE TABLEROS
  // ─────────────────────────────────────────────
  boards: [
    {
      boardName: "WORK",
      meaning: "Trabajo, proyectos personales, compras y tareas productivas",
      whenToUse: [
        "comprar",
        "pedido",
        "cliente",
        "trabajo",
        "reunion",
        "hacer",
        "terminar",
        "entregar",
        "render",
        "modelo",
        "3d",
        "impresion",
        "filamento",
        "llaveros",
        "solutec"
      ],
      preferLists: {
        "3D": ["3d", "impresion", "filamento", "modelo", "render"],
        "SOLUTEC": ["cliente", "servicio", "pc", "reparar"],
        "Desarrollador": ["codigo", "app", "backend", "frontend"],
        "DOING": ["hacer", "trabajando"],
        "DONE": ["terminado", "listo"]
      },
      allowedTagsRule:
        "Usar etiquetas solo si agregan valor; normalmente ninguna"
    },

    {
      boardName: "UNI 3",
      meaning: "Universidad - Ingeniería Electrónica (TPs, parciales, estudio)",
      whenToUse: [
        "universidad",
        "facultad",
        "ingenieria",
        "electronica",
        "materia",
        "parcial",
        "tp",
        "tpi",
        "estudiar",
        "entregar",
        "examen"
      ],
      preferLists: {
        "PARCIALES": ["parcial", "examen"],
        "ING": ["clase", "teoria"],
        "TUP": ["tp", "tpi", "trabajo practico"],
        "DOING": ["estudiar", "haciendo"],
        "DONE": ["entregado", "aprobado"]
      },
      allowedTagsRule:
        "Usar etiquetas SOLO si coinciden con el nombre de la materia"
    },

    {
      boardName: "Anime",
      meaning: "Consumo de anime, manga y novelas",
      whenToUse: [
        "anime",
        "manga",
        "novela",
        "capitulo",
        "temporada",
        "ver",
        "leer"
      ],
      preferLists: {
        "Por ver": ["ver", "empezar"],
        "Viendo": ["viendo"],
        "Completado": ["terminado", "finalizado"],
        "Cancelado": ["abandonado"]
      },
      allowedTagsRule:
        "Usar solo etiquetas relacionadas con lectura o visualización"
    }
  ],

  // ─────────────────────────────────────────────
  // CONTROL DE ETIQUETAS
  // ─────────────────────────────────────────────
  labelsPolicy: {
    maxLabels: 3,
    neverReturnAll: true,
    requireSemanticMatch: true
  },

  // ─────────────────────────────────────────────
  // CONTROL DE CONFIANZA
  // ─────────────────────────────────────────────
  confidencePolicy: {
    high: ">= 0.8 cuando la intención es clara",
    medium: "0.6 – 0.79 cuando hay dudas leves",
    low: "< 0.6 cuando el usuario debería confirmar"
  }
};
