import { Modal } from "antd";
import { useState } from "react";
import Registration from "../forms/auth-form/registration";

export default function RegisterModal() {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const exitModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <span onClick={openModal}>Register</span>
      <Modal centered width={645} open={showModal} onCancel={exitModal} footer={null}>
        <Registration />
      </Modal>
    </>
  );
}
