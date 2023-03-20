import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker, Page, setOptions, localeEn } from '@mobiscroll/react';
import List from './List';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAppointments } from '../redux/slices/UserReducer';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import Navbarbook from './Navbarbook';
setOptions({
  locale: localeEn,
  theme: 'ios',
  themeVariant: 'dark',
});
const amount = '30';
const currency = 'USD';
const style = { layout: 'vertical' };

function Calender() {
  const dispatch = useDispatch();
  const [dates, setDates] = useState([]);
  const { oldappoitments } = useSelector((state) => state.userAuth);
  console.log(oldappoitments);
  const [selectedDate, setSelectedDate] = useState(null);
  const [paid, setPaid] = useState(false);
  let getdates = async () => {
    let { data } = await axios.get('http://localhost:5000/book');
    const datearray = data.map((el) => new Date(el.date));
    const newdatearray = datearray.map((el) => {
      dates.push({
        start: el,
        end: new Date(
          el.getFullYear(),
          el.getMonth(),
          el.getDate(),
          el.getHours(),
          el.getMinutes() + 45,
          0
        ),
      });
    });
  };

  useEffect(() => {
    getdates();
  }, []);
  const { userAuth } = useSelector((state) => state);
  const loggeduser = userAuth?.loggeduser.signeduser;
  const addappointment = async () => {
    const sentdate = await selectedDate.toISOString();
    console.log(loggeduser._id);
    const addedappoitment = await axios.post('http://localhost:5000/book', {
      date: sentdate,
      paid: paid,
      userid: loggeduser._id,
    });
  };

  const handleclick2 = (event) => {
    event.preventDefault();
    dispatch(getAppointments());
  };
  const handleclick = (event) => {
    event.preventDefault();
    addappointment();
  };
  const onPageLoadingDatetime = () => {
    setDatetimeInvalid(dates);
  };

  const min = '2023-03-04T00:00';
  const max = '2023-09-04T00:00';
  const [datetimeLabels, setDatetimeLabels] = React.useState([]);
  const [datetimeInvalid, setDatetimeInvalid] = React.useState([]);

  if (!loggeduser) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/login" />;
  }
  return (
    <Page className="md-calendar-booking">
      <Navbarbook/>
      <div className="mbsc-form-group">
        <div className="mbsc-form-group-title">Select date & time</div>
        <Datepicker
          display="inline"
          controls={['calendar', 'timegrid']}
          min={min}
          max={max}
          minTime="08:00"
          maxTime="19:59"
          stepMinute={60}
          width={null}
          labels={datetimeLabels}
          invalid={datetimeInvalid}
          onPageLoading={onPageLoadingDatetime}
          cssClass="booking-datetime"
          onChange={(event, inst) => setSelectedDate(inst.getVal())}
        />
        <button onClick={handleclick}>book</button>
        <button onClick={handleclick2}>show old appointments</button>
      </div>
      {oldappoitments?.map((el) => (
        <div>{el.date}</div>
      ))}
      <PayPalScriptProvider options={{ 'client-id': 'test' }}>
        <PayPalButtons
          forceReRender={[amount, currency, style]}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function () {
              setPaid(true);
            });
          }}
        />
      </PayPalScriptProvider>
    </Page>
  );
}
export default Calender