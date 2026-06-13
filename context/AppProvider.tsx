import { useContext, useEffect, useState, type ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "./AppContext";
import type { Todo } from "../types/Todo";

type AppProviderProps = {
  children: ReactNode;
};

const TODOS_STORAGE_KEY = "@todo-react-native:todos";

export function AppProvider({ children }: AppProviderProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);

  useEffect(() => {
    async function loadTodos() {
      try {
        const storedTodos = await AsyncStorage.getItem(TODOS_STORAGE_KEY);

        if (storedTodos) {
          setTodos(JSON.parse(storedTodos));
        }
      } catch (error) {
        console.error("Failed to load todos:", error);
      } finally {
        setIsLoadingTodos(false);
      }
    }

    loadTodos();
  }, []);

  useEffect(() => {
    if (isLoadingTodos) return;

    async function saveTodos() {
      try {
        await AsyncStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
      } catch (error) {
        console.error("Failed to save todos:", error);
      }
    }

    saveTodos();
  }, [todos, isLoadingTodos]);

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
        isLoadingTodos,
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