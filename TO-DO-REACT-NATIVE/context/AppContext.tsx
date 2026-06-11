import { createContext } from 'react';

type List = {
  id: string;
  title: string;
};
export type AppContextType = {
  nome: string;
  setNome: (value: string) => void;
  list: List[];
  setList: any;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);