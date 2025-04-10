"use client";
import { Button } from "@/components/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/Dialog";
import { TodoForm } from "@/components/forms/TodoForm";
import TodoItem from "@/components/TodoItem";
import { todoKeys } from "@/config/querykeys";
import useCreateTodo from "@/hooks/todo/useCreateTodo";
import useDeleteTodo from "@/hooks/todo/useDeleteTodo";
import useFetchTodo from "@/hooks/todo/useFetchTodo";
import useUpdateTodo from "@/hooks/todo/useUpdateTodo";
import { TodoInput } from "@/types/todo";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function Todo() {
  const [todoFormOpen, setTodoFormOpen] = useState(false);
  const query = useFetchTodo();
  const queryClient = useQueryClient();

  const { mutate: createTodo } = useCreateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: updateTodo } = useUpdateTodo();

  const onSubmit = (body: TodoInput) => {
    createTodo(
      { body },
      {
        onError: () => {},
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: todoKeys.all(), exact: false });
          setTodoFormOpen(false);
        },
      },
    );
  };

  const onDelete = (existing: number) => {
    deleteTodo(
      { existing },
      {
        onError: () => {},
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: todoKeys.all(), exact: false });
        },
      },
    );
  };

  const onUpdate = (existing: number, body: Partial<TodoInput>) => {
    updateTodo(
      { existing, body },
      {
        onError: () => {},
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: todoKeys.all(), exact: false });
        },
      },
    );
  };

  return (
    <div className="flex flex-col min-h-svh w-full py-20 p-4 md:px-20">
      <div className="flex justify-center gap-5 md:gap-20 items-center ">
        <p className="prose strikethrough">What are your plans for today?</p>
        <Dialog open={todoFormOpen} onOpenChange={setTodoFormOpen}>
          <DialogTrigger asChild>
            <Button variant="default" size="icon">
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Todo</DialogTitle>
            </DialogHeader>
            <TodoForm onSubmit={onSubmit} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col items-center ">
        {query.data?.results.map((todo) => (
          <TodoItem key={`todo-${todo.id}`} todo={todo} onDelete={onDelete} onUpdate={onUpdate} />
        ))}
      </div>
    </div>
  );
}
