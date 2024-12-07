import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedLoggedInUser, signOutAsync } from "../authSlice";
import { Navigate } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const user = useSelector(selectedLoggedInUser);

  useEffect(() => {
    dispatch(signOutAsync());
  }, []);

  return <>{!user && <Navigate to="/login" replace={true} />}</>;
}

export default Logout;
