import React, { useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ConfirmationDialog } from "../confirmationDialog/confirmationDialog";

export default function Navbar() {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const { logout, user } = useAuthContext(); // <-- use logout from context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear auth context
    navigate("/login"); // Redirect to login
  };

  const handleConfirmLogout = () => {
    setShowLogoutPopup(false);
    handleLogout();
  };

  const handleCancelLogout = () => {
    setShowLogoutPopup(false);
  };

  return (
    <div className="flex items-center justify-between w-full h-full px-4 ">
      <nav className="flex flex-wrap items-center gap-3 text-[11px] font-normal select-none w-full md:w-auto">
        <h1 className="text-2xl font-bold">Smart Notes</h1>
      </nav>

      <div className="flex items-center gap-3 justify-end w-full md:w-auto flex-nowrap">
        <button
          aria-label="User"
          className="w-6 h-6 rounded-full bg-[#7c1eff] text-[11px] font-semibold text-white flex items-center justify-center select-none"
          type="button"
        >
          {user?.name?.[0]?.toUpperCase() || "U"}
        </button>

        {/* Logout Button */}
        <button
          aria-label="Logout"
          className="w-6 h-6 rounded-full bg-[#7c1eff] flex items-center justify-center select-none cursor-pointer hover:bg-[#9d33ff] transition-colors"
          type="button"
          onClick={() => setShowLogoutPopup(true)}
        >
          <i className="fas fa-sign-out-alt text-white text-xs"></i>
        </button>
      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <ConfirmationDialog
          handleClick={handleConfirmLogout}
          handleCloseModal={handleCancelLogout}
          title="Are you sure you want to log out?"
        />
      )}
    </div>
  );
}
