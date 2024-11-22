'use client';

import {createContext, useState, useContext, useCallback, useEffect, ReactNode, FC} from 'react';
import {TodoContextType, TodoType} from '@/app/types/todo';

const TodoContext = createContext<TodoContextType | null>(null);

// Custom hook to use the TodoContext
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
  // State for managing the todos
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [currentTodo, setCurrentTodo] = useState<TodoType | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Initial loading state

  // Load todos from local storage on initial render
  useEffect(() => {
    const loadTodos = () => {
      setLoading(true);
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
      setLoading(false); // Set loading to false after data is loaded
    };
    loadTodos();
  }, []);

  // Save todos to local storage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((text: string) => {
    setTodos((prevTodos) => [
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
    setTodos((prevTodos) =>
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