// app/recent/index.tsx
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type RecentCard = {
  id: string;
  title: string;
  listName: string;
  labels: string[];
  createdAt: string; // display
};

export default function RecentScreen() {
  const router = useRouter();

  const items = useMemo<RecentCard[]>(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        id: String(i + 1),
        title: `Mock card #${i + 1} — “Algo para Trello”`,
        listName: i % 2 === 0 ? "Inbox" : "Doing",
        labels: i % 3 === 0 ? ["Urgent", "UTN"] : ["Idea"],
        createdAt: "Today 17:32",
      })),
    []
  );

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
              <Ionicons name="settings-outline" size={22} color="white" />
            </Pressable>
          ),
        }}
      />

      <View style={styles.container}>
        <FlatList
          data={items}
          keyExtractor={(it) => it.id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.sep} />}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardTop}>
                <Text style={styles.cardTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.cardMeta}>{item.createdAt}</Text>
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

        {/* Floating Action Button */}
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
});
