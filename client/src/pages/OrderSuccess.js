import React from 'react';
import { useNavigate } from 'react-router-dom';

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Thank you for your order!</h1>
        <p className="text-lg text-gray-700 mb-6">Your order has been successfully placed and will be delivered soon.</p>
        <button
          onClick={() => navigate('/')}
          className="font-semibold text-white bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg shadow-md transition duration-200"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;
