import { Ionicons } from "@expo/vector-icons";
import Voice from "@react-native-voice/voice";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  locale?: string; // "es-AR"
  onText: (text: string) => void;
};

export default function HoldToTalk({ locale = "es-AR", onText }: Props) {
  const [isListening, setIsListening] = useState(false);
  const [partial, setPartial] = useState("");
  const [finalText, setFinalText] = useState("");

  const mounted = useRef(true);
  
  useEffect(() => {    
    mounted.current = true;

    Voice.onSpeechStart = () => {
      if (!mounted.current) return;
      setIsListening(true);
    };

    Voice.onSpeechEnd = () => {
      if (!mounted.current) return;
      setIsListening(false);
      setPartial("");
    };

    Voice.onSpeechError = (e) => {
      if (!mounted.current) return;
      setIsListening(false);
      setPartial("");
      Alert.alert("Voice error", JSON.stringify(e.error ?? e));
    };

    Voice.onSpeechPartialResults = (e) => {
      const t = (e.value?.[0] ?? "").trim();
      if (!mounted.current) return;
      setPartial(t);
    };

    Voice.onSpeechResults = (e) => {
      const t = (e.value?.[0] ?? "").trim();
      if (!mounted.current) return;
      if (t) {
        const next = (finalText + " " + t).replace(/\s+/g, " ").trim();
        setFinalText(next);
        onText(next);
      }
      setPartial("");
    };

    return () => {
      mounted.current = false;
      Voice.destroy().then(Voice.removeAllListeners);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalText, onText]);

  const start = async () => {
    try {
      setPartial("");
      await Voice.start(locale);
    } catch (e) {
      Alert.alert("Cannot start", String(e));
    }
  };

  const stop = async () => {
    try {
      await Voice.stop();
    } catch {}
  };

  const clear = () => {
    setFinalText("");
    setPartial("");
    onText("");
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Dictado</Text>

      <Pressable
        onPressIn={start}
        onPressOut={stop}
        style={({ pressed }) => [
          styles.holdBtn,
          isListening && styles.holdBtnOn,
          pressed && styles.pressed,
        ]}
      >
        <Ionicons name="mic" size={18} color="#0b0d12" />
        <Text style={styles.holdText}>
          {isListening ? "Escuchando…" : "Mantener para hablar"}
        </Text>
      </Pressable>

      <View style={styles.box}>
        <Text style={styles.boxLabel}>Texto</Text>
        <Text style={styles.boxText}>{finalText || "—"}</Text>
        {!!partial && <Text style={styles.partial}>… {partial}</Text>}
      </View>

      <Pressable onPress={clear} style={({ pressed }) => [styles.clearBtn, pressed && styles.pressed]}>
        <Text style={styles.clearText}>Borrar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: "#121624",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#1c2335",
    gap: 10,
  },
  title: { color: "#e9ecf5", fontWeight: "700" },

  holdBtn: {
    backgroundColor: "#22c55e",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  holdBtnOn: { backgroundColor: "#f59e0b" },
  holdText: { color: "#0b0d12", fontWeight: "800" },

  box: {
    backgroundColor: "#0b0d12",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#1c2335",
    gap: 6,
  },
  boxLabel: { color: "#8e95a8", fontSize: 12 },
  boxText: { color: "#e9ecf5" },
  partial: { color: "#aab0bf", fontStyle: "italic" },

  clearBtn: {
    backgroundColor: "#1f2937",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
  },
  clearText: { color: "#e9ecf5", fontWeight: "800" },

  pressed: { opacity: 0.9, transform: [{ scale: 0.99 }] },
});
