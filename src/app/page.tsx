"use client";

import {useState} from "react";
import {
  Box,
  Card,
  Container,
  Typography,
} from "@mui/material";
import {TodoCreate, TodoList} from "@/components";
import {TodoType} from "@/types/todo";

export default function Home() {
  const [currentTodo, setCurrentTodo] = useState<TodoType | undefined>(undefined);

  return (
    <Container maxWidth="md">
      <Card sx={{
        p: 2,
      }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Todo List
        </Typography>
        <Box>
          <TodoCreate currentTodo={currentTodo} onEdit={() => setCurrentTodo(undefined)}/>
        </Box>
        <TodoList onEdit={setCurrentTodo} currentTodo={currentTodo}/>
      </Card>
    </Container>
  );
}