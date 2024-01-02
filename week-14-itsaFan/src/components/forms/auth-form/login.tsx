import { useState } from "react";
import LoginForm from "./login-form";
import { loginApi } from "../../../api/auth-api";
import { useNavigate } from "react-router-dom";
import CardBorder from "../../UI/card-border";

type handleData = {
  username: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const [formData] = useState({
    loginData: {
      username: "",
      password: "",
    },
  });

  const [error, setError] = useState("");

  const handleSubmit = async (data: handleData) => {
    try {
      const accessToken = await loginApi(data.username, data.password);
      console.log("Login successful. Access Token:", accessToken);
      localStorage.setItem("accessToken", accessToken);

      navigate("/dashboard");
      window.location.reload();
    } catch (error: any) {
      console.error("Login failed:", error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred during login.");
      }
    }
  };

  return (
    <CardBorder title="Sign in">
      {error && <div className="text-red-500 pb-4 text-center">{error}</div>}
      <LoginForm initialValues={formData.loginData} onLogin={handleSubmit} />
    </CardBorder>
  );
}
