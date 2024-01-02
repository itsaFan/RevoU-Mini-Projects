import { Modal, Button } from "antd";

type Props = {
  title: string;
  textBody: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function SuccessModal({ isOpen, onClose, title, textBody }: Props) {
  return (
    <Modal
      title={title}
      centered
      open={isOpen}
      onOk={onClose}
      onCancel={onClose}
      footer={[
        <Button key="ok" type="primary" onClick={onClose} className="bg-blue-500">
          OK
        </Button>,
      ]}
    >
      {textBody}
    </Modal>
  );
}
