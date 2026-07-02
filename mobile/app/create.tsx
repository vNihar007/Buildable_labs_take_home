import { router } from "expo-router";
import { Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "@tanstack/react-query";

import TaskForm from "../components/TaskForm";
import { TaskService } from "../services/task.service";
import { queryClient } from "../lib/queryClient";

// export default function CreateScreen() {
//   const mutation = useMutation({
//     mutationFn: TaskService.createTask,

//     onSuccess: async (result) => {
//       if ((result as any).offline) {
//         Alert.alert(
//           "Offline",
//           "Task saved to the offline queue. It will sync automatically when you're back online."
//         );
//       } else {
//         Alert.alert(
//           "Success",
//           "Task created successfully."
//         );
//       }

//       await queryClient.invalidateQueries({
//         queryKey: ["tasks"],
//       });

//       router.back();
//     },

//     onError: (error: any) => {
//       console.log("========== CREATE ERROR ==========");
//       console.log(error);
//       console.log(error?.response?.status);
//       console.log(error?.response?.data);
//       console.log("=================================");
//     },
//   });

//   return (
//     <SafeAreaView style={styles.container}>
//       <TaskForm
//         loading={false}
//         onSubmit={async (data) => {
//             console.log("STEP 1");

//             const result = await TaskService.createTask({
//             ...data,
//             priority: "medium",
//             });

//             console.log("STEP 2");
//             console.log(result);

//             Alert.alert("Done");
//         }}
//         />
//     </SafeAreaView>
//   );
// }
export default function CreateScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TaskForm
        loading={false}
        onSubmit={async (data) => {
          console.log("================================");
          console.log("STEP A - onSubmit reached");
          console.log(data);

          try {
            console.log("STEP B - Calling createTask()");

            const result = await TaskService.createTask({
              ...data,
              priority: "medium",
            });

            console.log("STEP C - Returned");
            console.log(result);

            Alert.alert("SUCCESS");
          } catch (err) {
            console.log("STEP D - ERROR");
            console.log(err);
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F7FA",
  },
});