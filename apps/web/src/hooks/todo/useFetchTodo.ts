import { useQuery } from "@tanstack/react-query";

import { todoKeys } from "@/config/querykeys";
import { fetchTodos } from "@/services/api/todos";

export default function useFetchTodos() {
  return useQuery({
    queryKey: todoKeys.list(),
    queryFn: () => fetchTodos(),
  });
}
