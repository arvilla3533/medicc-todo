import { Page } from "@/types/page";
import { Todo, TodoInput } from "@/types/todo";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const URL = BASE_URL + "api/todos/";

export async function fetchTodos(): Promise<Page<Todo>> {
  const response = await fetch(URL);
  return response.json();
}

export async function createTodo(data: TodoInput): Promise<Todo> {
  const response = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function updateTodo(id: number, data: Partial<TodoInput>): Promise<Todo> {
  const response = await fetch(`${URL}${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteTodo(id: number): Promise<void> {
  await fetch(`${URL}${id}/`, { method: "DELETE" });
}
