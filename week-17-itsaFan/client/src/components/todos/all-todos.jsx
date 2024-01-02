/* eslint-disable react/prop-types */
import { useState } from "react";
import { Table, Pagination, Alert } from "flowbite-react";
import DeleteTodo from "./delete-todo";
import EditTodo from "./edit-todo";
import { useAuth } from "../../context/auth-context";

export default function AllTodo({ todos }) {
  const { userPayload } = useAuth();
  const isAdmin = userPayload?.role === "ROLE_ADMIN";
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  //   const todosData = Array(100).fill("Test");

  const reversedTodos = [...todos].reverse();
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return reversedTodos.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="relative overflow-x-auto  ">
      {reversedTodos.length === 0 ? (
        <Alert color="info">
          <span>
            <p>
              <span className="font-medium">Empty! </span>
              You can create todos on dashboard
            </p>
          </span>
        </Alert>
      ) : (
        <>
          <div>
            <Table striped hoverable>
              <Table.Head>
                <Table.HeadCell className="w-48">Title</Table.HeadCell>
                <Table.HeadCell className="w-72">Description</Table.HeadCell>
                {isAdmin && <Table.HeadCell className="w-32">Author</Table.HeadCell>}
                <Table.HeadCell>
                  <span className="sr-only">Action</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {getCurrentPageData().map((todo, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{todo.title}</Table.Cell>
                    <Table.Cell>{todo.description}</Table.Cell>
                    {isAdmin && <Table.Cell>{todo.createdBy.username}</Table.Cell>}
                    <Table.Cell className="flex">
                      <div className="hover:opacity-70">
                        <DeleteTodo todoId={todo._id} />
                      </div>
                      <div className="hover:opacity-70">
                        <EditTodo todoId={todo._id} currentTitle={todo.title} currentDescription={todo.description} />
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
          <div className="flex items-center justify-center my-4">
            <Pagination currentPage={currentPage} layout="pagination" nextLabel="Next" previousLabel="Back" onPageChange={onPageChange} showIcons totalPages={Math.ceil(todos.length / ITEMS_PER_PAGE)} />
          </div>
        </>
      )}
    </div>
  );
}
