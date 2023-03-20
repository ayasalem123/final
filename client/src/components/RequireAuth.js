import { useSelector } from 'react-redux';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
export default function RequireAuth({ allowedRole }) {
  const { loggeduser } = useSelector((state) => state.userAuth);
  const location = useLocation();
  return loggeduser?.signeduser?.Role == allowedRole ? (
    <Outlet />
  ) : loggeduser?.signeduser ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
