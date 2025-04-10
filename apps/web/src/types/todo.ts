import { z } from "zod";

export type Todo = {
  id: number;
  name: string;
  description?: string;
  dueDate?: string;
  completedAt?: string | null;
  isCompleted: boolean;
  created: string;
  modified: string;
};

export const TodoInputSchema = z.object({
  name: z.string().trim().min(1),
  description: z.string().optional(),
  dueDate: z.date().optional(),
  completedAt: z.date().optional().nullable(),
});
export type TodoInput = z.infer<typeof TodoInputSchema>;
