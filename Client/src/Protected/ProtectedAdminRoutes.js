import { Navigate } from "react-big-calendar";
import { Outlet, useNavigate } from "react-router-dom";
import useGlobalStore from "../globalStore";

const ProtectedAdminRoutes = (props) => {
  const { user } = useGlobalStore();

  const navigate = useNavigate();
  function presentPage() {
    navigate(-1);
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  if (user.role === "admin") {
    return <Outlet {...props} />;
  }

  presentPage();
};

export default ProtectedAdminRoutes;
