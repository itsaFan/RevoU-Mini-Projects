import { Layout, Avatar, Dropdown, Modal } from "antd";
import itsaFanLogo from "../../assets/images/itsaFan-logo-textRed-transparent-01.png";
import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import AuthContext from "../../context/auth-context";
import { useContext, useState } from "react";
import Login from "../forms/auth-form/login";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

type Props = {
  className?: string;
};

export default function PageHeader({ className }: Props) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);
  // console.log(currentUser)
  function handleLogout() {
    logout();
    navigate("/");
  }
  const openModal = () => {
    setShowModal(true);
  };

  const exitModal = () => {
    setShowModal(false);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <p>{currentUser.email}</p>,
    },
    {
      key: "2",
      label: <p>Role: {currentUser.role}</p>,
    },
    {
      type: "divider",
    },
    {
      key: "4",
      danger: true,
      label: <a onClick={handleLogout}>Logout</a>,
    },
  ];
  return (
    <Header className={className}>
      <img src={itsaFanLogo} alt="logo" width={120} height={30} />
      {currentUser.username ? (
        <Dropdown menu={{ items }} placement="bottom" arrow>
          <Avatar size="large" className="bg-rose-500">
            <p className="text-slate-200">{currentUser.username}</p>
          </Avatar>
        </Dropdown>
      ) : (
        <div onClick={openModal}>
          <Avatar size="large" icon={<UserOutlined />} className="bg-slate-50" />
        </div>
      )}

      <Modal centered open={showModal} onCancel={exitModal} footer={null} width={300} bodyStyle={{ margin: "0" }}>
        <Login />
      </Modal>
    </Header>
  );
}
