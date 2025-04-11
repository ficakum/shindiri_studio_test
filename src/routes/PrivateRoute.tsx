import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Header from "../components/Header";
import { ROUTES } from "constants/routes";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuthContext();

  if (loading) return <p>Loading...</p>;

  return user ? (
    <div>
      <Header />
      {children}
    </div>
  ) : (
    <Navigate to={`/${ROUTES.LOGIN}`} />
  );
};

export default PrivateRoute;
