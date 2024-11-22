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
import {useTodo} from "@/app/contexts/TodoContext";
import {TodoType} from "@/app/types/todo";
import {Empty, Skeleton} from "@/app/components";

export const TodoList = () => {
  const {todos, toggleTodo, removeTodo, loading, setCurrentTodo} = useTodo();

  if (loading) return <Skeleton/>;

  if (todos.length === 0) return <Empty description="No todos found!"/>;

  return (
    <List>
      {(todos || []).map((todo: TodoType) => (
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
                onClick={() => setCurrentTodo(todo)}
                disabled={todo.completed}
              >
                <EditIcon fontSize="small"/>
              </IconButton>
              <IconButton
                color="error"
                edge="end"
                title="Delete"
                aria-label="delete"
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
            onClick={() => toggleTodo(todo.id)}
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