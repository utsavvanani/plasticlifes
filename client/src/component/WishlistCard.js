import React, { useContext } from "react";
import { FaCartPlus, FaTrash } from "react-icons/fa";
import { addToCart } from "../api/Api";
import Context from "../context";

function WishlistCard({ data, onRemove }) {
  const { countproduct } = useContext(Context);
  const addToCartHandler = async (productId) => {
    try {
      await addToCart(productId);
      await countproduct();
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl border border-gray-300">
      <img
        className=" h-60 w-auto  rounded-t-lg"
        src={data.productImage}
        alt={data.productTitle}
      />
      <div className="flex flex-col flex-grow p-4 bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {data.productTitle}
        </h2>
        <p className="text-gray-600 mb-3">{data.productDesc}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-red-600 font-semibold text-lg">
            ₹{data.productPrice}
          </span>
          <span className="line-through text-gray-400 text-sm">
            ₹{data.productFakePrice}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center p-4 bg-gray-100 border-t border-gray-300">
        <button
          className="flex items-center text-gray-700 hover:text-green-600 transition-transform transform hover:scale-110"
          onClick={() => addToCartHandler(data?._id)}
        >
          <FaCartPlus className="text-xl mr-2" />
          <span className="font-medium text-base">Add to Cart</span>
        </button>
        <button
          className="flex items-center text-gray-700 hover:text-red-600 transition-transform transform hover:scale-110"
          onClick={() => onRemove(data?._id)}
        >
          <FaTrash className="text-xl mr-2" />
          <span className="font-medium text-base">Remove</span>
        </button>
      </div>
    </div>
  );
}

export default WishlistCard;
