import { getAllAppointments } from '../redux/slices/UserReducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Listappointments from '../components/Listappointment';
import {
  DeleteAppointment,
  DoneAppointment,
} from '../redux/slices/AdminReducer';
export default function List() {
  const dispatch = useDispatch();
  const { Allappointments } = useSelector((state) => state.admin);
  const call = () => {
    if (Allappointments) {
      const dates = Allappointments.map((el) => {
        const date = new Date(el.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // add 1 since getMonth() returns 0-based index
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const formattedDate = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;

        return { date: formattedDate, id: el._id };
      });
      return dates;
    }
  };
  const dates = call();
  const handleclick = (id) => {
    dispatch(DeleteAppointment({ id }));
  };
  const handleclick2 = (id) => {
    dispatch(DoneAppointment({ id }));
  };
  return (
    <div>
      <Listappointments />
      {dates?.map((el) => (
        <div>
          <div>{el.date}</div>
          <button
            onClick={(event) => {
              event.preventDefault();
              handleclick(el.id);
            }}
          >
            delete
          </button>
          <button
            onClick={(event) => {
              event.preventDefault();
              handleclick2(el.id);
            }}
          >
            done
          </button>
        </div>
      ))}
    </div>
  );
}
