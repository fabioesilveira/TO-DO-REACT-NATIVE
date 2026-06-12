import { useContext, useState, type ReactNode } from "react";
import { AppContext } from "./AppContext";
import type { Todo } from "../types/Todo";

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [todos, setTodos] = useState<Todo[]>([]);

  function addTodo(title: string) {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: trimmedTitle,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos((prev) => [newTodo, ...prev]);
  }

  function toggleTodo(id: string) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function deleteTodo(id: string) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  function updateTodo(id: string, title: string) {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, title: trimmedTitle } : todo
      )
    );
  }

  return (
    <AppContext.Provider
      value={{
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        updateTodo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return context;
}