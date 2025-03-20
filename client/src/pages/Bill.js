import React, { useEffect, useState } from 'react';
import { getUserProduct, userOderProductEmpty } from "../api/Api";
import { Link, useNavigate } from 'react-router-dom';
import Header from '../component/Header';
import Footer from '../component/Footer';

function Bill() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userProduct, setUserProduct] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [paymentDone, setPaymentDone] = useState(false);

  const fetchData = async () => {
    const res = await getUserProduct();
    setUserProduct(res || []);
  };

  useEffect(() => {
    fetchData();
    const data = localStorage.getItem('userData');
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  const calculateTotal = () => {
    if (!Array.isArray(userProduct)) return 0;
    return userProduct.reduce((total, item) => {
      if (
        item &&
        item.quantity != null &&
        item.productId &&
        item.productId.productPrice != null
      ) {
        return total + item.quantity * item.productId.productPrice;
      }
      return total;
    }, 0).toFixed(2);
  };

  const handlePayment = async () => {
    await userOderProductEmpty();
    fetchData();
    setPaymentDone(true);
    navigate('/order-success');
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100 flex flex-col items-center justify-center p-5 space-y-6 md:space-y-10">
        {/* Invoice Container */}
        <div className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-xl w-full max-w-[90vw] md:max-w-[210mm] border border-gray-200">
          <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">Invoice</h1>

          {/* User Details */}
          {userData ? (
            <div className="mb-8 p-4 rounded-lg bg-gray-50 shadow-inner border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-purple-500">User Details</h2>
              <p className="mb-1"><strong>Name:</strong> {userData.name}</p>
              <p className="mb-1"><strong>Email:</strong> {userData.email}</p>
              <p className="mb-1"><strong>Phone:</strong> {userData.phone}</p>
              <p className="mb-1"><strong>Address:</strong> {userData.address}</p>
            </div>
          ) : (
            <p className="text-gray-600">No user data available.</p>
          )}

          {/* Product Table */}
          <div className="relative overflow-x-auto shadow-md mb-8">
            <table className="w-full text-sm text-left border border-gray-300 bg-gray-50 rounded-lg">
              <thead className="text-sm text-gray-700 uppercase bg-purple-100">
                <tr>
                  <th className="px-4 py-3 border">Image</th>
                  <th className="px-4 py-3 border">Product Name</th>
                  <th className="px-4 py-3 border">Unit Price</th>
                  <th className="px-4 py-3 border">Qty</th>
                  <th className="px-4 py-3 border">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {userProduct.length > 0 ? (
                  userProduct.map((val, index) => (
                    <tr key={index} className="text-center border-b hover:bg-purple-50">
                      <td className="px-4 py-2 border">
                        <img src={val?.productId?.productImage} className="w-16 h-16 mx-auto rounded-full shadow-md" alt="" />
                      </td>
                      <td className="px-4 py-2 border">{val?.productId?.productTitle}</td>
                      <td className="px-4 py-2 border">₹{val?.productId?.productPrice.toFixed(2)}</td>
                      <td className="px-4 py-2 border">{val?.quantity}</td>
                      <td className="px-4 py-2 border">₹{(val?.quantity * val?.productId?.productPrice).toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-red-500">No Products in Bill</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Total Amount */}
          <div className="text-right font-bold text-xl text-purple-800 mb-6">
            <h2>Total: ₹{calculateTotal()}</h2>
          </div>
          <button
            onClick={() => navigate("/cart")}
            className="font-semibold text-white bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 px-5 py-3 rounded-lg shadow-md transition duration-200"
          >
            Edit Cart
          </button>
        </div>

        {/* Payment Method Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-6 text-purple-700">Payment Method</h2>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="cash"
              name="paymentMethod"
              value="Cash on Delivery"
              checked
              className="mr-2"
              readOnly
            />
            <label htmlFor="cash">Cash on Delivery</label>
          </div>
          <div className="flex items-center mb-4">
            <Link to="/credit">
              <input
                type="radio"
                id="creditCard"
                name="paymentMethod"
                value="Credit Carsd"

                className="mr-2"
              />
            </Link>

            <label htmlFor="creditCard" className=" text-gray-500">Credit Card </label>
          </div>
          <div className="flex items-center mb-4">
            <Link to="/credit">
              <input
                type="radio"
                id="paypal"
                name="paymentMethod"
                value="PayPal"

                className="mr-2"
              />
            </Link>
            <label htmlFor="paypal" className=" text-gray-500">PayPal </label>
          </div>

          {/* Order Now Button */}
          <div className="mt-6 text-center">
            <button
              onClick={handlePayment}
              className="font-semibold text-white bg-green-500 hover:bg-green-600 px-5 py-3 rounded-lg shadow-md transition duration-200"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>

  );
}

export default Bill;
