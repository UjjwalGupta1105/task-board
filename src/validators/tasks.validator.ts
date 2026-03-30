import { z } from 'zod';

export const createTaskSchema = z.object({
    name: z
        .string()
        .min(1, 'Name is required')
        .max(100, 'Name must be at most 100 characters'),

    description: z
        .string()
        .max(255, 'Description must be at most 255 characters')
        .nullable()
        .optional(),

    assignedFrom: z.number().int().positive(),
    assignedTo: z.number().int().positive(),

    projectId: z.number().int().positive(),

    statusId: z.number().int().nonnegative().optional().default(0),

    deadline: z.coerce.date().nullable().optional(),
});