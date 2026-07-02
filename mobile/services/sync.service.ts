import { api } from "./api";
import { useOfflineStore } from "../store/offline.store";

export async function syncOfflineQueue() {
  console.log("========== SYNC START ==========");

  // Load latest queue from AsyncStorage
  await useOfflineStore.getState().loadQueue();

  // Get fresh state after loading
  let store = useOfflineStore.getState();

  if (store.queue.length === 0) {
    console.log("📦 Offline queue is empty.");
    return;
  }

  console.log(`🔄 Syncing ${store.queue.length} offline actions...`);

  for (const action of [...store.queue]) {
    try {
      console.log("➡️ Syncing Action:");
      console.log(action);

      switch (action.type) {
        case "CREATE":
          await api.post("/tasks", action.payload);
          break;

        case "UPDATE":
          await api.patch(
            `/tasks/${action.taskId}`,
            action.payload
          );
          break;

        case "DELETE":
          await api.delete(`/tasks/${action.taskId}`);
          break;
      }

      await useOfflineStore.getState().remove(action.id);

      console.log(`✅ Synced ${action.type}`);
    } catch (error) {
      console.log("❌ Failed Sync");
      console.log(error);

      break;
    }
  }

  await useOfflineStore.getState().loadQueue();

  console.log("========== SYNC COMPLETE ==========");
}