import { Outlet, useNavigate, Navigate } from "react-router-dom";
import useGlobalStore from "../globalStore";

// Component to protect routes and ensure only users with the 'user' role can access certain pages
const ProtectedUserRoutes = (props) => {
  const { user } = useGlobalStore(); // Accessing the global store to get the current user

  const navigate = useNavigate(); // Hook to programmatically navigate
  function presentPage() {
    navigate(-1); // Navigate back to the previous page
  }

  // If the user is not logged in, redirect to the home page
  if (!user) {
    console.log("nav"); // Log a message for debugging purposes
    return <Navigate to="/" />;
  }

  // If the user has the role 'user', render the child routes
  if (user.role === "user") {
    return <Outlet {...props} />;
  }

  // If the user is not a 'user', navigate back to the previous page
  presentPage();
};

export default ProtectedUserRoutes;

