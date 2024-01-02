/* eslint-disable react/prop-types */
import { HiBookmark } from "react-icons/hi";
import DeleteTodo from "./delete-todo";
import EditTodo from "./edit-todo";
import { useAuth } from "../../context/auth-context";

export default function TodoItems({ todos }) {
  const { userPayload } = useAuth();
  const username = userPayload?.username;

  return (
    <div className="w-full lg:w-96 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Todo List</h5>
        <a href={`/${username}/todos`} className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
          View all
        </a>
      </div>
      <div className="flow-root">
        {todos.length === 0 ? (
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No todo yet, create one!</p>
        ) : (
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {todos
              .slice(-8)
              .reverse()
              .map((todo) => (
                <li key={todo._id} className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 text-red-700">
                      <HiBookmark size={25} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{todo.title}</p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">{todo.description}</p>
                    </div>
                    <div className="inline-flex items-center font-semibold text-gray-900 dark:text-white ">
                      <div className="hover:opacity-70">
                        <DeleteTodo todoId={todo._id} />
                      </div>
                      <div className="hover:opacity-70">
                        <EditTodo todoId={todo._id} currentTitle={todo.title} currentDescription={todo.description} />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
