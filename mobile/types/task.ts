export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  completed: boolean;
  priority: TaskPriority;
  due_date?: string | null;
  created_at: string;
  updated_at: string;
}