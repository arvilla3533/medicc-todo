"use client";
import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";
import { todoKeys } from "@/config/querykeys";
import useUpdateTodo from "@/hooks/todo/useUpdateTodo";
import { Todo, TodoInput } from "@/types/todo";
import { useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { TodoForm } from "./forms/TodoForm";

type Props = { todo: Todo; onDelete: (id: number) => void; onUpdate: (id: number, input: Partial<TodoInput>) => void };

const TodoItem = ({ todo, onDelete, onUpdate }: Props) => {
  const queryClient = useQueryClient();

  const [isChecked, setIsChecked] = useState(todo.isCompleted);
  const [todoFormOpen, setTodoFormOpen] = useState(false);

  const { mutate: updateTodo } = useUpdateTodo();

  const onSubmit = (body: TodoInput) => {
    updateTodo(
      { existing: todo.id, body },
      {
        onError: () => {},
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: todoKeys.all(), exact: false });
          setTodoFormOpen(false);
        },
      },
    );
  };

  const onCheckedChange = () => {
    const newCheckedStatus = !isChecked;

    setIsChecked(newCheckedStatus);

    const completedAt = newCheckedStatus ? new Date() : null;
    onUpdate(todo.id, { completedAt });
  };

  return (
    <div className="px-10 w-full md:w-1/2 p-4 border-b border-gray-100">
      <div className="flex items-center justify-between gap-5 md:gap-11">
        <Checkbox checked={isChecked} onCheckedChange={onCheckedChange} />

        <div className="ml-4">
          <h3 className="font-bold">{todo.name}</h3>
          <p>{todo.description}</p>
          {todo.dueDate && <p>Due: {new Date(todo.dueDate).toLocaleString()}</p>}
          {todo.completedAt && <p>Completed at: {new Date(todo.completedAt).toLocaleString()}</p>}
        </div>

        <div className="flex gap-2">
          <Dialog open={todoFormOpen} onOpenChange={setTodoFormOpen}>
            <DialogTrigger asChild>
              <Button size="icon" className={`${todo.isCompleted ? "hidden" : ""}`}>
                <Pencil />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Todo</DialogTitle>
              </DialogHeader>
              <TodoForm onSubmit={onSubmit} body={todo} />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-red-700" size="icon">
                <Trash2 />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure you want to delete this Todo item?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete this todo item from the server
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={() => onDelete(todo.id)}>Delete</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
