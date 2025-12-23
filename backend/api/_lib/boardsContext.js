// api/_lib/boardsContext.js
// ⚠️ Editá acá tus boards reales (ids/nombres/listas/tags).
// La idea es NO mandar a la IA el Trello crudo, sino un resumen semántico.

export function getBoardsContext() {
  return [
    {
      id: "WORK_BOARD_ID",
      name: "WORK",
      meaning: "Trabajo, proyectos, compras y tareas productivas",
      keywords: [
        "comprar", "pedido", "cotizacion", "cliente", "trabajo", "reunion",
        "render", "modelo", "3d", "impresion", "filamento", "solutec"
      ],
      lists: ["SOLUTEC", "3D", "Desarrollador", "DOING", "DONE"],
      tags: [] // si usás labels en este board, ponelas acá
    },
    {
      id: "UNI3_BOARD_ID",
      name: "UNI 3",
      meaning: "Universidad - Ingeniería (TPs, parciales, estudio, entregas)",
      keywords: [
        "universidad", "facultad", "ingenieria", "electronica", "parcial",
        "tp", "tpi", "entregar", "estudiar", "clase", "materia"
      ],
      lists: ["ING", "TUP", "PARCIALES", "DOING", "DONE"],
      tags: ["TDC", "Tecnicas", "MOSFET", "Multitransistores"]
    },
    {
      id: "ANIME_BOARD_ID",
      name: "Anime",
      meaning: "Consumo de anime/manga/novelas (ver, leer, capítulos)",
      keywords: [
        "anime", "manga", "novela", "capitulo", "temporada", "ver",
        "leer", "opening", "ending", "ova"
      ],
      lists: ["Por ver", "Viendo", "Completado", "Cancelado"],
      tags: ["ReadManga", "ReadNovel", "Finished", "Cancelled", "ViewPriority"]
    }
  ];
}

// Helpers para valid	controller
export function findBoardById(ctx, boardId) {
  return ctx.find(b => b.id === boardId);
}
