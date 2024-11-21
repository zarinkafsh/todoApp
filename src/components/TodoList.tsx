import {useCallback} from "react";
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
import {TodoType} from "@/common/todo";

export const TodoList = () => {
  const {todos, toggleTodo, removeTodo, setCurrentTodo, loading} = useTodo();

  // Use memoized callbacks for event handlers
  const handleToggle = useCallback(
    (id: number) => {
      toggleTodo(id);
    },
    [toggleTodo]
  );

  const handleEdit = useCallback(
    (todo: TodoType) => {
      setCurrentTodo(todo);
    },
    [setCurrentTodo]
  );

  const handleRemove = useCallback(
    (id: number) => {
      removeTodo(id);
    },
    [removeTodo]
  );

  if (loading) return <CircularProgress size={30} className="flex justify-center items-center"/>
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
                onClick={() => handleEdit(todo)}
                disabled={todo.completed}
              >
                <EditIcon fontSize="small"/>
              </IconButton>
              <IconButton
                color="error"
                edge="end"
                title="Delete"
                aria-label="delete"
                onClick={() => handleRemove(todo.id)}
              >
                <ClearIcon fontSize="small"/>
              </IconButton>
            </Stack>
          }
        >
          <ListItemButton
            disableTouchRipple
            disableRipple
            onClick={() => handleToggle(todo.id)}
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