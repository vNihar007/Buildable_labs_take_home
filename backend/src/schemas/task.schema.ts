import {z} from 'zod' ;

export const createTaskSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(100, "Title cannot exceed 100 characters"),

    description: z
        .string()
        .trim()
        .max(500)
        .optional(),

    priority: z
        .enum(["low", "medium", "high"])
        .default("medium"),

    due_date: z
        .string()
        .datetime()
        .optional()
});


export const updateTaskSchema = createTaskSchema
.partial()
.refine(
    (data) => Object.keys(data).length > 0 ,
    {
        message: "At least one field must be provided for update"
    }
)

export type CreateTaskDto = z.infer<typeof createTaskSchema>
