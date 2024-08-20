import { Outlet, useNavigate, Navigate } from "react-router-dom";
import useGlobalStore from "../globalStore";

// Component to protect routes and ensure only admin users can access certain pages
const ProtectedAdminRoutes = (props) => {
  const { user } = useGlobalStore(); // Accessing the global store to get the current user

  const navigate = useNavigate(); // Hook to programmatically navigate
  function presentPage() {
    navigate(-1); // Navigate back to the previous page
  }

  // If the user is not logged in, redirect to the home page
  if (!user) {
    return <Navigate to="/" />;
  }

  // If the user has the role 'admin', render the child routes
  if (user.role === "admin") {
    return <Outlet {...props} />;
  }

  // If the user is not an admin, navigate back to the previous page
  presentPage();
};

export default ProtectedAdminRoutes;
