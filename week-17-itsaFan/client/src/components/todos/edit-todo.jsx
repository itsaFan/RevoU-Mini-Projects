/* eslint-disable react/prop-types */
import { Card, Modal } from "flowbite-react";
import { useRef, useState } from "react";
import { HiPencilAlt } from "react-icons/hi";
import EditTodoForm from "../forms/edit-todo-form";
import { editTodo } from "../../api/todo-api";
import { useAuth } from "../../context/auth-context";
import { message } from "antd";

export default function EditTodo({ todoId, currentTitle, currentDescription }) {
  const [openModal, setOpenModal] = useState();
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const { accessToken } = useAuth();

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const title = titleRef.current.value;
      const description = descriptionRef.current.value;
      await editTodo(todoId, title, description, accessToken);
      setOpenModal(undefined);
      message.config({
        top: 100,
      });
      message.success("Edit Success!");
      setTimeout(() => {
        window.location.reload();
      }, 1250);
    } catch (error) {
      console.error("Failed to edit todo:", error);
    }
  };

  return (
    <>
      <button onClick={() => setOpenModal("default")}>
        <HiPencilAlt size={25} />
      </button>
      <Modal show={openModal === "default"} size="md" onClose={() => setOpenModal(undefined)} popup>
        <Card>
          <Modal.Header>Edit Todo</Modal.Header>
          <EditTodoForm onSubmit={handleEdit} titleRef={titleRef} descriptionRef={descriptionRef} defaultTitle={currentTitle} defaultDescription={currentDescription} />
        </Card>
      </Modal>
    </>
  );
}
