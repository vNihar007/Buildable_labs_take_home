import { create } from "zustand";
import AsyncStorage from "../storage/storage";

export type OfflineAction =
  | {
      id: string;
      type: "CREATE";
      payload: any;
    }
  | {
      id: string;
      type: "UPDATE";
      taskId: string;
      payload: any;
    }
  | {
      id: string;
      type: "DELETE";
      taskId: string;
    };

interface OfflineState {
  queue: OfflineAction[];

  loadQueue: () => Promise<void>;

  enqueue: (action: OfflineAction) => Promise<void>;

  remove: (id: string) => Promise<void>;

  clear: () => Promise<void>;
}

const KEY = "offline_queue";

export const useOfflineStore = create<OfflineState>((set, get) => ({
  queue: [],

  loadQueue: async () => {
    try {
      const value = await AsyncStorage.getItem(KEY);

      if (!value) {
        console.log("📦 Offline Queue Empty");
        return;
      }

      const queue = JSON.parse(value);

      set({
        queue,
      });

      console.log("📦 Loaded Offline Queue");
      console.log(queue);
    } catch (error) {
      console.log("❌ Failed to load offline queue", error);
    }
  },

    enqueue: async (action) => {
        console.log("STORE STEP 1");

        const current = get().queue;

        console.log(current);

        const updated = [...current, action];

        console.log("STORE STEP 2");

        await AsyncStorage.setItem(
            KEY,
            JSON.stringify(updated)
        );

        console.log("STORE STEP 3");

        set({
            queue: updated,
        });

        console.log("STORE STEP 4");

        console.log(updated);
    },

  remove: async (id) => {
    try {
      const updated = get().queue.filter(
        (item) => item.id !== id
      );

      await AsyncStorage.setItem(
        KEY,
        JSON.stringify(updated)
      );

      set({
        queue: updated,
      });

      console.log("✅ Removed Synced Action");
      console.log(updated);
    } catch (error) {
      console.log("❌ Failed to remove action", error);
    }
  },

  clear: async () => {
    try {
      await AsyncStorage.removeItem(KEY);

      set({
        queue: [],
      });

      console.log("🗑 Offline Queue Cleared");
    } catch (error) {
      console.log("❌ Failed to clear queue", error);
    }
  },
}));