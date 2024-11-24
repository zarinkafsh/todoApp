import {FC} from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Checkbox,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import {TodoType} from "@/types/todo";
import {useTodo} from "@/todoProvider/todoProvider";
import {Empty, Skeleton} from "@/components";

interface TodoListProps {
  onEdit: (todo: TodoType) => void;
  currentTodo?: TodoType;
}

export const TodoList: FC<TodoListProps> = ({onEdit, currentTodo}) => {
  const {todos, toggleTodo, removeTodo, loading} = useTodo();

  if (loading) return <Skeleton/>;

  if (!Object.keys(todos).length) return <Empty description="No todos found!"/>;

  return (
    <List>
      {(Object.values(todos) || []).map((todo: TodoType) => (
        <ListItem
          dense
          key={todo.id}
          secondaryAction={
            <Stack direction="row" spacing={1}>
              <IconButton
                color="primary"
                edge="start"
                title="Edit"
                aria-label="edit"
                disabled={todo.completed || !!currentTodo}
                onClick={() => onEdit(todo)}
              >
                <EditIcon fontSize="small"/>
              </IconButton>
              <IconButton
                color="error"
                edge="end"
                title="Delete"
                aria-label="delete"
                disabled={!!currentTodo}
                onClick={() => removeTodo(todo.id)}
              >
                <ClearIcon fontSize="small"/>
              </IconButton>
            </Stack>
          }
        >
          <ListItemButton
            disableTouchRipple
            disableRipple
            onClick={() => toggleTodo(todo.id, !todo.completed)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                size="small"
                color="success"
                checked={todo.completed}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  variant="body1"
                  sx={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? 'gray' : 'inherit'
                  }}
                >
                  {todo.text}
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList;