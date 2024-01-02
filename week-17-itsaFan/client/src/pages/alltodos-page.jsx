import { useEffect, useState } from "react";
import AllTodo from "../components/todos/all-todos";
import { useAuth } from "../context/auth-context";
import { getAllTodos, getTodosByCreator } from "../api/todo-api";
import { Spinner } from "flowbite-react";


export default function AllTodosPage() {
  const { accessToken, userPayload } = useAuth();
  const [todos, setTodos] = useState([]);
  const role = userPayload?.role;
  const [loading, setLoading] = useState(true);

  // console.log(role);

  useEffect(() => {
    if (!role) {
      return;
    }

    const fetchTodos = async () => {
      try {
        let data;

        if (role === "ROLE_ADMIN") {
          data = await getAllTodos(accessToken);
        } else if (role === "ROLE_USER") {
          data = await getTodosByCreator(accessToken);
        } else {
          console.error("Unexpected role:", role);
          return;
        }
        // console.log(data)
        setTodos(data.todos);
        const timeoutId = setTimeout(() => {
          setLoading(false);
        }, 1000);

        return () => clearTimeout(timeoutId);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
        setLoading(false);
      }
    };
    fetchTodos();
  }, [accessToken, role]);

  if (loading) {
    return (
      <div className="text-center mt-20">
        <Spinner aria-label="Todo Table Loading" size="lg" />
      </div>
    );
  }

  return (
    <>
      <AllTodo todos={todos} />
    </>
  );
}
