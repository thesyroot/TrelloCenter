import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Settings</Text>
      <Text style={styles.p}>Backend URL, mode templates, Trello auth, etc.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b0d12", padding: 16, gap: 8 },
  h1: { color: "#e9ecf5", fontSize: 18, fontWeight: "700" },
  p: { color: "#aab0bf" },
});
