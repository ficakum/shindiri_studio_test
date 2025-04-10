import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Header from "../components/Header";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuthContext();

  if (loading) return <p>Loading...</p>;

  return user ? (
    <div>
      <Header /> {/* Prikazivanje Header-a na privatnim stranicama */}
      {children}
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
