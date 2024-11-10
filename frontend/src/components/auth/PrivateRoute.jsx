import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function PrivateRoute({ element, ...rest }) {
  const token = sessionStorage.getItem("jwt");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);

    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      sessionStorage.removeItem("jwt");
      return <Navigate to="/login" />;
    }

    return element;
  } catch (err) {
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;
