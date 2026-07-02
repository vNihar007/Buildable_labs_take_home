import { Controller, useForm } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export type TaskFormData = {
  title: string;
  description: string;
};

interface TaskFormProps {
  defaultValues?: TaskFormData;
  submitText?: string;
  loading?: boolean;
  onSubmit(data: TaskFormData): void;
}

export default function TaskForm({
  defaultValues,
  submitText = "Save Task",
  loading = false,
  onSubmit,
}: TaskFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    defaultValues: defaultValues ?? {
      title: "",
      description: "",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>

      <Controller
        control={control}
        name="title"
        rules={{
          required: "Title is required",
          minLength: {
            value: 3,
            message: "Minimum 3 characters",
          },
        }}
        render={({ field }) => (
          <TextInput
            style={[
              styles.input,
              errors.title && styles.inputError,
            ]}
            placeholder="Enter task title"
            value={field.value}
            onChangeText={field.onChange}
            autoCapitalize="sentences"
            returnKeyType="next"
          />
        )}
      />

      {errors.title && (
        <Text style={styles.errorText}>
          {errors.title.message}
        </Text>
      )}

      <Text style={styles.label}>Description</Text>

      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Optional description..."
            multiline
            textAlignVertical="top"
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
      />

        <TouchableOpacity
        style={styles.button}
        onPress={() => {
            console.log("BUTTON");

            handleSubmit((data) => {
            console.log("FORM");
            console.log(data);

            onSubmit(data);
            })();
        }}
        >
        <Text style={styles.buttonText}>
          {loading ? "Saving..." : submitText}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
    marginTop: 12,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#111827",
  },

  inputError: {
    borderColor: "#EF4444",
  },

  errorText: {
    color: "#EF4444",
    marginTop: 6,
    marginBottom: 10,
    fontSize: 13,
  },

  textArea: {
    minHeight: 120,
    marginBottom: 24,
  },

  button: {
    backgroundColor: "#2563EB",
    height: 56,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});