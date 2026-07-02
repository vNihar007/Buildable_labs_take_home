import { api } from "./api";
import { Task } from "../types/task";
import { useOfflineStore } from "../store/offline.store";
import { generateId } from "../utils/generateId";

export const TaskService = {

  // GET ALL TASKS

  async getTasks(): Promise<Task[]> {
    console.log("📥 Fetching Tasks...");

    try {
      const response = await api.get("/tasks");

      console.log("✅ Tasks Loaded");
      console.log(response.data);

      return response.data.data.tasks ?? [];
    } catch (error) {
      console.log("❌ Failed to fetch tasks");
      console.log(error);

      throw error;
    }
  },

  // GET SINGLE TASK
  async getTask(id: string): Promise<Task> {
    console.log(`📥 Fetching Task: ${id}`);

    try {
      const response = await api.get(`/tasks/${id}`);

      console.log("✅ Task Loaded");
      console.log(response.data);

      return response.data.data;
    } catch (error) {
      console.log("❌ Failed to fetch task");
      console.log(error);

      throw error;
    }
  },

  // CREATE TASK
async createTask(data: {
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
}) {
  console.log("======================================");
  console.log("🚀 STEP 4 - createTask() STARTED");
  console.log("Payload:", data);

  const NetInfo = (
    await import("@react-native-community/netinfo")
  ).default;

  console.log("🚀 STEP 5 - NetInfo imported");

  const state = await NetInfo.fetch();

  console.log("🚀 STEP 6 - NetInfo.fetch()");
  console.log(state);

  const online =
    state.isConnected === true &&
    state.isInternetReachable !== false;

  console.log("🚀 STEP 7 - Online:", online);

  if (!online) {
    console.log("🚀 STEP 8 - OFFLINE DETECTED");

    try {
      console.log("🚀 STEP 9 - Before enqueue");

      await useOfflineStore.getState().enqueue({
        id: generateId(),
        type: "CREATE",
        payload: data,
      });

      console.log("🚀 STEP 10 - After enqueue");

      console.log(
        useOfflineStore.getState().queue
      );

      console.log("🚀 STEP 11 - Returning offline");

      return {
        offline: true,
      };
    } catch (error) {
      console.log("❌ ENQUEUE FAILED");
      console.log(error);

      throw error;
    }
  }

  console.log("🚀 STEP 12 - ONLINE API CALL");

  try {
    const response = await api.post("/tasks", data);

    console.log("🚀 STEP 13 - API SUCCESS");
    console.log(response.data);

    return response.data.data;
  } catch (error) {
    console.log("❌ API FAILED");
    console.log(error);

    throw error;
  }
} ,
  // UPDATE TASK
  async updateTask(
    id: string,
    data: Partial<Task>
  ) {
    const NetInfo = (
      await import("@react-native-community/netinfo")
    ).default;

    const state = await NetInfo.fetch();

    console.log("========== NETWORK ==========");
    console.log("Connected:", state.isConnected);
    console.log("Reachable:", state.isInternetReachable);
    console.log("Type:", state.type);
    console.log("=============================");

    if (!state.isConnected || state.isInternetReachable === false) {
      console.log("📴 OFFLINE");
      console.log("📦 Queueing UPDATE");

      await useOfflineStore.getState().enqueue({
        id: generateId(),
        type: "UPDATE",
        taskId: id,
        payload: data,
      });

      return {
        offline: true,
      };
    }

    try {
      console.log(`📤 PATCH /tasks/${id}`);
      console.log(data);

      const response = await api.patch(
        `/tasks/${id}`,
        data
      );

      console.log("✅ Task Updated");
      console.log(response.data);

      return response.data.data;
    } catch (error) {
      console.log("❌ Update Failed");
      console.log(error);

      throw error;
    }
  },

  // DELETE TASK
  async deleteTask(id: string) {
    const NetInfo = (
      await import("@react-native-community/netinfo")
    ).default;

    const state = await NetInfo.fetch();
    console.log("========== NETWORK ==========");
    console.log("Connected:", state.isConnected);
    console.log("Reachable:", state.isInternetReachable);
    console.log("Type:", state.type);
    console.log("=============================");

    if (!state.isConnected || state.isInternetReachable === false) {
      console.log("📴 OFFLINE");
      console.log("📦 Queueing DELETE");

      await useOfflineStore.getState().enqueue({
        id: generateId(),
        type: "DELETE",
        taskId: id,
      });

      return {
        offline: true,
      };
    }

    try {
      console.log(`📤 DELETE /tasks/${id}`);

      await api.delete(`/tasks/${id}`);

      console.log("✅ Task Deleted");

      return {
        success: true,
      };
    } catch (error) {
      console.log("❌ Delete Failed");
      console.log(error);

      throw error;
    }
  },
};