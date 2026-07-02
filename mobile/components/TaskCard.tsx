import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";


import { Task } from "../types/task";

interface TaskCardProps {
  task: Task;
  onPress: () => void;
  onToggleComplete: () => void;
}

const PRIORITY_COLORS = {
  low: "#22C55E",
  medium: "#F59E0B",
  high: "#EF4444",
};

export default function TaskCard({
  task,
  onPress,
onToggleComplete,
}: TaskCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <TouchableOpacity
         onPress={() => {
        console.log("Toggle pressed");
        onToggleComplete();
        }}
        style={[
        styles.statusIndicator,
        {
            backgroundColor: task.completed
                ? "#22C55E"
                : "#E5E7EB",
        },
    ]}
/>

          <Text
            numberOfLines={1}
            style={[
              styles.title,
              task.completed && styles.completedTitle,
            ]}
          >
            {task.title}
          </Text>
        </View>

        <View
          style={[
            styles.priorityBadge,
            {
              backgroundColor:
                PRIORITY_COLORS[task.priority],
            },
          ]}
        >
          <Text style={styles.priorityText}>
            {task.priority.toUpperCase()}
          </Text>
        </View>
      </View>

      {task.description ? (
        <Text
          numberOfLines={2}
          style={styles.description}
        >
          {task.description}
        </Text>
      ) : null}

      <View style={styles.footer}>
        <Text style={styles.statusText}>
          {task.completed
            ? "Completed"
            : "Pending"}
        </Text>

        <Text style={styles.editText}>
          Tap to edit →
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    padding: 18,

    marginBottom: 16,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.08,

    shadowRadius: 8,

    elevation: 4,
  },

  cardPressed: {
    opacity: 0.9,
    transform: [
      {
        scale: 0.98,
      },
    ],
  },

  header: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  titleContainer: {
    flex: 1,

    flexDirection: "row",

    alignItems: "center",

    marginRight: 12,
  },

  statusIndicator: {
    width: 14,

    height: 14,

    borderRadius: 7,

    marginRight: 12,
  },

  title: {
    flex: 1,

    fontSize: 18,

    fontWeight: "700",

    color: "#111827",
  },

  completedTitle: {
    color: "#9CA3AF",

    textDecorationLine: "line-through",
  },

  description: {
    marginTop: 12,

    marginLeft: 26,

    color: "#6B7280",

    fontSize: 15,

    lineHeight: 22,
  },

  footer: {
    marginTop: 18,

    marginLeft: 26,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  statusText: {
    fontSize: 14,

    color: "#6B7280",

    fontWeight: "600",
  },

  editText: {
    color: "#2563EB",

    fontSize: 13,

    fontWeight: "600",
  },

  priorityBadge: {
    paddingHorizontal: 10,

    paddingVertical: 6,

    borderRadius: 20,
  },

  priorityText: {
    color: "#FFFFFF",

    fontSize: 11,

    fontWeight: "700",
  },
});