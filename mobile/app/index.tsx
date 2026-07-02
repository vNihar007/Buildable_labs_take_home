import { FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RefreshControl } from "react-native";

import Header from "../components/Header";
import TaskCard from "../components/TaskCard";
import FloatingButton from "../components/FloatingButton";
import EmptyState from "../components/EmptyState";

import { Task } from "../types/task";
import { router } from "expo-router";


import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TaskService } from "../services/task.service";


export default function HomeScreen() {
    const {
    data: tasks = [],
    isLoading,
    refetch,
    isRefetching,
    } = useQuery({
    queryKey: ["tasks"],
    queryFn: TaskService.getTasks,
    });
    const queryClient = useQueryClient();

const toggleMutation = useMutation({
  mutationFn: async ({
    id,
    completed,
  }: {
    id: string;
    completed: boolean;
  }) => {
    console.log("Updating:", id, completed);

    return TaskService.updateTask(id, {
      completed,
    });
  },

  onSuccess: () => {
    console.log("Toggle Success");

    queryClient.invalidateQueries({
      queryKey: ["tasks"],
    });
  },

  onError: (error: any) => {
    console.log("Toggle Error");
    console.log(error);
    console.log(error?.response?.data);
  },
});

    if (isLoading) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator
        size="large"
        color="#2563EB"
      />
    </SafeAreaView>
  );
}

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={() => router.push(`/edit/${item.id}`)}
            onToggleComplete={() =>
                toggleMutation.mutate({
                id: item.id,
                completed: !item.completed,
                })
  }
/>
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState />}
        contentContainerStyle={{ paddingBottom: 120 }}
        refreshControl={
          <RefreshControl
            refreshing={isLoading || isRefetching}
            onRefresh={refetch}
          />
        }
      />
      <FloatingButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#F5F7FA",

    paddingHorizontal: 20,
  },
});