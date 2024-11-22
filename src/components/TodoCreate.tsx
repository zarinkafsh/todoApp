'use client';

import {FormEvent, useEffect, useState, useCallback, ChangeEvent} from "react";
import {Box, FormControl, IconButton, Input, Stack} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {useTodo} from "@/contexts/TodoContext";

export const TodoCreate = () => {
  const [todoText, setTodoText] = useState("");
  const {addTodo, editTodo, currentTodo} = useTodo();

  // Synchronize currentTodo with the input field
  useEffect(() => {
    if (currentTodo) {
      setTodoText(currentTodo.text);
    } else {
      setTodoText(""); // Reset if no currentTodo is present
    }
  }, [currentTodo]);

  // Handler to manage input changes
  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
  }, []);

  // Form submission handler
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
        setTodoText(""); // Reset the input field after submission
      }
    },
    [todoText, currentTodo, addTodo, editTodo]
  );

  return (
    <Box
      component="form"
      className="mb-2"
      onSubmit={handleSubmit}
    >
      <Stack direction="row" spacing={2}>
        <FormControl
          fullWidth
          sx={{gap: 0.5}}
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
            <AddIcon/>
          </IconButton>
        </FormControl>
      </Stack>
    </Box>
  );
};