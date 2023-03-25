import React from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import Navbarvisitor from '../components/navbarvisitor';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import Carouselcomponent from '../components/carousel';
import Cardcomponent from '../components/card';
import { useSelector, useDispatch } from 'react-redux';
import Navbarsigned from '../components/navbarsigned';
import Navbaradmin from '../components/navbaradmin';
import { gettreatment } from '../redux/slices/UserReducer';
function Home() {
  const [carouselelement, setCarouselelement] = useState([]);
  const { userAuth } = useSelector((state) => state);
  //const {signeduser}=userAuth?.loggeduser
  const dispatch = useDispatch();
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
  let getcarousel = async () => {
    let { data } = await axios.get('http://localhost:5000/carousel');
    setCarouselelement(data);
  };
  const [value, setValue] = useState('');
  useEffect(() => {
    getcarousel();
  }, []);
  const [filteredArr, setfilteredArr] = useState([]);
  useEffect(() => {
    let NewfilteredArr = treatmentelement.filter((el) =>
      el.title.trim().toLocaleLowerCase().includes(value)
    );
    setfilteredArr(NewfilteredArr);
  }, [value]);
  return (
    <div>
      <ToastContainer />
      {!userAuth?.loggeduser?.signeduser ? (
        <Navbarvisitor setval={setValue} />
      ) : userAuth?.loggeduser?.signeduser.Role == 'user' ? (
        <Navbarsigned setval={setValue} />
      ) : (
        <Navbaradmin setVal={setValue} />
      )}
      {carouselelement?.length !== 0 ? (
        <Carouselcomponent carouselelement={carouselelement} />
      ) : (
        <div>loading</div>
      )}
      <h2>TOP NEW ADVANCED SKIN TREATMENTS we OFFER IN 2023</h2>
      {filteredArr?.length !== 0 ? (
        filteredArr?.map((el) => <Cardcomponent el={el} />)
      ) : (
        <div>nothing is available</div>
      )}
    </div>
  );
}

export default Home;
