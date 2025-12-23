import fetch from "node-fetch";

const BASE = "https://api.trello.com/1";

const auth = () =>
  `key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`;

export async function getBoards() {
  const r = await fetch(`${BASE}/members/me/boards?${auth()}`);
  return r.json();
}

export async function getLists(boardId) {
  const r = await fetch(`${BASE}/boards/${boardId}/lists?${auth()}`);
  return r.json();
}

export async function getLabels(boardId) {
  const r = await fetch(`${BASE}/boards/${boardId}/labels?${auth()}`);
  return r.json();
}
