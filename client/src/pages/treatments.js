import Navbarvisitor from '../components/navbarvisitor';
import Cardcomponent from '../components/card';
import EditTreatment from '../components/input';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Navbaradmin from '../components/navbaradmin';
import Navbarsigned from '../components/navbarsigned';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { gettreatment } from '../redux/slices/UserReducer';
function Treatment() {
  const [value, setValue] = useState('');
  const { userAuth } = useSelector((state) => state);
  const loggeduser = userAuth?.loggeduser;
  const [showEditForm, setShowEditForm] = useState(false);

  const handleclick = () => {
    setShowEditForm(true);
  };
  const dispatch = useDispatch();
  const [filteredArr, setfilteredArr] = useState([]);
  const [treatmentelement, setTreatmentelement] = useState([]);
  let gettreatments = async () => {
    let { payload } = await dispatch(gettreatment());
    console.log(payload);
    setTreatmentelement(payload);
    setfilteredArr(payload);
  };
  useEffect(() => {
    gettreatments();
  }, []);
  useEffect(() => {
    let NewfilteredArr = treatmentelement.filter((el) =>
      el.title.trim().toLocaleLowerCase().includes(value)
    );
    setfilteredArr(NewfilteredArr);
  }, [value]);

  return (
    <div>
      {!loggeduser ? (
        <Navbarvisitor setval={setValue}></Navbarvisitor>
      ) : loggeduser?.signeduser?.Role === 'user' ? (
        <Navbarsigned setval={setValue} />
      ) : (
        <Navbaradmin setval={setValue} />
      )}
      {loggeduser?.signeduser?.Role === 'admin' && (
        <button onClick={handleclick}>add new treatment</button>
      )}
      {showEditForm ? (
        <EditTreatment el={''} setShowEditForm={setShowEditForm} />
      ) : null}
      {filteredArr?.length !== 0 ? (
        filteredArr.map((el) => <Cardcomponent el={el} />)
      ) : (
        <div>nothing matches</div>
      )}
    </div>
  );
}
export default Treatment;
