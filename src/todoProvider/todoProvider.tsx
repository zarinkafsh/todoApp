'use client';

import {createContext, useState, useContext, useCallback, useEffect, ReactNode, FC, useReducer} from 'react';
import {ActionType, TodoContextType, TodoType} from '@/types/todo';

const TodoContext = createContext<TodoContextType | null>(null);

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};

const taskReducer = (state: Record<string, TodoType>, action: ActionType) => {
  console.log(action)
  switch (action.type) {
    case 'INIT':
      return action.payload;
    case 'ADD':
      return {
        ...state,
        [action.payload?.id]: action.payload,
      };
    case 'REMOVE':
      const otherTodos = {
        ...state,
      };

      delete otherTodos[action.payload?.id];

      return otherTodos;
    case 'EDIT':
      return {
        ...state,
        [action.payload?.id]: {
          ...state[action.payload?.id],
          ...action.payload,
        },
      }
    default:
      return state;
  }
}

interface ContextProps {
  children: ReactNode;
}

export const TodoProvider: FC<ContextProps> = ({children}) => {
  const [todos, dispatch] = useReducer(taskReducer, {});

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadTodos = () => {
      setLoading(true);
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        dispatch({
          type: 'INIT',
          payload: JSON.parse(savedTodos),
        });
      }
      setLoading(false);
    };
    loadTodos();
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((text: string) => {
    dispatch({
      type: 'ADD',
      payload: {
        id: Date.now(),
        completed: false,
        text,
      }
    });
  }, []);

  const removeTodo = useCallback((id:number) => {
    dispatch({
      type: 'REMOVE',
      payload: {
        id,
      }
    })
  }, []);

  const editTodo = useCallback((id: number, text: string) => {
    dispatch({
      type: 'EDIT',
      payload: {
        id,
        text,
      }
    });
  }, []);

  const toggleTodo = useCallback((id: number, completed: boolean) => {
    dispatch({
      type: 'EDIT',
      payload: {
        id,
        completed,
      }
    });
  }, []);

  const contextValue = {
    todos,
    addTodo,
    removeTodo,
    editTodo,
    toggleTodo,
    loading
  };

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
};