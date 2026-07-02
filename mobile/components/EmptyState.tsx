import { StyleSheet, Text, View } from "react-native";

export default function EmptyState() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>📝</Text>

      <Text style={styles.title}>
        No Tasks Yet
      </Text>

      <Text style={styles.subtitle}>
        Tap + to create your first task.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 120,

    alignItems: "center",
  },

  emoji: {
    fontSize: 60,
  },

  title: {
    marginTop: 20,

    fontSize: 24,

    fontWeight: "700",

    color: "#111827",
  },

  subtitle: {
    marginTop: 10,

    color: "#6B7280",

    fontSize: 16,
  },
});