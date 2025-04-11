import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { ACCESS_TOKEN_KEY } from "../constants/auth";

const AuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (!token) {
      navigate(`/${ROUTES.LOGIN}`);
    } else {
      navigate(`/${ROUTES.CHARACTERS}`);
    }
  }, [navigate]);

  return null;
};

export default AuthRedirect;
