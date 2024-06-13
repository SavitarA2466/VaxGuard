import { Outlet, useNavigate, Navigate } from "react-router-dom";
import useGlobalStore from "../globalStore";

const ProtectedUserRoutes = (props) => {
  const { user } = useGlobalStore();

  const navigate = useNavigate();
  function presentPage() {
    navigate(-1);
  }

  if (!user) {
    console.log("nav");
    return <Navigate to="/" />;
  }

  if (user.role === "user") {
    return <Outlet {...props} />;
  }

  presentPage();
};

export default ProtectedUserRoutes;
