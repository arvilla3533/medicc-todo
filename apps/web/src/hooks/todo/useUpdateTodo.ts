"use client";

import { useMutation } from "@tanstack/react-query";

import { updateTodo } from "@/services/api/todos";
import { TodoInput } from "@/types/todo";

type Props = { existing: number; body: Partial<TodoInput> };

export default function useUpdateTodo() {
  return useMutation({ mutationFn: ({ existing, body }: Props) => updateTodo(existing, body) });
}
