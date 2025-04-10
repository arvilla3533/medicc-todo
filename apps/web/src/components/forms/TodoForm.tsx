"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/Button";
import { DateTimePicker } from "@/components/DateTimePicker";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/forms/Form";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/TextArea";
import { Todo, TodoInput, TodoInputSchema } from "@/types/todo";

type Props = {
  onSubmit: (data: TodoInput) => void;
  body?: Todo;
};

export function TodoForm({ onSubmit, body }: Props) {
  const form = useForm<TodoInput>({
    resolver: zodResolver(TodoInputSchema),
    defaultValues: {
      name: body?.name ?? "",
      description: body?.description ?? "",
      dueDate: body?.dueDate ? new Date(body?.dueDate) : undefined,
    },
  });

  function handleSubmit(data: TodoInput) {
    onSubmit(data);
  }

  function handleDateSelect(date: Date | undefined) {
    if (date) {
      form.setValue("dueDate", date);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col w-full space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <DateTimePicker value={field.value} onDateSelect={handleDateSelect} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
