'use client';

import { FormEvent, useEffect, useState, useCallback, ChangeEvent } from "react";
import { Box, FormControl, IconButton, Input, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { useTodo } from "@/todoProvider/todoProvider";

export const TodoCreate = () => {
  const [todoText, setTodoText] = useState("");
  const { addTodo, editTodo, currentTodo } = useTodo();

  useEffect(() => {
    if (currentTodo) {
      setTodoText(currentTodo.text);
    } else {
      setTodoText("");
    }
  }, [currentTodo]);


  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
  }, []);


  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const trimmedText = todoText.trim();
      if (trimmedText) {
        if (currentTodo) {
          editTodo(currentTodo.id, trimmedText);
        } else {
          addTodo(trimmedText);
        }
        setTodoText("");
      }
    },
    [todoText, currentTodo, addTodo, editTodo]
  );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
    >
      <Stack direction="row" spacing={2}>
        <FormControl
          fullWidth
          sx={{ gap: 0.5 }}
        >
          <Input
            autoFocus
            size="small"
            placeholder="Add New Todo..."
            aria-label="New Todo"
            value={todoText}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <IconButton
            color="primary"
            size="small"
            type="submit"
            aria-label={currentTodo ? "Edit Todo" : "Add Todo"}
            disabled={!todoText.trim()}
          >
            {
              currentTodo
                ? <EditIcon fontSize="small" />
                : <AddIcon />
            }
          </IconButton>
        </FormControl>
      </Stack>
    </Box>
  );
};