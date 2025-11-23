import React from "react";
import { useSelector } from "react-redux";
import { selectedLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";

export default function RoleRedirect() {
  const user = useSelector(selectedLoggedInUser);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/home" replace />;
}
