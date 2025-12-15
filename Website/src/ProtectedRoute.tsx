// components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useAuth } from "./hooks/useAuth";

const ProtectedRoute = () => {
  const { user, isUserLoading } = useAuth();

  if (isUserLoading) return <CircularProgress />;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
