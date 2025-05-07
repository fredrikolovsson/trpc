import * as React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { trpc } from './utils/trpc';

export function Greeting() {
  const todoCreator = useMutation(trpc.apiCreateTodo.mutationOptions());

  React.useEffect(() => {
    todoCreator.mutate({ p_task: "New task" + Date.now(), p_due: undefined });
  }, [])

  const todos = useQuery(trpc.apiReadTodos.queryOptions({
    p_limit: 10000,
    p_offset: 0,
    p_sort_column: "due",
    p_sort_order: "desc",
  }));

  return <div>todos: {JSON.stringify(todos.data)}</div>;
}
