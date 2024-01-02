import { useState } from "react";
import RegistrationForm from "./reg-form";
import { registerApi } from "../../../api/auth-api";
import { User } from "../../../helpers/api-interface";
import CardBorder from "../../UI/card-border";
import Modal from "../../UI/modal";
import { message } from "antd";

export default function Registration() {
  const [formData] = useState({
    registrationData: {
      username: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (user: User) => {
    console.log("Button clicked!");
    try {
      await registerApi(user);
      console.log(`Registration success`, user);
      message.config({
        top: 100,
      });
      message.success("Register Success!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Registration Fail:", error);
    }
  };

  return (
    <Modal buttonTitle="No account? Register" className="w-full h-10 bg-rose-400 hover:bg-rose-500 border-none text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      <CardBorder title="Register">
        <RegistrationForm initialValues={formData.registrationData} onRegister={handleSubmit} />
      </CardBorder>
    </Modal>
  );
}
