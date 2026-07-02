import { useEffect } from "react";

import NetInfo from "@react-native-community/netinfo";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

import { queryClient } from "../lib/queryClient";
import { syncOfflineQueue } from "../services/sync.service";
import { useOfflineStore } from "../store/offline.store";

export default function RootLayout() {
  useEffect(() => {
    const initializeOffline = async () => {
      try {
        // Load offline queue from AsyncStorage
        await useOfflineStore.getState().loadQueue();

        // Attempt to sync pending actions on app launch
        await syncOfflineQueue();

        // Refresh task list
        await queryClient.invalidateQueries({
          queryKey: ["tasks"],
        });
      } catch (error) {
        console.log("Initialization Error:", error);
      }
    };

    initializeOffline();

    const unsubscribe = NetInfo.addEventListener(async (state) => {
      const online =
        state.isConnected === true &&
        state.isInternetReachable !== false;

      if (!online) {
        console.log("🔴 Offline Mode");
        return;
      }

      console.log("🟢 Internet Restored");

      try {
        await syncOfflineQueue();

        await queryClient.invalidateQueries({
          queryKey: ["tasks"],
        });

        console.log("✅ Offline Queue Synced");
      } catch (error) {
        console.log("❌ Sync Failed:", error);
      }
      console.log("Network Changed");
      console.log(state);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </QueryClientProvider>
  );
}