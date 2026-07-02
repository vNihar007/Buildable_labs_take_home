import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

export function useNetwork() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(
      (state) => {
        setOnline(
          state.isConnected === true &&
            state.isInternetReachable !== false
        );
      }
    );

    return unsubscribe;
  }, []);

  return online;
}