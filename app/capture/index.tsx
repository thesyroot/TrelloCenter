import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function CaptureScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="e.g. Comprar repuesto / Planificar clase / Fix bug"
        placeholderTextColor="#6b7280"
        style={styles.input}
      />

      <View style={styles.box}>
        <Text style={styles.boxTitle}>Audio</Text>
        <Text style={styles.boxText}>
          (Placeholder) Luego acá va el recorder.
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
        onPress={() => router.push({ pathname: "/preview", params: { title } })}
      >
        <Text style={styles.btnText}>Analyze</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b0d12", padding: 16, gap: 12 },
  label: { color: "#aab0bf" },
  input: {
    backgroundColor: "#121624",
    borderRadius: 12,
    padding: 12,
    color: "#e9ecf5",
    borderWidth: 1,
    borderColor: "#1c2335",
  },
  box: {
    backgroundColor: "#121624",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#1c2335",
  },
  boxTitle: { color: "#e9ecf5", fontWeight: "600", marginBottom: 6 },
  boxText: { color: "#8e95a8" },
  btn: {
    marginTop: "auto",
    backgroundColor: "#22c55e",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
  },
  btnPressed: { opacity: 0.9, transform: [{ scale: 0.99 }] },
  btnText: { color: "#05130a", fontWeight: "800" },
});
