import { Button, Modal as AntModal } from "antd";
import { useState, ReactNode, CSSProperties } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  buttonTitle: string;
  bodyStyle?: CSSProperties;
};

export default function Modal(props: Props) {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const exitModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <Button onClick={openModal}  className={props.className}>
        <p className="text-white">{props.buttonTitle}</p>
      </Button>
      <AntModal  width={320} bodyStyle={props.bodyStyle} centered  open={showModal} onCancel={exitModal} footer={null}>
        {props.children}
      </AntModal>
    </>
  );
}
// bodyStyle={{ margin: "90px 0 0 0" }}