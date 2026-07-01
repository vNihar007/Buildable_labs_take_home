import sql from "../config/supabase.js";
import type { CreateTaskDto } from "../schemas/task.schema.js";
import type { GetTasksQueryDto } from "../schemas/query.schema.js";
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


    async findAll(query: GetTasksQueryDto){
        const{
            page,
            limit,
            priority,
            completed,
            search,
            sortBy,
            order
        } = query;

        const offset = (page - 1) * limit;
        const filters = [sql`deleted_at IS NULL`];
        if (priority) {
            filters.push(sql`priority = ${priority}`);
        } ;
        if (completed !== undefined){
            filters.push(sql`completed = ${completed}`);
        } ;
        if(search) {
            filters.push(sql`title ILIKE ${`%${search}%`}`);
        } ;

        const whereClause = filters.reduce(
            (acc, filter, i) => i === 0 ? sql`WHERE ${filter}` : sql`${acc} AND ${filter}`,
            sql``
        );

        const sortColumns = {
            created_at: sql`created_at`,
            updated_at: sql`updated_at`,
            priority: sql`priority`,
            due_date: sql`due_date`
        };

        const sortColumn = sortColumns[sortBy as keyof typeof sortColumns];

        const sortDirection =
            order === "asc"
                ? sql`ASC`
                : sql`DESC`;

        const tasks = await sql<Task[]>`
            SELECT *
            FROM tasks
            ${whereClause}
            ORDER BY ${sortColumn} ${sortDirection}
            LIMIT ${limit}
            OFFSET ${offset};
        `;
        const [countResult] = await sql<{count: string}[]>`
            SELECT COUNT(*) as count
            FROM tasks
            ${whereClause}
        `;
        const count = countResult?.count || '0';
        return {
            tasks,

            pagination: {
                page,

                limit,

                total: Number(count),

                totalPages: Math.ceil(Number(count) / limit),
            },
        };

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
