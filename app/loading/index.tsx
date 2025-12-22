import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { addRecentCard } from "../../src/lib/recentCardsStorage";

export default function LoadingScreen() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(async () => {
      await addRecentCard({
        id: String(Date.now()),
        title: "Mock created card (replace with Trello title)",
        listName: "Inbox",
        labels: ["Idea"],
        createdAtISO: new Date().toISOString(),
      });

      router.replace("/recent");
    }, 900);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <Text style={styles.text}>Sending to Trello…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  text: { color: "#e9ecf5", fontWeight: "600" },
});
