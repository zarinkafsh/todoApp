"use client";

import {
  Box,
  Card,
  Container,
  Typography,
} from "@mui/material";
import {TodoCreate, TodoList} from "@/app/components";

export default function Home() {
  return (
    <Container maxWidth="md" className="py-4 m-auto text-center	">
      <Card className="min-h-96 p-8 m-auto">
        <Typography className="text-left text-gray-500" variant="h4" component="h1" gutterBottom>
          Todo List
        </Typography>
        <Box className="mb-3">
          <TodoCreate/>
        </Box>
        <TodoList/>
      </Card>
    </Container>
  );
}