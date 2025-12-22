import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { loadRecentCards, RecentCard } from "../../src/lib/recentCardsStorage";

export default function RecentScreen() {
  const router = useRouter();
  const [items, setItems] = useState<RecentCard[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    const data = await loadRecentCards();
    setItems(data);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    // cada vez que volvés a esta pantalla, refrescá
    refresh();
  }, [refresh]);

  return (
    <SafeAreaView style={styles.safe}>
      <Stack.Screen
        options={{
          title: "Recent",
          headerRight: () => (
            <Pressable
              onPress={() => router.push("/settings")}
              hitSlop={10}
              style={({ pressed }) => [
                styles.headerIconBtn,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons name="settings-outline" size={22} />
            </Pressable>
          ),
        }}
      />

      <View style={styles.container}>
        {items.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons name="albums-outline" size={26} color="#aab0bf" />
            <Text style={styles.emptyTitle}>It’s empty</Text>
            <Text style={styles.emptyText}>
              Create your first card using the + button.
            </Text>
          </View>
        ) : (
          <FlatList
            data={items}
            keyExtractor={(it) => it.id}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={styles.sep} />}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={refresh} />
            }
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardTop}>
                  <Text style={styles.cardTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={styles.cardMeta}>
                    {new Date(item.createdAtISO).toLocaleString()}
                  </Text>
                </View>

                <View style={styles.badgeRow}>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.listName}</Text>
                  </View>

                  {item.labels.slice(0, 3).map((l) => (
                    <View key={l} style={[styles.badge, styles.badgeSecondary]}>
                      <Text style={styles.badgeText}>{l}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          />
        )}

        <Pressable
          onPress={() => router.push("/capture")}
          style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
          hitSlop={12}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0b0d12" },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 10 },
  subtitle: { color: "#aab0bf", marginBottom: 12 },

  listContent: { paddingBottom: 110 },
  sep: { height: 10 },

  card: {
    backgroundColor: "#121624",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#1c2335",
  },
  cardTop: { gap: 6 },
  cardTitle: { color: "#e9ecf5", fontSize: 16, fontWeight: "600" },
  cardMeta: { color: "#8e95a8", fontSize: 12 },

  badgeRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 10 },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "#1b2240",
  },
  badgeSecondary: { backgroundColor: "#1a2a22" },
  badgeText: { color: "#dbe1ff", fontSize: 12, fontWeight: "600" },

  fab: {
    position: "absolute",
    right: 16,
    bottom: 22,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#3b82f6",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },
  fabPressed: { transform: [{ scale: 0.98 }], opacity: 0.92 },

  headerIconBtn: { paddingHorizontal: 10, paddingVertical: 6 },
  pressed: { opacity: 0.65 },
  emptyBox: {
    marginTop: 24,
    backgroundColor: "#121624",
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: "#1c2335",
    alignItems: "center",
    gap: 8,
  },
  emptyTitle: { color: "#e9ecf5", fontSize: 16, fontWeight: "700" },
  emptyText: { color: "#8e95a8", textAlign: "center" },
});
