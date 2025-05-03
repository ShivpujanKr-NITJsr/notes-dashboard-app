import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProtectedLayout from "./components/layouts/ProtectedLayout";
import Login from "./components/pages/login/Login";
import Dashboard from "./components/pages/dashboard/Dashboard";
import { AuthProvider, useAuthContext } from "./context/AuthContext";
import SignUp from "./components/pages/signUp/SignUp";
import NoteEditor from "./components/pages/noteEditor/NoteEditor";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes with layout */}
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/note/:id" element={<NoteEditor />} />
            <Route path="/note" element={<NoteEditor />} />
            {/* Add more protected routes here */}
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<CatchAllRedirect />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

const CatchAllRedirect = () => {
  const { isAuthenticated } = useAuthContext();

  // Redirect based on authentication status
  return isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />;
};
