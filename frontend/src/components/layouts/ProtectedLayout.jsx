import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import Navbar from "../shared/navbar/Navbar";

export default function ProtectedLayout() {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="h-screen w-full flex flex-col bg-[#121212] text-[#ccc] font-sans">
      {/* Navbar area */}
      <div className="h-16 px-4 md:px-8 lg:px-12 xl:px-16 py-4">
        <Navbar />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden px-4 md:px-8 lg:px-12 xl:px-16 pb-6">
        <Outlet />
      </div>
    </div>
  );
}
