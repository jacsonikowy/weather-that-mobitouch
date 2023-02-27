import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedProps {
  isLoggedIn: () => boolean;
  children: React.ReactElement;
}

const Protected: React.FC<ProtectedProps> = ({ isLoggedIn, children }) => {
  if (isLoggedIn()) {
    return children;
  }
  return <Navigate to="/" replace />;
};

export default Protected;
