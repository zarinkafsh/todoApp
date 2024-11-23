'use client';

import {createContext, useState, useContext, useCallback, useEffect, ReactNode, FC} from 'react';
import {TodoContextType, TodoType} from '@/types/todo';

const TodoContext = createContext<TodoContextType | null>(null);

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};

interface ContextProps {
  children: ReactNode;
}

export const TodoProvider: FC<ContextProps> = ({children}) => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [currentTodo, setCurrentTodo] = useState<TodoType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadTodos = () => {
      setLoading(true);
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
      setLoading(false); 
    };
    loadTodos();
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((text: string) => {
    setTodos((prevTodos: TodoType[]) => [
      ...prevTodos,
      {id: Date.now(), text: text.trim(), completed: false}
    ]);
  }, []);

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo: TodoType) => todo.id !== id));
  };

  const editTodo = (id: number, updatedText: string) => {
    setTodos(
      todos.map((todo: TodoType) => (todo.id === id ? {...todo, text: updatedText} : todo))
    );
    setCurrentTodo(null)
  };

  const toggleTodo = useCallback((id: number) => {
    setTodos((prevTodos:TodoType[]) => 
      prevTodos.map((todo) =>
        todo.id === id ? {...todo, completed: !todo.completed} : todo
      )
    );
  }, []);

  const contextValue = {
    todos,
    addTodo,
    removeTodo,
    editTodo,
    toggleTodo,
    loading,
    currentTodo,
    setCurrentTodo
  };

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
};