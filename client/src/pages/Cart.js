import React, { useContext, useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import {
  AddQuantity,
  DecQuantity,
  getUserProduct,
  deleteProduct,
} from "../api/Api";
import Context from "../context";
import { Link } from "react-router-dom";
import CommenSection from "../component/CommenSection";
import Header from "../component/Header";
import Footer from "../component/Footer";

function Cart() {
  const [data, setData] = useState([]);
  const { countproduct } = useContext(Context);

  const fetchData = async () => {
    const userCart = await getUserProduct();
    setData(userCart);
  };

  const addQuantity = async (productId) => {
    await AddQuantity(productId);
    fetchData();
  };

  const decQuantity = async (productId) => {
    await DecQuantity(productId);
    await countproduct();
    fetchData();
  };

  const deleteProductFromCart = async (productId) => {
    await deleteProduct(productId);
    await countproduct();
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const calculateTotal = () => {
    if (!Array.isArray(data)) return 0;
    return data
      .reduce((total, item) => {
        if (
          item &&
          item.quantity != null &&
          item.productId &&
          item.productId.productPrice != null
        ) {
          return total + item.quantity * item.productId.productPrice;
        }
        return total;
      }, 0)
      .toFixed(2);
  };

  // Check if the cart is empty
  const isCartEmpty = data.length === 0;

  // Show alert if cart is empty
  useEffect(() => {
    if (isCartEmpty) {
      // alert("Your cart is empty!");
    }
  });

  return (
    <div>
      <Header />
      <div className="container mx-auto py-12 px-4">
        <CommenSection title="Cart" />
        <div className="relative overflow-x-auto shadow-lg bg-white rounded-lg mt-8">
          <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-green-50 dark:bg-gray-800 dark:text-gray-300">
              <tr className="text-center">
                <th scope="col" className="px-6 py-5">
                  Image
                </th>
                <th scope="col" className="px-6 py-5">
                  Product Name
                </th>
                <th scope="col" className="px-6 py-5">
                  Unit Price (₹)
                </th>
                <th scope="col" className="px-6 py-5">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-5">
                  Subtotal (₹)
                </th>
                <th scope="col" className="px-6 py-5">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((val, index) => (
                  <tr
                    className="border-b dark:border-gray-700 text-center bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 transition duration-300"
                    key={index}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      <img
                        src={val?.productId?.productImage}
                        className="w-20 h-20 mx-auto rounded-full border-2 border-gray-200"
                        alt="product"
                      />
                    </td>
                    <td className="px-6 py-4">{val?.productId?.productTitle}</td>
                    <td className="px-6 py-8">
                      ₹{val?.productId?.productPrice}
                      {val?.productId?.productFakePrice && (
                        <span className="text-red-400 line-through ml-2">
                          ₹{val?.productId?.productFakePrice}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <button
                          className="px-2 bg-gray-300 rounded-l-md border-r border-gray-400 hover:bg-gray-400"
                          onClick={() => decQuantity(val?.productId?._id)}
                        >
                          -
                        </button>
                        <span className="px-4">{val?.quantity}</span>
                        <button
                          className="px-2 bg-gray-300 rounded-r-md border-l border-gray-400 hover:bg-gray-400"
                          onClick={() => addQuantity(val?.productId?._id)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      ₹{(val?.quantity * val?.productId?.productPrice).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="font-bold text-xl text-red-600 dark:text-red-500 hover:text-red-800"
                        onClick={() => deleteProductFromCart(val?.productId?._id)}
                      >
                        <MdDeleteOutline />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    <h1 className="text-lg text-gray-700">Your cart is empty</h1>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-8 text-right font-bold text-lg">
          Total: ₹{calculateTotal()}
        </div>
        {!isCartEmpty && (
          <div className="flex justify-end mt-4">
            <Link to="/checkout">
              <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-500 transition duration-300">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Cart;

