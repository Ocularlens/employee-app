import { useEffect } from "react";
import { useNavigate } from "react-router";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { token } = useAuth(); // to initialize the context
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return (
    <div className="form-container">
      <LoginForm />
    </div>
  );
}
