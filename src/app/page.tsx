"use client";

import {
  Box,
  Card,
  Container,
  Typography,
} from "@mui/material";
import { TodoCreate, TodoList } from "@/components";

export default function Home() {
  return (
    <Container maxWidth="md">
      <Card sx={{
        p: 2,
      }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Todo List
        </Typography>
        <Box>
          <TodoCreate />
        </Box>
        <TodoList />
      </Card>
    </Container>
  );
}