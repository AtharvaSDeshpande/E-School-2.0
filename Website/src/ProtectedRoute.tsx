// components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const ProtectedRoute = () => {
  // const { user, isLoading } =()
  const user = false;
  const isLoading = false;

  if (isLoading) return <CircularProgress />;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
