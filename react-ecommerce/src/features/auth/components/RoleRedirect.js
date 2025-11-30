import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUserInfo } from "../../user/userSlice";

export default function RoleRedirect() {
  const userInfo = useSelector(selectUserInfo);

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  if (userInfo.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/home" replace />;
}
