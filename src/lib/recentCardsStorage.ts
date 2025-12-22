// src/lib/recentCardsStorage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export type RecentCard = {
  id: string;          // id local o de trello
  title: string;
  listName: string;
  labels: string[];
  createdAtISO: string; // new Date().toISOString()
};

const KEY = "recent_cards_v1";
const MAX = 10;

export async function loadRecentCards(): Promise<RecentCard[]> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as RecentCard[];
  } catch {
    return [];
  }
}

export async function saveRecentCards(cards: RecentCard[]): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(cards));
}

export async function addRecentCard(card: RecentCard): Promise<RecentCard[]> {
  const current = await loadRecentCards();

  // si llega repetida, la movemos arriba
  const withoutDup = current.filter((c) => c.id !== card.id);

  const next = [card, ...withoutDup].slice(0, MAX);
  await saveRecentCards(next);
  return next;
}

export async function clearRecentCards(): Promise<void> {
  await AsyncStorage.removeItem(KEY);
}
