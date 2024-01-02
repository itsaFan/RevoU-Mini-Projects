import { useEffect, useState } from "react";
import Todo from "../components/todos/add-todo";
import TodoItems from "../components/todos/todo-items";
import SearchTodo from "../components/todos/search-todo";
import { useAuth } from "../context/auth-context";
import { getTodosByCreator } from "../api/todo-api";

export default function DashboardPage() {
  const { accessToken } = useAuth();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodosByCreator(accessToken);
        setTodos(data.todos);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };

    fetchTodos();
  }, [accessToken]);

  return (
    <div className="py-6">
      <div className="mb-4">
        <SearchTodo />
      </div>
      <div className="flex flex-col lg:flex-row items-start gap-4">
        <Todo />
        <TodoItems todos={todos} />
      </div>
    </div>
  );
}
