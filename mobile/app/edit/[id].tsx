import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { router, useLocalSearchParams } from "expo-router";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import TaskForm, {
  TaskFormData,
} from "../../components/TaskForm";

import { TaskService } from "../../services/task.service";

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const queryClient = useQueryClient();

  const { data: task, isLoading } = useQuery({
    queryKey: ["task", id],
    queryFn: () => TaskService.getTask(id),
  });

  const updateMutation = useMutation({
    mutationFn: (values: TaskFormData) =>
      TaskService.updateTask(id, {
        ...values,
        priority: task?.priority || "medium",
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      router.back();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => TaskService.deleteTask(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      router.back();
    },
  });

  if (isLoading || !task) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator
          size="large"
          color="#2563EB"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TaskForm
        submitText="Update Task"
        loading={updateMutation.isPending}
        defaultValues={{
          title: task.title,
          description: task.description ?? "",
        }}
        onSubmit={(values) =>
          updateMutation.mutate(values)
        }
      />

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() =>
          Alert.alert(
            "Delete Task",
            "Are you sure?",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Delete",
                style: "destructive",
                onPress: () =>
                  deleteMutation.mutate(),
              },
            ]
          )
        }
      >
        <Text style={styles.deleteText}>
          Delete Task
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  deleteButton: {
    marginTop: 20,
    backgroundColor: "#EF4444",
    height: 56,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  deleteText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});