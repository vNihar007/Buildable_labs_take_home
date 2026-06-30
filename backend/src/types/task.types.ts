export type TaskPriority = "low" | "medium" | "high";

export interface Task {
    id: string;
    title: string;
    description: string | null;
    completed: boolean;
    priority: TaskPriority;
    due_date: Date | null;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}
