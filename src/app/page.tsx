"use client";

import {
  Box,
  Card,
  Container,
  Typography,
} from "@mui/material";
import {TodoCreate, TodoList} from "@/components";

export default function Home() {
  return (
    <Container maxWidth="md" sx={{py: 4}}>
      <Card
        sx={{
          maxWidth: 800,
          mx: "auto",
          px: {xs: 2, md: 6},
          py: {xs: 2, md: 4},
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Todo List
        </Typography>
        <Box sx={{mb: 3}}>
          <TodoCreate/>
        </Box>
        <TodoList/>
      </Card>
    </Container>
  );
}