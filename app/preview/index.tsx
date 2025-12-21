import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function PreviewScreen() {
  const router = useRouter();
  const { title } = useLocalSearchParams<{ title?: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Suggestion (mock)</Text>

      <View style={styles.card}>
        <Text style={styles.k}>Title</Text>
        <Text style={styles.v}>{title || "Untitled"} (improved)</Text>

        <Text style={styles.k}>List</Text>
        <Text style={styles.v}>Inbox</Text>

        <Text style={styles.k}>Labels</Text>
        <Text style={styles.v}>Idea, UTN</Text>

        <Text style={styles.k}>Description</Text>
        <Text style={styles.v}>
          Resumen generado por IA (placeholder). Luego acá va el JSON real.
        </Text>
      </View>

      <View style={styles.row}>
        <Pressable
          style={({ pressed }) => [styles.btnAlt, pressed && styles.pressed]}
          onPress={() => router.back()}
        >
          <Text style={styles.btnAltText}>Edit</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
          onPress={() => router.push("/loading")}
        >
          <Text style={styles.btnText}>Send</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b0d12", padding: 16, gap: 12 },
  h1: { color: "#e9ecf5", fontSize: 18, fontWeight: "700" },
  card: {
    backgroundColor: "#121624",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#1c2335",
    gap: 6,
  },
  k: { color: "#8e95a8", fontSize: 12 },
  v: { color: "#e9ecf5", fontSize: 14 },
  row: { flexDirection: "row", gap: 10, marginTop: "auto" },
  btn: {
    flex: 1,
    backgroundColor: "#3b82f6",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
  },
  btnText: { color: "#ffffff", fontWeight: "800" },
  btnAlt: {
    flex: 1,
    backgroundColor: "#1f2937",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
  },
  btnAltText: { color: "#e9ecf5", fontWeight: "800" },
  pressed: { opacity: 0.9, transform: [{ scale: 0.99 }] },
});
