import { useState } from "react";
import { useAuth } from "../context/use-context";
import LoginForm from "../components/auth/Login/login";
import { loginApi } from "../api/auth-api";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const accessToken = await loginApi(identifier, password);
      //   console.log(accessToken);
      localStorage.setItem("accessToken", accessToken);
      setAccessToken(accessToken);
      navigate("/");
      //   console.log("Authentication successful");
    } catch (error) {
      console.error("Login failed:", error.response?.data);
      setError(error.response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-80vh mt-5 md:mt-16">
      <LoginForm
        identifier={identifier}
        setIdentifier={setIdentifier}
        password={password}
        setPassword={setPassword}
        onSubmit={handleSubmit}
        error={error}
        loading={loading} />
    </div>
  );
}
