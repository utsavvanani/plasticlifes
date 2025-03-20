


import React, { useContext } from "react";
import { FaCartPlus, FaRegHeart } from "react-icons/fa";
import { addToCart, addToWishlist } from "../api/Api";
import Context from "../context";
import { Link, useNavigate } from "react-router-dom";

function ProductCard({ data }) {
  const navigate = useNavigate();
  const { countproduct } = useContext(Context);

  const addToCartHandler = async (productId) => {
    try {
      const res = await addToCart(productId);
      await countproduct();
    } catch (error) {
      console.log(error);
    }
  };

  const addtowishlist = async (productId) => {
    await addToWishlist(productId);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-md overflow-hidden transition-all transform hover:scale-105 hover:shadow-lg border border-gray-200">
      {/* Product Image */}
      <Link to={`/productdescription/${data._id}`} className="flex-shrink-0">
        <img
          className="w-full h-64 object-cover rounded-t-xl bg-gray-100"
          src={data.productImage}
          alt={data.productTitle}
        />
      </Link>

      {/* Product Details */}
      <div className="flex-grow p-4 bg-white">
        {/* Category Tag */}
        <div className="flex justify-between items-center mb-2">
          <span className="bg-blue-200 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
            {data.productCategory}
          </span>
        </div>
        {/* Product Title */}
        <h2 className="text-lg font-semibold text-gray-800 mb-1">{data.productTitle}</h2>
        {/* Product Description */}
        <p className="text-gray-600 text-sm mb-2">{data.productDesc}</p>
        {/* Price Section */}
        <div className="flex justify-between items-center mt-auto">
          <span className="text-lg font-bold text-[#FF7004]">₹{data.productPrice}</span>
          <span className="line-through text-gray-400 text-sm">₹{data.productFakePrice}</span>
        </div>
      </div>

      {/* Actions: Add to Cart & Wishlist */}
      <div className="flex justify-between items-center p-4 bg-gray-100 border-t border-gray-300">
        <button
          className="flex items-center text-gray-600 hover:text-green-600 transition-transform transform hover:scale-110"
          onClick={() => addToCartHandler(data?._id)}
        >
          <FaCartPlus className="text-xl mr-2" />
          <span className="font-medium text-base">Add to Cart</span>
        </button>
        <button
          className="flex items-center text-gray-600 hover:text-red-600 transition-transform transform hover:scale-110"
          onClick={() => addtowishlist(data?._id)}
        >
          <FaRegHeart className="text-xl mr-2" />
          <span className="font-medium text-base">Wishlist</span>
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
