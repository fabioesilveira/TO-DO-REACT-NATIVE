import { createContext } from "react";
import type { Todo } from "../types/Todo";

export type AppContextType = {
  todos: Todo[];
  isLoadingTodos: boolean;
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, title: string) => void;
};

export const AppContext = createContext<AppContextType | null>(null);