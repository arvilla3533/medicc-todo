"use client";

import { useMutation } from "@tanstack/react-query";

import { deleteTodo } from "@/services/api/todos";

type Props = { existing: number };

export default function useDeleteTodo() {
  return useMutation({ mutationFn: ({ existing }: Props) => deleteTodo(existing) });
}
