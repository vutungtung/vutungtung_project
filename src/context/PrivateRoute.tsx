import { useContext, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

type PrivateRouteProps = {
  children: ReactNode;
  role?: "user" | "admin";
};

const PrivateRoute = ({ children, role }: PrivateRouteProps) => {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("AuthContext is missing");

  const { user } = auth;

  if (!user) return <Navigate to="/login" replace />; // Not logged in
  if (role && user.role !== role) return <Navigate to="/" replace />; // Role mismatch

  return <>{children}</>;
};

export default PrivateRoute;
