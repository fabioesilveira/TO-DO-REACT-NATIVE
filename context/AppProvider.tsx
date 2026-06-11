// contexts/AppProvider.tsx
import React, { useState, useContext, useEffect } from 'react';
import { AppContext, AppContextType } from './AppContext';
import axios from 'axios';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {

  const [nome, setNome] = useState("Alberto");
  const [list, setList] = useState([])

  useEffect(() => {
    async function fetchAPI() {
      const req = await axios.get("https://67fe6fd258f18d7209ee374d.mockapi.io/toDoList")
      const res = req.data
      setList(res)
    }

    fetchAPI();
  }, [])

  const value: AppContextType = {
    nome,
    setNome,
    list,
    setList
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp precisa estar dentro de um AppProvider');
  }
  return context;
};