import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Checkbox,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import {useTodo} from "@/contexts/TodoContext";
import {TodoType} from "@/types/todo";

export const TodoList = () => {
  const {todos, toggleTodo, removeTodo, loading, setCurrentTodo} = useTodo();

  if (loading) return <CircularProgress size={30} className="flex justify-center items-center"/>;

  if (todos.length === 0) return <Typography className="flex justify-center items-center">No todos found!</Typography>;

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