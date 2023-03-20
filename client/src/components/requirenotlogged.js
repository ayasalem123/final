import { useSelector } from 'react-redux';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
export default function Requirenotlogged() {
  const { loggeduser } = useSelector((state) => state.userAuth);
  const location = useLocation();
  return  !loggeduser?.signeduser ? (
    <Outlet />
  ) :(
    <Navigate to="/logout" state={{ from: location }} replace />
  ) 
}

