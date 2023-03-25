import { useSelector } from 'react-redux';
import Navbarsigned from '../components/navbarsigned';
import Navbaradmin from '../components/navbaradmin';
const Logout = () => {
  const { userAuth } = useSelector((state) => state);
  return (
    <div>
      {userAuth?.loggeduser?.signeduser.Role == 'user' ? (
        <Navbarsigned />
      ) : (
        <Navbaradmin />
      )}
      <div>you need to logout first</div>
    </div>
  );
};
export default Logout;
