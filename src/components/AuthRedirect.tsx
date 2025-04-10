import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Proveri da li postoji token u localStorage
    const token = localStorage.getItem("token");

    // Ako nema tokena, preusmeri korisnika na Login stranicu
    if (!token) {
      navigate("/login");
    } else {
      // Ako postoji token, preusmeri na Characters stranicu
      navigate("/characters");
    }
  }, [navigate]);

  return null; // Ova komponenta se ne prikazuje, samo obavlja preusmeravanje
};

export default AuthRedirect;
