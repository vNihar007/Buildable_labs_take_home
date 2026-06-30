import sql from "../config/supabase.js";
import type { CreateTaskDto } from "../schemas/task.schema.js";
import type { Task } from "../types/task.types.js";


class TaskRepository {
    async create(task: CreateTaskDto): Promise<Task> {
        const [createdTask] = await sql<Task[]>`

        INSERT INTO tasks
        (
            title,
            description,
            priority,
            due_date
        )

        VALUES
        (
            ${task.title},
            ${task.description ?? null},
            ${task.priority},
            ${task.due_date ?? null}
        )

        RETURNING *;
        `;

        if (!createdTask) {
            throw new Error('Failed to create task');
        }
        return createdTask;
    }
}

export default new TaskRepository();
