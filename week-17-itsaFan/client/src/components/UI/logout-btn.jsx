import { useNavigate } from "react-router-dom";
import { logoutApi } from "../../api/auth-api";

export default function LogoutBtn() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutApi();
      localStorage.removeItem("accessToken");
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.error("Failed to logout:", error.response?.data || error.message);
    }
  };

  return (
    <div role="button" onClick={handleLogout} tabIndex={0}>
      Logout
    </div>
  );
}
