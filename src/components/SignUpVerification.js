import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyEmail, verifyMobile } from '../services/api';

const SignUpVerification = () => {
  const navigate = useNavigate();
  const [emailOTP, setEmailOTP] = useState('');
  const [mobileOTP, setMobileOTP] = useState('');

  const handleVerify = async (type) => {
    try {
      if (type === 'email') {
        await verifyEmail({ email: localStorage.getItem('tempEmail'), token: emailOTP });
      } else {
        await verifyMobile({ phone: localStorage.getItem('tempPhone'), token: mobileOTP });
      }
      // If both are verified, redirect to login
      if (localStorage.getItem('emailVerified') && localStorage.getItem('mobileVerified')) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Verification failed:', error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-12 w-auto" src="/logo.png" alt="Cuvette" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Verify Your Account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please enter the verification codes sent to your email and phone
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <label htmlFor="emailOTP" className="block text-sm font-medium text-gray-700">
                Email OTP
              </label>
              <input
                id="emailOTP"
                name="emailOTP"
                type="text"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={emailOTP}
                onChange={(e) => setEmailOTP(e.target.value)}
              />
              <button
                onClick={() => handleVerify('email')}
                className="mt-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Verify Email
              </button>
            </div>

            <div>
              <label htmlFor="mobileOTP" className="block text-sm font-medium text-gray-700">
                Mobile OTP
              </label>
              <input
                id="mobileOTP"
                name="mobileOTP"
                type="text"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={mobileOTP}
                onChange={(e) => setMobileOTP(e.target.value)}
              />
              <button
                onClick={() => handleVerify('mobile')}
                className="mt-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Verify Mobile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpVerification;