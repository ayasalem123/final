import { useSelector } from 'react-redux';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
export default function RequirPermission() {
  const { loggeduser } = useSelector((state) => state.userAuth);
  const location = useLocation();
  return loggeduser?.signeduser?.blocked == false || !loggeduser?.signeduser ? (
    <Outlet />
  ) : loggeduser?.signeduser ? (
    <Navigate to="/blocked" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
