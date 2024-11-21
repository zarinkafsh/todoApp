export interface TodoType {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoContextType {
  todos: TodoType[];
  addTodo: (todo: string) => void;
  removeTodo: (id: number) => void;
  editTodo: (id: number, updatedText: string) => void;
}