import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../api/auth-api";
import { message } from "antd";
import RegistrationForm from "../components/auth/Register/register";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerApi(username, email, password);
      message.config({
        top: 150,
      });
      message.success("Register Success!");
      setTimeout(() => {
        navigate("/");
      }, 1250);
    } catch (error) {
      console.error("Register failed:", error.response?.data || error.message);
      setError(error.response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-80vh mt-5 md:mt-16">
        <RegistrationForm username={username} setUsername={setUsername} email={email} setEmail={setEmail} password={password} setPassword={setPassword} onSubmit={handleSubmit} error={error} loading={loading} />
      </div>
    </>
  );
}
