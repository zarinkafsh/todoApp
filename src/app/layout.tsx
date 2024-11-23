import { ReactNode } from "react";
import type { Metadata } from "next";
import { TodoProvider } from "@/todoProvider/todoProvider";
import "@/app/assets/styles/globals.css";

export const metadata: Metadata = {
  title: "Todo App",
  description: "Feel free to create your todo list!",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>
          <TodoProvider>
            {children}
          </TodoProvider>
        </main>
      </body>
    </html>
  );
}
