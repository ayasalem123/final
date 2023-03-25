import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sendotp } from '../redux/slices/UserReducer';
export default function Otp({ recipient_email, OTP, setPage }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [timerCount, setTimer] = React.useState(60);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);
  function resendOTP() {
    if (disable) return;
    dispatch(sendotp({ recipient_email, OTP }))
      .then(() => setDisable(true))
      .then(() => alert('A new OTP has succesfully been sent to your email.'))
      .then(() => setTimer(60))
      .catch(console.log);
  }

  function verfiyOTP() {
    console.log(OTPinput);
    if (parseInt(OTPinput.join('')) === parseInt(OTP)) {
      navigate('/recover');
      return;
    }
    alert(
      'The code you have entered is not correct, try again or re-send the link'
    );
    return;
  }

  React.useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [disable]);

  React.useEffect(() => {
    dispatch(sendotp({ recipient_email, OTP }));
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '150px',
        width: '100%',
        height: '100%',
        backgroundColor: '#F3F4F6',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          paddingLeft: '24px',
          paddingTop: '32px',
          paddingBottom: '36px',
          boxShadow: '0px 10px 30px rgba(17, 17, 17, 0.04)',
          margin: 'auto',
          width: '100%',
          maxWidth: '480px',
          borderRadius: '24px',
        }}
      >
        <div
          style={{
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            width: '100%',
            maxWidth: '360px',
          }}
        >
          <div
            style={{ fontWeight: '600', fontSize: '24px', textAlign: 'center' }}
          >
            <div>
              <p>Email Verification</p>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                fontWeight: '500',
                fontSize: '14px',
                color: '#9CA3AF',
                justifyContent: 'center',
              }}
            >
              <p>We have sent a code to your email {recipient_email}</p>
            </div>
          </div>
          <div>
            <form>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: 'auto',
                    width: '100%',
                    maxWidth: '200px',
                  }}
                >
                  <div style={{ width: '48px', height: '48px' }}>
                    <input
                      maxLength="1"
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        padding: '10px',
                        outline: 'none',
                        borderRadius: '16px',
                        borderWidth: '1px',
                        borderColor: '#E5E7EB',
                        fontSize: '20px',
                        backgroundColor: '#fff',
                        focusBackgroundColor: '#D1D5DB',
                        focusRingColor: '#2563EB',
                      }}
                      type="text"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOTPinput([e.target.value, OTPinput[1], OTPinput[2]])
                      }
                    />
                  </div>
                  <div style={{ width: '48px', height: '48px' }}>
                    <input
                      maxLength="1"
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        padding: '10px',
                        outline: 'none',
                        borderRadius: '16px',
                        borderWidth: '1px',
                        borderColor: '#E5E7EB',
                        fontSize: '20px',
                        backgroundColor: '#fff',
                        focusBackgroundColor: '#D1D5DB',
                        focusRingColor: '#2563EB',
                      }}
                      type="text"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOTPinput([OTPinput[0], e.target.value, OTPinput[3]])
                      }
                    />
                  </div>
                  <div style={{ width: '48px', height: '48px' }}>
                    <input
                      maxLength="1"
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        padding: '10px',
                        outline: 'none',
                        borderRadius: '16px',
                        borderWidth: '1px',
                        borderColor: '#E5E7EB',
                        fontSize: '20px',
                        backgroundColor: '#fff',
                        focusBackgroundColor: '#D1D5DB',
                        focusRingColor: '#2563EB',
                      }}
                      type="text"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOTPinput([OTPinput[0], OTPinput[1], e.target.value])
                      }
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                  }}
                >
                  <div>
                    <button
                      onClick={() => verfiyOTP()}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        cursor: 'pointer',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        width: '100%',
                        borderRadius: '10px',
                        padding: '15px',
                        backgroundColor: '#0D2B63',
                        border: 'none',
                        color: '#fff',
                        fontSize: '14px',
                        boxShadow: '0px 2px 5px 0px rgba(0,0,0,0.3)',
                      }}
                    >
                      Verify Account
                    </button>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 'medium',
                      color: '#888',
                      gap: '5px',
                    }}
                  >
                    <p>Didn't recieve code?</p>{' '}
                    <button
                      className="flex flex-row items-center"
                      style={{
                        color: disable ? 'gray' : 'blue',
                        cursor: disable ? 'none' : 'pointer',
                        textDecorationLine: disable ? 'none' : 'underline',
                      }}
                      onClick={() => resendOTP()}
                    >
                      {disable ? `Resend OTP in ${timerCount}s` : 'Resend OTP'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
