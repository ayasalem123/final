import React from 'react';
import { useDispatch } from 'react-redux';
import { updatepassword } from '../redux/slices/UserReducer';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Recover({ recipient_email }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  console.log(confirmPassword);
  console.log(newPassword);
  const changePassword = async () => {
    if (confirmPassword !== newPassword) {
      alert('passwords dont match');
      return;
    } else {
      // dispatch(sendotp({ recipient_email, Password }))
      const res = await dispatch(
        updatepassword({ email: recipient_email, password: newPassword })
      );
      if (res?.payload?.errors) {
        toast.error(`${res?.payload?.errors[0]?.msg}`);
        return;
      }
      console.log(res);
      if (res.payload === '') {
        alert('you need to register first');
        navigate('/register');
        return;
      }

      navigate('/login');
    }
  };
  return (
    <div style={{ backgroundColor: '#f9fafb', marginTop: '150px' }}>
      <ToastContainer />
      <section
        style={{
          backgroundColor: '#f9fafb',
          width: '100%',
          darkBackgroundColor: '#1f2937',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            margin: '0 auto',
            height: '100%',
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          <div
            style={{
              width: '100%',
              padding: '1.5rem',
              backgroundColor: '#fff',
              borderRadius: '0.375rem',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              border: '1px solid #e5e7eb',
              marginTop: 0,
              maxWidth: '28rem',
              darkBackgroundColor: '#1f2937',
              darkBorderColor: '#374151',
              paddingTop: '2rem',
              paddingBottom: '2rem',
            }}
          >
            <h2
              style={{
                marginBottom: '0.25rem',
                fontSize: '1.25rem',
                fontWeight: 600,
                lineHeight: 1.2,
                textAlign: 'center',
                color: '#1f2937',
                darkColor: '#fff',
              }}
            >
              Change Password
            </h2>
            <form style={{ marginTop: '1rem', marginBottom: '1rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    lineHeight: 1.5,
                    textAlign: 'left',
                    color: '#1f2937',
                    darkColor: '#fff',
                  }}
                  htmlFor="password"
                >
                  New Password
                </label>
                <input
                  onChange={(event) => setNewPassword(event.target.value)}
                  style={{
                    backgroundColor: '#f9fafb',
                    borderColor: '#d1d5db',
                    color: '#1f2937',
                    fontSize: '0.875rem',
                    borderRadius: '0.375rem',
                    padding: '0.625rem',
                    display: 'block',
                    width: '100%',
                    transitionProperty:
                      'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
                    transitionDuration: '150ms',
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    lineHeight: 1.25,
                    darkBackgroundColor: '#4b5563',
                    darkBorderColor: '#6b7280',
                    darkPlaceholderColor: '#9ca3af',
                    darkColor: '#fff',
                    darkFocusRingColor: '#2563eb',
                    darkCursorColor: '#fff',
                  }}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  required=""
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    lineHeight: 1.5,
                    textAlign: 'left',
                    color: '#1f2937',
                    darkColor: '#fff',
                  }}
                  htmlFor="confirm-password"
                >
                  Confirm New Password
                </label>
                <input
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  style={{
                    backgroundColor: '#f9fafb',
                    border: '1px solid #e5e7eb',
                    color: '#374151',
                    fontSize: '1rem',
                    borderRadius: '0.375rem',
                    padding: '0.625rem',
                    width: '100%',
                    outline: 'none',
                  }}
                  required=""
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '1.25rem',
                  }}
                >
                  <input
                    id="newsletter"
                    aria-describedby="newsletter"
                    type="checkbox"
                    style={{
                      width: '0.875rem',
                      height: '0.875rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.25rem',
                      backgroundColor: '#f9fafb',
                      outline: 'none',
                      marginTop: '0.125rem',
                      marginRight: '0.5rem',
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: '400',
                    color: '#9ca3af',
                  }}
                >
                  <label
                    htmlFor="newsletter"
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: '400',
                      color: '#9ca3af',
                    }}
                  >
                    I accept the{' '}
                    <a
                      style={{
                        fontWeight: '500',
                        color: '#3b82f6',
                        textDecoration: 'none',
                      }}
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
            </form>
            <button
              onClick={() => changePassword()}
              style={{
                width: '100%',
                backgroundColor: '#3b82f6',
                color: '#fff',
                fontSize: '14px',
                fontWeight: '500',
                padding: '10px 12px',
                textAlign: 'center',
                borderRadius: '9999px',
                transition:
                  'background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              Reset password
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Recover;
