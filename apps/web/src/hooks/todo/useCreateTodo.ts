"use client";

import { useMutation } from "@tanstack/react-query";

import { createTodo } from "@/services/api/todos";
import { TodoInput } from "@/types/todo";

type Props = { body: TodoInput };

export default function useCreateTodo() {
  return useMutation({ mutationFn: ({ body }: Props) => createTodo(body) });
}
