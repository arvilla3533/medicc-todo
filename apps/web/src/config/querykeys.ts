export const apiKeys = {
  all: ["api"] as const,
  todos: () => [...apiKeys.all, "todos"] as const,
};

export const todoKeys = {
  all: () => [...apiKeys.todos()] as const,
  list: () => [...todoKeys.all(), "list"] as const,
};
