import { Modal, Button } from "antd";

type Props = {
  onClose: () => void;
  visible: boolean;
};

export default function SuccessModal({ visible, onClose }: Props) {
  return (
    <Modal
      title="Register Success"
      centered
      open={visible}
      onOk={onClose}
      onCancel={onClose}
      footer={[
        <Button key="ok" type="primary" onClick={onClose} href="/">
          OK
        </Button>,
      ]}
    >
      Thank you for registering!
    </Modal>
  );
}
