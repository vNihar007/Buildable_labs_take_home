import z from "zod";

export const getTasksQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(10),

    priority: z.enum(["low", "medium", "high"]).optional(),

    completed: z
        .enum(["true", "false"])
        .transform(value => value === "true")
        .optional(),

    search: z.string().trim().optional(),

    sortBy: z
        .enum([
            "created_at",
            "updated_at",
            "priority",
            "title"
        ])
        .default("created_at"),

    order: z
        .enum(["asc", "desc"])
        .default("desc")
});

export type GetTasksQueryDto =
    z.infer<typeof getTasksQuerySchema>;