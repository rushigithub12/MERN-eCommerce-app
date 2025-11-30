import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUserInfo } from "../../user/userSlice";
import { selectedLoggedInUser } from "../authSlice";

function ProtectedAdmin({ children }) {
  const user = useSelector(selectedLoggedInUser)
  const userInfo = useSelector(selectUserInfo);

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  if (userInfo && userInfo.role !== "admin") {
    return <Navigate to="/" replace={true} />;
  }

  return children;
}

export default ProtectedAdmin;
