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


    async findAll(){
        return await sql
        `
        SELECT *

        FROM tasks

        WHERE deleted_at IS NULL

        ORDER BY created_at DESC;

        `
    }

    async findById(id:string):Promise<Task | null >{
        const [Task] =  await sql<Task[]>`
            SELECT *
            FROM tasks
            WHERE id = ${id}
            AND deleted_at IS NULL
        `;
        return Task || null;
    }

    async update(
    id: string,
    payload: Partial<CreateTaskDto>
    ): Promise<Task | null> {

    const updates: string[] = [];
    const values: (string | number | Date | boolean)[] = [];

    if (payload.title !== undefined) {
        updates.push(`title = $${values.length + 1}`);
        values.push(payload.title);
    }

    if (payload.description !== undefined) {
        updates.push(`description = $${values.length + 1}`);
        values.push(payload.description);
    }

    if (payload.priority !== undefined) {
        updates.push(`priority = $${values.length + 1}`);
        values.push(payload.priority);
    }

    if (payload.due_date !== undefined) {
        updates.push(`due_date = $${values.length + 1}`);
        values.push(payload.due_date);
    }

    if ((payload as { completed?: boolean }).completed !== undefined) {
        updates.push(`completed = $${values.length + 1}`);
        values.push((payload as { completed?: boolean }).completed!);
    }

    updates.push(`updated_at = NOW()`);

    values.push(id);

    const query = `
        UPDATE tasks
        SET ${updates.join(", ")}
        WHERE id = $${values.length}
        RETURNING *;
    `;

    const result = await sql.unsafe(query, values) as Task[];

    return result[0] ?? null;
}
    async softdelete(id:string):Promise<Task | null>{
        const [task] = await sql<Task[]>`
            UPDATE tasks
            SET 
            deleted_at = NOW(),
            updated_at = NOW()
            WHERE id = ${id}
            RETURNING *;
        `;
        return task || null;
    }


}

export default new TaskRepository();
