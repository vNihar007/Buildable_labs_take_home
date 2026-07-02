import { router } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

export default function FloatingButton() {
  return (
    <Pressable
      onPress={() => router.push("/create")}
      style={styles.button}
    >
      <Text style={styles.plus}>＋</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",

    right: 24,

    bottom: 30,

    width: 64,

    height: 64,

    borderRadius: 32,

    backgroundColor: "#2563EB",

    alignItems: "center",

    justifyContent: "center",

    elevation: 10,
  },

  plus: {
    color: "white",

    fontSize: 36,

    fontWeight: "300",
  },
});